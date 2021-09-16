<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
const box = ref(null);

onMounted(() => {
    box.value = getCurrentInstance()?.ctx.$.parent.refs.box
})

const square = ref({
    x: 100,
    y: 100,
});
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)

const cursor = computed(() => `cursor: ${dragOffsetX.value ? 'grabbing' : 'grab'}`)

const drag = ({ offsetX, offsetY }) => {
    dragOffsetX.value = offsetX - square.value.x;
    dragOffsetY.value = offsetY - square.value.y;
    box.value.addEventListener('mousemove', move)
}
const drop = () => {
    dragOffsetX.value = dragOffsetY.value = 0;
    box.value.removeEventListener('mousemove', move)
}
const move = ({ offsetX, offsetY }) => {
    square.value.x = offsetX - dragOffsetX.value;
    square.value.y = offsetY - dragOffsetY.value;
}
</script>

<template>
    <rect
        width="100"
        height="100"
        class="square"
        fill="red"
        :x="square.x"
        :y="square.y"
        :style="cursor"
        @mousedown="drag"
        @mouseup="drop"
    />
    <text :x="square.x" :y="square.y+16">
        <slot />
    </text>
</template>

<style>
</style>
