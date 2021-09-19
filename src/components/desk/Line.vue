<script setup lang="ts">
import { Coordinates } from "../../store"

const props = defineProps<{
    start: Coordinates;
    end: Coordinates;
}>()

const makePath = () => {
    let x1 = props.start.x;
    const y1 = props.start.y;
    const x2 = props.end.x;
    const y2 = props.end.y;

    // const weight = 0.5
    // const dx = (y2 - y1) * weight
    // // return `M${x1},${y1} C${c1},${y1} ${c2},${y2} ${x2},${y2}`;

    // const c1 = y2 - y1
    // const c2 = x2 - x1

    // return `M${x1},${y1} C${x1},${y2} ${x2},${y1} ${x2},${y2-10}`;
    if(x2 < x1 - 150){
        x1 = x1 - 300;
    }
    return `M${x1},${y1} Q${x2},${y1} ${x2},${y2-10}`;
}

const triangle = () => {
    const x2 = props.end.x;
    const y2 = props.end.y;

    return `${x2},${y2} ${x2-5},${y2-10} ${x2+5},${y2-10}`
}
</script>

<template>
    <path :d="makePath()" stroke="#9aa9b2" fill="transparent" />
    <polygon :points="triangle()" fill="#9aa9b2" />
</template>

<style>
</style>
