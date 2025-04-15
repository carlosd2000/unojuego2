<template>
    <div class="joingame-container">
      <div class="logo-container">
        <Logo />
      </div>
      <div class="form-container">
        <h2>Ingresar Código</h2>
        <div class="input-container">
          <input
            v-model="gameIdInput"
            type="text"
            class="joingame-input"
            placeholder="Código de la partida"
          />
        </div>
        <div class="btn-container">
          <button @click="handleJoinRoom" class="btn-joingame">
            Ingresar a la partida
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { getAuth } from 'firebase/auth';
  import { unirseASala } from '../firebase/GameService'; // ajustá la ruta si es distinta
  import Logo from '@/components/Logo.vue';
  
  const gameIdInput = ref('');
  const router = useRouter();
  const handleJoinRoom = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
  
      const gameId = gameIdInput.value.trim();
  
      if (!gameId) {
        throw new Error('Debes ingresar un código de partida');
      }
      console.log("Gameid: ", gameId)
      await unirseASala(gameId, user.uid);
      router.push({ name: 'pregameroom', params: { gameId: gameId} });
      console.log('Unido a la sala correctamente');
  
      // Aquí podrías navegar a la sala si ya tenés rutas configuradas
      // Por ejemplo: router.push(`/sala/${gameId}`);
    } catch (error) {
      console.error('Error al unirse a la sala:', error.message);
      // Podés mostrar un mensaje al usuario si querés
    }
  };
  </script>
  
  <style scoped>
  .joingame-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    text-align: center;
    font-weight: bold;
  }
  .form-container {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px rgba(26, 25, 25, 0.526);
    padding: 30px;
    gap: 15px;
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
  .btn-joingame {
    padding: 12px 30px;
    border-radius: 6px;
    font-weight: bold;
    background-color: black;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    width: 100%;
  }
  .btn-joingame:hover {
    background-color: #ffffff;
    color: #000000;
    border-color: #000000;
  }
  </style>
  