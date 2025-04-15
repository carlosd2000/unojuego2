<template>
    <div class="joingame-container">
        <h2>Ingresar Código</h2>
        <div class="input-container">
          <input
            v-model="gameIdInput"
            @input="updateGameId"
            type="text"
            class="joingame-input"
            placeholder="Código de la partida"
          />
        </div>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const gameIdInput = ref(props.modelValue || "");

const updateGameId = () => {
  emit("update:modelValue", gameIdInput.value.trim());
};

watch(() => props.modelValue, (newValue) => {
  gameIdInput.value = newValue;
});
</script>
  
<style scoped>
.joingame-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  border: 1px solid black;
  box-shadow: 0 0 5px rgba(26, 25, 25, 0.526);
  padding: 30px;
}
.joingame-input {
  font-size: 1em;
  padding: 12px;
  width: 100%;
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  text-align: center;
  transition: all 0.1s ease;
}
.joingame-input:focus {
  transform: scale(1.05);
  outline: none;
  border-color: aqua;
}
</style>
  