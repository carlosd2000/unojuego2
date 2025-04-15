<script setup>
import Logo from "../components/Logo.vue"
import PlayersList from "../components/PlayersList.vue"
import RoomCode from "../components/RoomCode.vue"
import StartGameBtn from "../components/StartGameBtn.vue"
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '../firebase/config';
import { 
  doc, 
  onSnapshot, 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc,  // ¡Esta importación faltaba!
  updateDoc 
} from 'firebase/firestore';

const route = useRoute();
const router = useRouter();
const gameId = route.params.gameId;
const players = ref([]);
let gameUnsubscribe = null;
let playersUnsubscribe = null;

const loadGameData = async () => {
  try {
    const gameQuery = query(collection(db, 'games'), where('code', '==', gameId));
    const gameSnapshot = await getDocs(gameQuery);

    if (gameSnapshot.empty) return;

    const gameDocRef = doc(db, 'games', gameSnapshot.docs[0].id);
    
    gameUnsubscribe = onSnapshot(gameDocRef, (doc) => {
      if (doc.exists() && doc.data().status === 'in_progress') {
        router.push({ name: 'GameBoard', params: { gameId } });
      }
    });

    const participantsRef = collection(gameSnapshot.docs[0].ref, 'participants');
    playersUnsubscribe = onSnapshot(participantsRef, async (snap) => {
      players.value = [];
      for (const participantDoc of snap.docs) {
        const participantData = participantDoc.data();
        const playerDoc = await getDoc(doc(db, 'players', participantData.player_id));  // Aquí se usa getDoc
        if (playerDoc.exists()) {
          players.value.push({
            ...playerDoc.data(),
            id: participantData.player_id,
            is_host: participantData.is_host || false
          });
        }
      }
      console.log("Jugadores actualizados:", players.value);
    });

  } catch (error) {
    console.error("Error:", error);
  }
};

onUnmounted(() => {
  if (gameUnsubscribe) gameUnsubscribe();
  if (playersUnsubscribe) playersUnsubscribe();
});

onMounted(() => {
  if (gameId) loadGameData();
});
</script>

<template>
  <div class="pregame-room">
    <Logo />
    <RoomCode :code="gameId" />
    <PlayersList :players="players" />
    <StartGameBtn :game-id="gameId" />
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
  gap: 30px;
}
</style>