<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { createHydrationRenderer, getCurrentInstance, onMounted } from "@vue/runtime-core";
// import mitt from 'mitt'

// const emitter = mitt()
import emitter from './eventBus';
emitter.on('clean-select', e => {
    cleanSelect()
})

const box = ref(null);
const instance = ref(null);

onMounted(() => {
    box.value = getCurrentInstance()?.ctx.$.parent.refs.box
    instance.value = getCurrentInstance();
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
    <rect
        width="100"
        height="100"
        class="square"
        :fill="selected ? 'red' : 'yellow'"
        :x="square.x"
        :y="square.y"
        :style="cursor"
        @mousedown="drag"
        @mouseup="drop"
        @select-clean="selectClean"
    />
    <text :x="square.x" :y="square.y + 16">
        <slot />
    </text>
</template>

<style>
</style>
