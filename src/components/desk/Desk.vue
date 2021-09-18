<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
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
}
</script>

<template>
    <svg ref="box" class="box" height="100%" width="100%">
        <rect width="100%" height="100%" fill="#C6D9DF" stroke-width="5" @mousedown="selectClean" />
        <slot />
        <foreignObject width="100" height="50" x="0" y="0">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <button @click="add">add</button>
                <button @click="json">export</button>
            </div>
        </foreignObject>
    </svg>
</template>

<style>
</style>
