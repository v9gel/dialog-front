<script setup lang="ts">
import {ref} from "@vue/reactivity";
import {onMounted, onUpdated} from "@vue/runtime-core";
import store, {ButtonData, CardData} from "../../store";
import emitter from "./eventBus";

const props = defineProps<{
  button: ButtonData;
  cardHeight: number;
  cardPosition: {
    x: number,
    y: number
  },
  cardData: CardData
}>()

const buttonRef = ref(null)
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)
const square = ref({
  x: null,
  y: null
})

const drag = (e) => {
  store.commit('editButton', {
    cardStatus: props.cardData.status,
    buttonId: props.button.id,
    to: 'MOUSE'
  })
  window.addEventListener('mousemove', move)
  store.commit('lineCalc')
}

const move = ({offsetX, offsetY}) => {
  store.commit('changeMousePosition', {
    x: offsetX,
    y: offsetY
  });
  // square.value.x = offsetX - dragOffsetX.value;
  // square.value.y = offsetY - dragOffsetY.value;
  store.commit('lineCalc')
}

const calculateButtonPosition = () => {
  let {x, y} = props.cardPosition;
  x = x + (buttonRef.value.clientWidth / 2)
  y = y + ((buttonRef.value.clientHeight / 2) + props.cardHeight + 5);

  props.button.position.x = x;
  props.button.position.y = y;

}

onMounted(() => {
  calculateButtonPosition()
  emitter.on('stopDragLine', (e) => {
    store.commit('removeDragedLine', e);
  })
})

onUpdated(() => {
  calculateButtonPosition()
})
// const drop = () => {
//     dragOffsetX.value = dragOffsetY.value = 0;
//     box.value.removeEventListener('mousemove', move)
// }
// const move = ({ offsetX, offsetY }) => {
//     square.value.x = offsetX - dragOffsetX.value;
//     square.value.y = offsetY - dragOffsetY.value;
// }
</script>

<template>
  <div class="button" ref="buttonRef" @mousedown="drag" @mouseup="() => { }">
    <!-- <div class="button-text unselectable">{{ props.button.text }}</div> -->
    <input v-model="props.button.text"/>
  </div>
</template>

<style scoped>
.button {
  width: 100%;
  /* padding: 10px; */

  display: flex;
  justify-content: center;

  background: #9aa9b2;
  border-radius: 0.5em;
  box-sizing: border-box;
}

.button + .button {
  margin-left: 5px;
}

/* Send music to friends */
.button-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
}

.glass {
  position: absolute;
  width: 100%;
  z-index: 1;
}

input {
  padding: 10px;
  outline: none;
  overflow: hidden;
  font-family: Roboto;
  font-style: regular;
  font-weight: 500;
  font-size: 14px;
  border: none;
  width: 100%;
  color: #ffffff;
  background-color: #ffffff00;
  text-align: center;
}
</style>
