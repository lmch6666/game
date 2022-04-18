<script setup>
import {
  defineComponent,
  reactive,
  ref,
  computed,

} from "vue";
// class 绑定数组写法 将class名称包装一下 就能使用
const btn = ref("btn");
const props =  defineProps({
  count:{},
  clickFn:{
    type: Function,
    required: true
  },
  rightClickFn:{
    type: Function,
    required: true
  },
  getTextColor:{
    type: Function,
    required: true
  },
})
</script>

<template>
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
header {
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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
  background-color: rgba(233, 233, 220, 0.3);
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
