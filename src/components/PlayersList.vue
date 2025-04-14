<!-- src/components/PlayersList.vue -->
<template>
    <div class="players-list card p-3">
      <ul class="list-group">
        <li 
          v-for="(player) in players" 
          :key="index" 
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ player.name }}
          <span class="badge bg-secondary">7</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    players: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  </script>
  
  <style scoped>
  .players-list {
    max-width: 400px;
    width: 100%;
  }
  </style>
  