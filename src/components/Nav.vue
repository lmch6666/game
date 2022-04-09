<template>
  <nav class="gamecontrol" :style="navwidth">
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
</template>
<script setup>
import {
  defineComponent,
  reactive,
  ref,
  defineProps,
  defineEmits,
  defineExpose,
  computed
} from "vue";

const props = defineProps({
  time: {
    type: Number,
    default: "0",
  },
  flagnum: {
    type: Number,
    default: "0",
  },
  width: {
    type: Number,
    default: "300",
  },
  restartgame:{
    type: Function,
    required: true
  },
  optiongame:{
    type: Function,
    required: true
  },
});

const navwidth = computed(() => {
  return {
    width: props.width + 'px'
  }
})
</script>

<style scoped>
.gamecontrol {
  margin: 0 auto;
  height: 100px;
  padding: 20px 0;
}

.total {
  display: flex;
  justify-content: space-between;
}

.restart {
  width: 80px;
  height: 30px;
  background-color: transparent;
  border: 1px solid rgba(238, 232, 232, 0.1);
  border-radius: 5px;
  background-color: #F56C6C;
  color: aliceblue;
  line-height: 1;
}

.options {
  width: 80px;
  height: 30px;
  background-color: #409EFF;
  border: 1px solid rgba(238, 232, 232, 0.1);
  border-radius: 5px;
  color: aliceblue;
  line-height: 1;
}
</style>
