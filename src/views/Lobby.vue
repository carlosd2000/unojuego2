<script setup>
import RoomMenu from "../components/RoomMenu.vue";
import Logo from "../components/Logo.vue";
import LogoutBtn from "../components/LogoutBtn.vue";
</script>

<template>
  <div class="main-container">
    <Logo />
    <RoomMenu class="room-menu" />
    <LogoutBtn />
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centra todo el contenido verticalmente */
  height: 100vh;
  background-color: #ffffff;
  padding: 20px;
}

.room-menu {
  margin-top: 40px; /* Separación moderada entre logo y el menú */
}

.logout-button-container {
  margin-top: 20px; /* Separación entre el RoomMenu y el botón de Cerrar Sesión */
}
</style>
