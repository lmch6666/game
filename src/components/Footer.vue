<script setup>
import {
  reactive,
  ref,
  watch,
  effectScope,
  computed,
  watchEffect,
  getCurrentInstance
} from "vue";

const themeData = reactive({
  isDark: false,
});

const value = ref(0);

function handleChangeThemes() {
  themeData.isDark = !themeData.isDark;
  document.documentElement.style.setProperty(
    "background-color",
    themeData.isDark ? "#121212" : "#ffffff"
  );
  document.documentElement.style.setProperty(
    "color",
    themeData.isDark ? "#ebeaea" : "#121212"
  );
}

</script>

<template>
  <footer class="others">
    <div class="theme-icon">
      <div
        class="night size"
        @click="handleChangeThemes"
        v-if="themeData.isDark"
      ></div>
      <div class="light size" @click="handleChangeThemes" v-else></div>
    </div>
  </footer>
</template>

<style>
.others {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
}

.theme-icon {
  width: 60px;
  height: 60px;
}

.size {
  width: 25px;
  height: 25px;
}

.light {
  background: url("https://api.iconify.design/ic:round-light-mode.svg?color=%23888888")
    no-repeat center center / contain;
}

.night {
  background: url("https://api.iconify.design/ic:round-nightlight-round.svg?color=%23888888")
    no-repeat center center / contain;
}
</style>
