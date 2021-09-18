<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import emitter from './eventBus';

const box = ref(null);

onMounted(() => {
    box.value.setAttribute("width",  window.innerWidth);
    box.value.setAttribute("height", window.innerHeight-3);
})

const selectClean = () => {
    emitter.emit('clean-select')
}
</script>

<template>
    <svg ref="box" class="box" height="100%" width="100%">
        <rect width="100%" height="100%" fill="#C6D9DF" stroke-width="5" @mousedown="selectClean"/>
        <slot />
    </svg>
</template>

<style>
</style>
