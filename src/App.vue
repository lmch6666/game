<script setup>
import Nav from "./components/Nav.vue";
import Saolei from "./components/Saolei.vue";
import Footer from "./components/Footer.vue";
import Game from "./game";
import { reactive, ref, watch } from "vue";

const btn = ref("btn");
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


</script>

<template>
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
