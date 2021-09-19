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
    <div
        :class="`new-button`"
        
    >
        <div class="text" @click="addButton">+</div>
    </div>
</template>

<style scoped>
.new-button {
    /* margin-top: 5px; */
    background: #ffffff00;
    border-radius: 0.5em;
    box-sizing: border-box;
    width: 300px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.right-button {
  margin-left: 5px;
  position: absolute;
  left: 300px;
  width: 37px;
}

.text {
  height: 28px;
  font-family: Roboto;
  font-style: regular;
  font-weight: 500;
  font-size: 28px;
  color: white;
  cursor: pointer;
}
</style>