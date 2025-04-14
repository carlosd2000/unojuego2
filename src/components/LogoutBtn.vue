<script setup>
const logout = () => {
  // Lógica para cerrar sesión
  console.log("Cerrando sesión...");
}
</script>

<template>
  <div class="logout-button-container">
    <button @click="logout" class="btn logout-button">Cerrar sesión</button>
  </div>
</template>

<style scoped>
.logout-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout-button {
  background-color: #000000; /* Botón de color negro */
  color: #ffffff; /* Texto blanco */
  border: 2px solid #000000; /* Borde negro */
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease; /* Suavizar transición */
}

.logout-button:hover {
  background-color: #ffffff; /* Fondo blanco al hacer hover */
  color: #000000; /* Texto negro al hacer hover */
  border-color: #000000; /* Borde negro al hacer hover */
}
</style>
