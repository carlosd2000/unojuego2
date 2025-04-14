<script setup> 
import Logo from "../components/Logo.vue"
import PlayersList from "../components/PlayersList.vue"
import RoomCode from "../components/RoomCode.vue"
import StartGameBtn from "../components/StartGameBtn.vue"

const players = [
  { name: "Erick" },
  { name: "Carlos" },
  { name: "Johan" },
  { name: "Lucía" },
];

const roomCode = "12345"; // Código de la sala de ejemplo
</script>

<template>
  <div class="pregame-room">
    <Logo />
    <RoomCode :code="roomCode" />
    <PlayersList :players="players" />
    <StartGameBtn />
  </div>
</template>

<style scoped>
.pregame-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
  gap: 30px; /* Espacio entre los componentes */
}

.pregame-room h3 {
  font-size: 1.5rem;
  color: #333;
}
</style>
