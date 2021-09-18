<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { createHydrationRenderer, getCurrentInstance, onMounted } from "@vue/runtime-core";
import { CardData } from "../../store";

import emitter from './eventBus';
import Button from "./Button.vue";
emitter.on('clean-select', e => {
    cleanSelect()
})

const props = defineProps<{
    card: CardData;
}>()

const box = ref(null);
const wrapperRef = ref(null);
const wrapperHeight = ref(0);
const cardRef = ref(null);
const cardHeight = ref(0);

onMounted(() => {
    box.value = getCurrentInstance().parent.refs.box
    wrapperHeight.value = wrapperRef.value.offsetHeight;
    cardHeight.value = cardRef.value.offsetHeight;
})

const square = ref({
    x: 100,
    y: 100,
});
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)

const selected = ref(false)

const cursor = computed(() => `cursor: ${dragOffsetX.value ? 'grabbing' : 'grab'}`)



const drag = (e) => {
    const { offsetX, offsetY, ctrlKey } = e;

    dragOffsetX.value = offsetX - square.value.x;
    dragOffsetY.value = offsetY - square.value.y;
    box.value.addEventListener('mousemove', move)

    if (!ctrlKey) {
        emitter.emit('clean-select')
    }
    select()
}
const drop = () => {
    console.log(123)
    dragOffsetX.value = dragOffsetY.value = 0;
    box.value.removeEventListener('mousemove', move)
}
const move = ({ offsetX, offsetY }) => {
    square.value.x = offsetX - dragOffsetX.value;
    square.value.y = offsetY - dragOffsetY.value;
}

const select = () => {
    selected.value = true;
}


const cleanSelect = () => {
    selected.value = false;
}
</script>

<template>
    <foreignObject :x="square.x" :y="square.y" width="300" :height="wrapperHeight">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <div ref="wrapperRef" class="wrapper">
                <div class="card" ref="cardRef">
                    <div class="card-text unselectable">{{ card.text }}</div>
                </div>
                <div class="buttons">
                    <Button v-for="(button, index) in card.buttons" :key="index" :button="button"></Button>
                </div>
            </div>
        </div>
    </foreignObject>
    <rect
        width="300"
        :height="cardHeight"
        rx="35"
        fill="#ffffff00"
        stroke="#selected ? '#B5E5FF' : '#D4E3EB'"
        :x="square.x"
        :y="square.y"
        :style="cursor"
        @mousedown="drag"
        @mouseup="drop"
    />
</template>

<style>
/* <style vars="{ cardHeight }"> */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

.wrapper {
    width: 100%;
}

.card {
    left: 81px;
    top: 289px;

    background: #ffffff;
    border-radius: 0.7em;
    box-sizing: border-box;
    border: 1px solid #93b3cb;
}

.card-text {
    position: relative;
    padding: 10px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    display: flex;
    align-items: center;

    color: #000000;
}

.buttons {
    margin-top: 5px;
    display: flex;
}
</style>
