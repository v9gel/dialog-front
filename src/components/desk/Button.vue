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
    margin-top: 15px;
    width: 600px;
    height: 85px;
    left: 81px;
    top: 465px;

    display: flex;
    justify-content: center;

    background: #9aa9b2;
    border-radius: 15px;
    box-sizing: border-box;
}

.button + .button {
    margin-left: 15px;
}

/* Send music to friends */
.button-text {
    /* position: absolute; */
    /* width: 600px;
    height: 39px;
    left: 81px;
    top: 488px; */

    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 33px;
    line-height: 39px;
    /* identical to box height */
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
}
</style>
