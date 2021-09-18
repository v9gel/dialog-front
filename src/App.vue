<script setup lang="ts">
import Desk from "./components/desk/Desk.vue";
import Card from "./components/desk/Card.vue";
import { nanoid } from 'nanoid';
import { ref } from "@vue/reactivity";
import './assets/reset.css';
import store, { CardData } from "./store";
import Line from "./components/desk/Line.vue";

const cards = store.state.cards as unknown as CardData[];
const lines = store.state.lines;
const addCard = () => {
  // cards.value.push({ id: nanoid(), text: 'Текст' } as CardData)
}
</script>

<template>
  <Desk>
    <Line v-for="(line, index) in lines" :key="index" :start="line.start" :end="line.end"></Line>
    <Card v-for="(card, index) in cards" :key="index" :card="card" />
  </Desk>
  <!-- <button @click="addCard">add</button> -->
</template>

<style>
html,
body,
svg {
  width: 100%;
  height: 100%;
  margin: 0;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #c6d9df;
}

.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
}
.unselectable::selection {
  color: currentColor;
  background: transparent;
}
</style>
