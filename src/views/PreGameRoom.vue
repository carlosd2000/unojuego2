<script setup>
import Logo from "../components/Logo.vue"
import PlayersList from "../components/PlayersList.vue"
import RoomCode from "../components/RoomCode.vue"
import StartGameBtn from "../components/StartGameBtn.vue"
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { db } from '../firebase/config'; // Asegúrate de tener la configuración de Firebase correcta
import { collection, query, where, onSnapshot, doc, getDoc, getDocs } from 'firebase/firestore';

const route = useRoute();
const gameId = route.params.gameId;

const players = ref([]); // Este será el arreglo de jugadores que obtendrás de Firestore

// Función para obtener jugadores de Firestore (inicialmente, al montar el componente)
const getPlayers = async () => {
  try {
    const gameRef = collection(db, 'games');    
    const gameQuery = query(gameRef, where('code', '==', gameId));
    const gameSnap = await getDocs(gameQuery);

    if (!gameSnap.empty) {
      const gameData = gameSnap.docs[0].data();
      const participantsRef = collection(gameSnap.docs[0].ref, 'participants');

      // Escuchar cambios en tiempo real en la subcolección 'participants'
      onSnapshot(participantsRef, async (participantsSnap) => {
        // Recuperar la información de los jugadores
        players.value = [];
        for (const participantDoc of participantsSnap.docs) {
          const participantData = participantDoc.data();
          const playerRef = doc(db, 'players', participantData.player_id);
          const playerSnap = await getDoc(playerRef);
          if (playerSnap.exists()) {
            players.value.push(playerSnap.data());
          }
        }
      });
    } else {
      console.log('No se encontró la sala.');
    }
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
  }
};

// Obtener los jugadores cuando se monta el componente
onMounted(() => {
  if (gameId) {
    getPlayers();
  } else {
    console.warn('No hay gameId definido aún');
  }
});
</script>

<template>
  <div class="pregame-room">
    <Logo />
    <RoomCode :code="gameId" />
    <!-- Ahora pasas los jugadores dinámicamente a PlayersList -->
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
