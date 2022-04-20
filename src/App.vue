<script setup>
import Nav from "./components/Nav.vue";
import Saolei from "./components/Saolei.vue";
import Footer from "./components/Footer.vue";
// import * as Icon from "./components/icons/index";
import Game from "./game";
import {
  ref,
  watch,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";

let count = Game.count;
let time = Game.time;
let flagnum = Game.flagnum;
let width = Game.width * 30;
let height = Game.height;
let restartgame = Game.restartgame.bind(Game);
let optiongame = Game.optiongame.bind(Game);
let clickFn = Game.clickFn.bind(Game);
let rightClickFn = Game.rightClickFn.bind(Game);
let getTextColor = Game.getTextColor.bind(Game);

const list = ref([1, 2, 3]);

const itemRefs = ref([]);

onMounted(() => {
  console.log(itemRefs.value);
});

</script>

<template>
  <!-- <template v-for="i in 5" :key="i">
      <Icon.IconCommunity ref="itemRefs"></Icon.IconCommunity>
  </template> -->
  <!-- <Icon.IconCommunity ref="iconref" @click="aaa()"></Icon.IconCommunity> -->
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
  <Nav
    :time="time"
    :flagnum="flagnum"
    :width="width"
    :restartgame="restartgame"
    :optiongame="optiongame"
  />

  <Saolei
    :count="count"
    :clickFn="clickFn"
    :rightClickFn="rightClickFn"
    :getTextColor="getTextColor"
  />

  <Footer />
</template>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
</style>
