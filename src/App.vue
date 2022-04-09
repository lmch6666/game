<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import { reactive, ref, watch } from "vue";

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
let time = ref(0);
let width = 10;
let height = 10;
let boomNum = 15;
let flagnum = ref(15);
let saveBoompos = [];
let clear = boomNum;
let startTime = true;
let timeInterval = null;
const navWidth = reactive({
  width: width * 30 + "px",
});
// class 绑定数组写法 将class名称包装一下 就能使用
const btn = ref("btn");
let count = ref(0);

initalgame(height, width);
function genqipan(height, width) {
  let qipan = Array.from({ length: height }, (_, index) => {
    let arr = [];
    for (let j = 0; j < width; j++) {
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

function genboom() {
  let i = 0;
  for (const row of count.value) {
    let j = 0;
    for (const col of row) {
      const flag = Math.random() > 0.8;
      if (i < boomNum && flag) {
        col.isBoom = flag;
        i++;
        saveBoompos.push(col);
      } else {
        col.isBoom = false;
      }
    }
  }
}

function genNumber() {
  for (const row of count.value) {
    for (const col of row) {
      if (col.isBoom) {
        continue;
      }
      let num = 0;
      for (const [dx, dy] of dierctions) {
        let x = col.x + dx;
        let y = col.y + dy;
        if (x < 0 || x >= height || y < 0 || y >= width) {
          continue;
        }
        if (count.value[x][y].isBoom) {
          num++;
        }
      }
      col.count = num;
    }
  }
}

function initalgame(height, width) {
  count.value = genqipan(height, width);
  genboom();
  genNumber();
}

function clickFn(x, y) {
  if (startTime) {
    calcTime();
    startTime = false;
  }
  if (count.value[x][y].isflag) {
    return;
  }
  count.value[x][y].isdiscover = true;
  if (count.value[x][y].isBoom) {
    isBoom(x, y);
    return;
  }
  if (count.value[x][y].count === 0) {
    find0(x, y);
  }
  checkgameState();
}

function find0(x, y) {
  if (count.value[x][y].count !== 0 || count.value[x][y].isflag) {
    return;
  }
  count.value[x][y].isdiscover = true;
  for (const [dx, dy] of dierctions) {
    let nx = x + dx;
    let ny = y + dy;
    if (nx < 0 || nx >= height || ny < 0 || ny >= width) {
      continue;
    }
    if (count.value[nx][ny].isdiscover) {
      continue;
    }
    find0(nx, ny);
  }
}

function isBoom(x, y) {
  for (const row of count.value) {
    for (const col of row) {
      if (col.isBoom) {
        col.isdiscover = true;
      }
    }
  }
  setTimeout(() => {
    alert("boom!!!!!!!");
  }, 0);
}

function getTextColor(x, y) {
  return color[count.value[x][y].count];
}

function calcTime() {
  timeInterval = setInterval(() => {
    time.value++;
  }, 1000);
}

function rightClickFn(x, y) {
  if (count.value[x][y].isflag) {
    count.value[x][y].isflag = !count.value[x][y].isflag;
    flagnum.value++;
    return;
  }
  if (count.value[x][y].isdiscover || flagnum.value == 0) {
    return;
  }
  count.value[x][y].isflag = !count.value[x][y].isflag;
  flagnum.value--;
  checkgameState();
}

function checkgameState() {
  let discovered = 0;
  for (const row of count.value) {
    for (const col of row) {
      if (col.isBoom && col.isflag) {
        clear = flagnum.value;
      }
      if (col.isdiscover) {
        discovered++;
      }
    }
  }
  if (discovered == width * height - boomNum) {
    alert("游戏胜利");
  } else if (clear == 0) {
    alert("游戏胜利");
  }
}

function restartgame() {
  time.value = 0;
  flagnum.value = boomNum;
  clear = boomNum;
  startTime = true;
  clearInterval(timeInterval);
  for (const row of count.value) {
    for (const col of row) {
      col.isdiscover = false;
      col.isflag = false;
    }
  }
  genboom();
  genNumber();
}

function optiongame(option) {
  switch (option) {
    case 1:
      width = 10;
      height = 10;
      boomNum = 15;
      initalgame(height, width);
      break;
    case 2:
      width = 20;
      height = 20;
      boomNum = 20;
      initalgame(height, width);
      break;
    case 3:
      width = 30;
      height = 30;
      boomNum = 400;
      initalgame(height, width);
      break;
    default:
      width = 10;
      height = 10;
      boomNum = 15;
      initalgame(height, width);
      break;
  }
}
</script>

<template>
  <nav class="gamecontrol" :style="navWidth">
    <p class="total">
      当前用时: {{ time }} 可用🚩: {{ flagnum }}
      <button class="restart" @click="restartgame()">重新开始</button>
    </p>
    <p class="total">
      <button class="options" @click="optiongame(1)">初级</button>
      <button class="options" @click="optiongame(2)">中级</button>
      <button class="options" @click="optiongame(3)">高级</button>
    </p>
  </nav>
  <header>
    <div class="wrapper">
      <div class="row" v-for="(i, x) in count" :key="x">
        <button
          :class="[btn, { hover: !j.isflag && !j.isdiscover, flag: j.isflag }]"
          v-for="(j, y) in i"
          @click="clickFn(x, y)"
          :key="y"
          @contextmenu.prevent="rightClickFn(x, y)"
        >
          <span v-if="!j.isdiscover" class="cover"></span>
          <span v-else-if="j.isBoom" class="Firebrick1">{{ "💣" }}</span>
          <span v-else :class="getTextColor(x, y)">{{
            j.count ? j.count : ""
          }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

.gamecontrol {
  margin: 0 auto;
  height: 50px;
}

header {
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.total {
  display: flex;
  justify-content: space-between;
}

.restart {
  width: 80px;
  height: 20px;
  background-color: transparent;
  border: 1px solid rgba(14, 14, 13, 0.6);
  border-radius: 5px;
}

.options {
  width: 80px;
  height: 20px;
  background-color: transparent;
  border: 1px solid rgba(14, 14, 13, 0.6);
  border-radius: 5px;
}

.row {
  height: 30px;
}

.btn {
  margin: 0px;
  padding: 0px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  background: transparent;
  border-radius: 2px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.hover:hover {
  background: lightgrey;
}

.cover {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 200, 0.6);
}

.flag {
  background: url("https://api.iconify.design/ic:sharp-flag.svg?color=currentColor")
    no-repeat center center / contain;
}

.Chartreuse1 {
  color: #7fff00;
}

.DeepSkyBlue {
  color: #00bfff;
}

.Gold {
  color: #ffd700;
}

.HotPink {
  color: #ff69b4;
}

.Red {
  color: #ff0000;
}

.Chocolate4 {
  color: #8b4513;
}

.Firebrick1 {
  color: #ff3030;
}
</style>
