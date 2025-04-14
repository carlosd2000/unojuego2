<!-- src/components/RoomCode.vue -->
<template>
    <div class="room-code text-center">
      <strong>Código:</strong> {{ code }}
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    code: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .room-code {
    font-size: 1.2rem;
    max-width: 300px;
    margin: 0 auto;  
    padding: 10px;
    border-radius: 5px;

  }
  
  .room-code strong {
    font-weight: bold;
  }
  </style>
