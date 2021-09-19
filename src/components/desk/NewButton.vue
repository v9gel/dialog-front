<script setup lang="ts">
import store, {CardData} from "../../store";

const props = defineProps<{
  currentButtonsCount: number;
  card: CardData
}>()

const addButton = () => {
  store.commit('addButton', props.card.status);
}
</script>

<template>
<<<<<<< HEAD
    <div
        :class="`new-button`"
        @click="addButton"
    >
        <div class="text">➕</div>
    </div>
=======
  <div
      :class="`new-button ${currentButtonsCount !== 0 ? ' right-button' : ''}`"
      @click="addButton"
  >
    <div class="text">➕</div>
  </div>
>>>>>>> 10b419d4fada2d5c5762e6f6d1e39a2f61a0d72a
</template>

<style scoped>
.new-button {
<<<<<<< HEAD
    margin-top: 5px;
    background: #9aa9b2;
    border-radius: 0.5em;
    box-sizing: border-box;
    width: 300px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
=======
  background: #9aa9b2;
  border-radius: 0.5em;
  box-sizing: border-box;
  width: 300px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
>>>>>>> 10b419d4fada2d5c5762e6f6d1e39a2f61a0d72a
}

.right-button {
  margin-left: 5px;
  position: absolute;
  left: 300px;
  width: 37px;
}

.text {
  height: 14px;
  font-family: Roboto;
  font-style: regular;
  font-weight: 500;
  font-size: 14px;
  color: white;
}
</style>