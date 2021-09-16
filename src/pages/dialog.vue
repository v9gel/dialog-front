<script setup lang="ts">
import Moveable from 'vue3-moveable'
import { nanoid } from 'nanoid'

const template = {
  id: nanoid(),
  text: 'Текст',
  selected: false,
}

const rect = ref(template)

const rects = ref([
  {
    id: nanoid(),
    text: 'Текст',
    selected: false,
  },
])

const draggable = ref(true)
// const moveable = {
//   draggable: true,
//   throttleDrag: 0,
//   resizable: false,
//   throttleResize: 1,
//   keepRatio: false,
//   scalable: true,
//   throttleScale: 0,
//   rotatable: true,
//   throttleRotate: 0,
//   pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
//   origin: false,
// }

const onDrag = (e: any) => {
  e.target.style.transform = e.transform
}

const handleResize = (e) => {
  // console.log('onResize', width, height)
  e.delta[0] && (e.target.style.width = `${e.width}px`)
  e.delta[1] && (e.target.style.height = `${e.height}px`)
}

const handleRotate = (e) => {
  // console.log('onRotate', e.dist)
  e.target.style.transform = e.transform
}

const toggleDraggable = () => {
  draggable.value = !draggable.value
}

const addRect = () => {
  rects.value.push({ id: nanoid(), text: 'Текст' })
}

const setEditable = (id: string) => {
  rects.value.map(e => e.selected = false)

  console.log(rects.value.find(e => e.id === id) || template)
  rect.value = rects.value.find(e => e.id === id) || template
  rect.value.selected = true
}

</script>

<template>
  <div class="root">
    <div class="container">
      <!-- <button @click="toggleDraggable">
        Toggle {{ draggable }}
      </button> -->
      <button class="bg-dark-50 text-cyan-50 border-solid" @click="addRect">
        Add
      </button>
      <input v-model="rect.text" class="border-solid" type="text">
      <div v-for="(rect, index) in rects" :key="index">
        <div :class="'target target_' + rect.id + (rect.selected ? ' selected' : '')">
          {{ rect.text }}
        </div>
        <moveable
          :target="['.target_' + rect.id]"
          :draggable="draggable"
          :throttle-drag="1"
          :edge-draggable="false"
          :start-drag-rotate="0"
          :throttle-drag-rotate="0"
          :edge="true"
          :resizable="false"
          @drag="onDrag"
          @resize="handleResize"
          @rotate="handleRotate"
          @click="setEditable(rect.id)"
        />
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}
.description {
  padding: 10px;
}
.root {
  position: relative;
}
.container {
  position: relative;
  margin-top: 50px;
}

.target {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 150px;
  left: 100px;
  line-height: 100px;
  text-align: center;
  background: #ee8;
  color: #333;
  font-weight: bold;
  border: 1px solid #333;
  box-sizing: border-box;
}

.selected {
    background: rgb(207, 107, 26);
}
.target1 {
  left: 120px;
  top: 120px;
}
.target2 {
  left: 300px;
  top: 140px;
}
.target3 {
  left: 180px;
  top: 250px;
}
</style>

<route lang="yaml">
meta:
  layout: empty
</route>
