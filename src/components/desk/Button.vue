<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { createHydrationRenderer, getCurrentInstance, onMounted, onUpdated } from "@vue/runtime-core";
import { ButtonData } from "../../store";

const props = defineProps<{
    button: ButtonData;
    cardHeight: number;
    cardPosition: {
        x: number,
        y: number
    }
}>()

const buttonRef = ref(null)

const drag = (e) => {

}

const calculateButtonPosition = () => {
    let { x, y } = props.cardPosition;
    x = x + (buttonRef.value.clientWidth / 2)
    y = y + ((buttonRef.value.clientHeight / 2) + props.cardHeight + 5);

    props.button.position.x = x;
    props.button.position.y = y;

    console.log(x,y)
}

onMounted(() => {
    calculateButtonPosition()
})

onUpdated(() => {
    calculateButtonPosition()
})
// const drop = () => {
//     dragOffsetX.value = dragOffsetY.value = 0;
//     box.value.removeEventListener('mousemove', move)
// }
// const move = ({ offsetX, offsetY }) => {
//     square.value.x = offsetX - dragOffsetX.value;
//     square.value.y = offsetY - dragOffsetY.value;
// }
</script>

<template>
    <div class="button" ref="buttonRef" @mousedown="drag" @mouseup="() => { }">
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

.glass {
    position: absolute;
    width: 100%;
    z-index: 1;
}
</style>
