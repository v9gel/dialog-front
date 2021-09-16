<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const box = ref(null);

onMounted(() => {
    // box.value.setAttribute("width",  window.innerWidth - 50);
    box.value.setAttribute("height", window.innerHeight - 70);
})
</script>

<template>
    <svg ref="box" class="box" height="100%" width="100%">
        <rect width="100%" height="100%" fill="white" stroke="black" stroke-width="5" />
        <slot />
    </svg>
</template>

<style>
</style>
