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
const instance = ref(null);
const cardText = ref(null);
const cardTextHeight = ref(0);

onMounted(() => {
    box.value = getCurrentInstance()?.ctx.$.parent.refs.box
    instance.value = getCurrentInstance();
    cardTextHeight.value = cardText.value.offsetHeight;
    console.log(cardText.value)
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
    <foreignObject :x="square.x" :y="square.y" width="600" :height="cardTextHeight + 100">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <div class="wrapper">
                <div class="card" ref="cardText">
                    <div class="card-text unselectable">{{ card.text }}</div>
                </div>
                <div class="buttons">
                    <Button v-for="(button, index) in card.buttons" :key="index" :button="button"></Button>
                </div>
            </div>
        </div>
        <!-- <Button v-for="(button, index) in card.buttons" :key="index" :button="button"></Button> -->
    </foreignObject>
    <rect
        width="600"
        :height="cardTextHeight"
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
    width: 600px;
    /* height: 250px; */
}

.card {
    /* Rectangle 4 */
    /* position: absolute; */
    width: 600px;
    /* height: var(--cardHeight); */
    left: 81px;
    top: 289px;

    background: #ffffff;
    border-radius: 35px;
    box-sizing: border-box;
    border: 1px solid #93b3cb;
}

.card-text {
    /* I can help you find and share classical music. Simply send me a query like ‘Mozart’ or use the buttons below. */
    position: relative;
    width: 556.79px;
    /* height: 103.37px; */
    padding: 20px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 33px;
    line-height: 39px;
    display: flex;
    align-items: center;

    color: #000000;
    z-index: 100;
}

.buttons {
    display: flex;
}
</style>
