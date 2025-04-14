<!-- src/components/StartButton.vue -->
<template>
    <div class="start-button-container text-center mt-4">
      <button class="btn btn-success btn-lg" @click="startGame">
        Iniciar Partida
      </button>
    </div>
  </template>
  
  <script setup>
  const startGame = () => {
    // Lógica para iniciar la partida
    console.log("Iniciando partida...");
  }
  </script>
  
  <style scoped>
  .start-button-container {
    width: 100%;
  }
  
  .btn{
    color: rgb(206, 10, 10);;
    background-color: #f8f9fa;
    border: 2px solid rgb(206, 10, 10);
  }
.btn:hover {
  background-color: rgb(206, 10, 10); /* Cambiar el fondo al pasar el cursor */
  color: #ffffff; /* Cambiar el color del texto */
  border-color: #ffffff; /* Cambiar el color del borde */
}
  </style>
  