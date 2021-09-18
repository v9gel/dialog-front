<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { createHydrationRenderer, getCurrentInstance, onMounted } from "@vue/runtime-core";
import { ButtonData } from "../../store";

const props = defineProps<{
    button: ButtonData;
}>()

</script>

<template>
    <div class="button">
        <div class="button-text unselectable">{{ props.button.text }}</div>
    </div>
</template>

<style>
.button {
    width: 100%;
    padding: 10px;

    display: flex;
    justify-content: center;

    background: #9aa9b2;
    border-radius: 0.5em;
    box-sizing: border-box;
}

.button + .button {
    margin-left: 5px;
}

/* Send music to friends */
.button-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
}
</style>
