<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { createHydrationRenderer, getCurrentInstance, nextTick, onMounted, onUpdated } from "@vue/runtime-core";
import store, { CardData } from "../../store";

import emitter from './eventBus';
import Button from "./Button.vue";
import NewButton from "./NewButton.vue";
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
const textareaRef = ref(null);
const buttonsRef = ref(null);
const buttonsHeight = ref(0)


onMounted(() => {
    box.value = getCurrentInstance().parent.refs.box
    wrapperHeight.value = wrapperRef.value.offsetHeight;
    cardHeight.value = cardRef.value.offsetHeight;
    buttonsHeight.value = buttonsRef.value.offsetHeight;
    // textareaRef.value.autoResize();

    // может надо
    // nextTick(() => {
    //     cardRef.value.container.forEach(ta => {
    //         ta.firstChild.dispatchEvent(new Event("keyup"));
    //     });
    // });
})

onUpdated(() => {
    wrapperHeight.value = wrapperRef.value.offsetHeight + 20;
    cardHeight.value = cardRef.value.offsetHeight;
    store.commit('lineCalc')

})

const square = ref(props.card.position);
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)

const selected = ref(false)

const cursor = computed(() => `cursor: ${dragOffsetX.value ? 'grabbing' : 'grab'}`)

const editable = ref(0);

const drag = (e) => {
    const { offsetX, offsetY, ctrlKey } = e;

    dragOffsetX.value = offsetX - square.value.x;
    dragOffsetY.value = offsetY - square.value.y;
    box.value.addEventListener('mousemove', move)

    if (!ctrlKey) {
        emitter.emit('clean-select')
    }
    select()
    store.commit('lineCalc')

}
const drop = () => {
    dragOffsetX.value = dragOffsetY.value = 0;
    box.value.removeEventListener('mousemove', move)
    store.commit('lineCalc')

}
const move = ({ offsetX, offsetY }) => {
    store.commit('changeCardPosition', {
        status: props.card.status,
        x: offsetX - dragOffsetX.value,
        y: offsetY - dragOffsetY.value
    });
    // square.value.x = offsetX - dragOffsetX.value;
    // square.value.y = offsetY - dragOffsetY.value;
    store.commit('lineCalc')
}

const select = () => {
    selected.value = true;
}


const cleanSelect = () => {
    selected.value = false;
}

const resizeTextarea = (area) => {
    area.style.overflow = 'hidden';
    area.style.height = 0;
    area.style.height = area.scrollHeight + 'px';
}

const setEditable = () => {
    editable.value = true;
    textareaRef.value.focus()
}

</script>

<template>
    <foreignObject
        :x="square.x"
        :y="square.y"
        :width="300 + buttonsHeight + 5"
        :height="wrapperHeight"
    >
        <div xmlns="http://www.w3.org/1999/xhtml">
            <div ref="wrapperRef" class="wrapper">
                <div class="card" ref="cardRef">
                    <textarea
                        :class="{ unselectable: !editable }"
                        rows="1"
                        ref="textareaRef"
                        v-model="card.text"
                        @blur="editable = false"
                        @focus="resizeTextarea(textareaRef)"
                        @keyup="resizeTextarea(textareaRef)"
                        style="resize: none;"
                    ></textarea>
                </div>
                <div class="buttons" ref="buttonsRef">
                    <Button
                        v-for="(button, index) in card.buttons"
                        :key="index"
                        :button="button"
                        :cardHeight="cardHeight"
                        :cardPosition="square"
                    ></Button>
                    <NewButton :currentButtonsCount="card.buttons.length" :card="card"></NewButton>
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
        v-if="!editable"
        @mousedown="drag"
        @mouseup="drop"
        @dblclick="setEditable"
    />
</template>

<style>
/* <style vars="{ cardHeight }"> */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

.wrapper {
    width: 300px;
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
    /* font-size: 14px; */
    align-items: center;

    color: #000000;
}

p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    line-height: initial;
    height: 19px;
}

.buttons {
    margin-top: 5px;
    display: flex;
}

textarea {
    padding: 10px;
    outline: none;
    overflow: hidden;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    border: none;
    width: 100%;
    background-color: #ffffff00;
}
</style>
