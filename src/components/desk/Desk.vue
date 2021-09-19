<script setup lang="ts">
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";
import store from "../../store";
import emitter from './eventBus';

const box = ref(null);

onMounted(() => {
  box.value.setAttribute("width", window.innerWidth);
  box.value.setAttribute("height", window.innerHeight - 3);
})

const selectClean = () => {
  emitter.emit('clean-select')
}

const add = () => {
  store.commit('addCard');
}

const json = () => {
  console.log(JSON.stringify(store.state.cards))
  var a = document.createElement("a");
  var file = new Blob([JSON.stringify(store.state.cards)], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = 'dialog.json';
  a.click();
}

const clickHandler = () => {
  if (store.state.lineDraged) {
    emitter.emit('stopDragLine', null);
  }
}
</script>

<template>
  <svg ref="box" class="box" height="100%" width="100%" @click="clickHandler">
    <rect width="100%" height="100%" fill="#C6D9DF" stroke-width="5" @mousedown="selectClean"/>
    <slot/>
    <foreignObject class="action-button-area" width="210" height="80" x="5" y="5">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <div class="action-button-box">
          <button class="action-button" @click="add">Создать новый узел</button>
          <button class="action-button" @click="json">Скачать схему</button>
        </div>
      </div>
    </foreignObject>
  </svg>
</template>

<style>

.action-button-area {
  background-color: #00000066;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
}

.action-button-box {
  position: absolute;
  right: 0;
  top: 0;
}

.action-button {
  margin: 5px 5px 0 5px;
  padding: 5px;
  width: 200px;
}

</style>
