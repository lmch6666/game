import { ref, reactive, watch } from 'vue';
const dierctions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

const color = [
  "Chartreuse1",
  "DeepSkyBlue",
  "Gold",
  "HotPink",
  "Red",
  "Chocolate4",
];
// let time = ref(0);
// let width = 10;
// let height = 10;
// let boomNum = 15;
// let flagnum = ref(15);
// let saveBoompos = [];
// let clear = boomNum;
// let startTime = true;
// let timeInterval = null;
// let count = ref(0);
 class Saolei {
  time = ref(0);
  width = 10;
  height = 10;
  flagnum = ref(15);
  saveBoompos = [];
  boomNum = 15
  clear = this.boomNum;
  startTime = true;
  timeInterval = null;
  count = ref(0);
  constructor(height = 10, width = 10) {
    this.width = width;
    this.height = height;
    this.initalgame(height, width);
  }

  initalgame(height, width) {
    this.count.value = this.initMap(height, width);
    this.initBoom();
    this.initNum();
  }

  initMap() {
    let qipan = Array.from({ length: this.height }, (_, index) => {
      let arr = [];
      for (let j = 0; j < this.width; j++) {
        arr.push({
          x: index,
          y: j,
          count: 0,
          isdiscover: false,
          isflag: false,
        });
      }
      return arr;
    });
    return qipan;
  }

  initBoom() {
    let i = 0;
    for (const row of this.count.value) {
      for (const col of row) {
        const flag = Math.random() > 0.8;
        if (i < this.boomNum && flag) {
          col.isBoom = flag;
          i++;
          this.saveBoompos.push(col);
        } else {
          col.isBoom = false;
        }
      }
    }
  }

  static instance() {
    return new Saolei(this.height, this.width);
  }

  initNum() {
    for (const row of this.count.value) {
      for (const col of row) {
        if (col.isBoom) {
          continue;
        }
        let num = 0;
        for (const [dx, dy] of dierctions) {
          let x = col.x + dx;
          let y = col.y + dy;
          if (x < 0 || x >= this.height || y < 0 || y >= this.width) {
            continue;
          }
          if (this.count.value[x][y].isBoom) {
            num++;
          }
        }
        col.count = num;
      }
    }
  }

  clickFn(x, y) {
    if (this.startTime) {
      this.calcTime();
      this.startTime = false;
    }
    if (this.count.value[x][y].isflag) {
      return;
    }
    this.count.value[x][y].isdiscover = true;
    if (this.count.value[x][y].isBoom) {
      this.isBoom(x, y);
      return;
    }
    if (this.count.value[x][y].count === 0) {
      this.find0(x, y);
    }
    this.checkgameState();
  }


  find0(x, y) {
    if (this.count.value[x][y].isflag) {
      return;
    }
    this.count.value[x][y].isdiscover = true;
    if(this.count.value[x][y].count === 0){
      for (const [dx, dy] of dierctions) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx < 0 || nx >= this.height || ny < 0 || ny >= this.width) {
          continue;
        }
        if (this.count.value[nx][ny].isdiscover) {
          continue;
        }
        this.find0(nx, ny);
      }
    }
  }

  isBoom() {
    for (const row of this.count.value) {
      for (const col of row) {
        if (col.isBoom) {
          col.isdiscover = true;
        }
      }
    }
    setTimeout(() => {
      alert("boom!!!!!!!");
      this.restartgame();
    }, 0);
  }

  getTextColor(x, y) {
    return color[this.count.value[x][y].count];
  }

  calcTime() {
    this.timeInterval = setInterval(() => {
      this.time.value++;
    }, 1000);
  }

  rightClickFn(x, y) {
    if (this.count.value[x][y].isflag) {
      this.count.value[x][y].isflag = !this.count.value[x][y].isflag;
      this.flagnum.value++;
      return;
    }
    if (this.count.value[x][y].isdiscover || this.flagnum.value == 0) {
      return;
    }
    this.count.value[x][y].isflag = !this.count.value[x][y].isflag;
    this.flagnum.value--;
    this.checkgameState();
  }

  checkgameState() {
    let discovered = 0;
    for (const row of this.count.value) {
      for (const col of row) {
        if (col.isBoom && col.isflag) {
          this.clear = this.flagnum.value;
        }
        if (col.isdiscover) {
          discovered++;
        }
      }
    }
    if (discovered == this.width * this.height - this.boomNum) {
      alert("游戏胜利");
    } else if (this.clear == 0 && this.checkBoomFlag()) {
      alert("游戏胜利");
    }
  }

  checkBoomFlag(){
    return this.saveBoompos.every((item) => {
        return item.isflag
    })
  }

  restartgame() {
    this.time.value = 0;
    this.flagnum.value = this.boomNum;
    this.clear = this.boomNum;
    this.startTime = true;
    clearInterval(this.timeInterval);
    for (const row of this.count.value) {
      for (const col of row) {
        col.isdiscover = false;
        col.isflag = false;
      }
    }
    this.initBoom();
    this.initNum();
  }

  optiongame(option) {
    switch (option) {
      case 1:
        this.width = 10;
        this.height = 10;
        this.boomNum = 15;
        this.flagnum.value = this.boomNum
        this.initalgame(this.height, this.width);
        break;
      case 2:
        this.width = 20;
        this.height = 20;
        this.boomNum = 70;
        this.flagnum.value = this.boomNum
        this.initalgame(this.height, this.width);
        break;
      case 3:
        this.width = 30;
        this.height = 30;
        this.boomNum = 250;
        this.flagnum.value = this.boomNum
        this.initalgame(this.height, this.width);
        break;
      default:
        this.width = 10;
        this.height = 10;
        this.boomNum = 15;
        this.flagnum.value = this.boomNum
        this.initalgame(this.height, this.width);
        break;
    }
  }
}


export default Saolei.instance()