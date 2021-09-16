<script setup lang="ts">
import Desk from "./components/desk/Desk.vue";
import Card from "./components/desk/Card.vue";
import { nanoid } from 'nanoid';
import { ref } from "@vue/reactivity";

interface CardData {
  id: string,
  text: string
}

const cards = ref([] as CardData[])
const addCard = () => {
  cards.value.push({ id: nanoid(), text: 'Текст' } as CardData)
}
</script>

<template>
  <Desk>
    <Card v-for="(card, index) in cards" :key="index">{{card.text}}</Card>
  </Desk>
  <button @click="addCard">add</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
