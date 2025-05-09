<script setup>
import AvatarUser from '../components/AvatarUser.vue'
import HandPlayer from '../components/HandPlayer.vue'
import HandOpponent from '../components/HandOpponent.vue'
import DeckOutCard from '../components/DeckOutCard.vue'
import DeckInCard from '../components/DeckInCard.vue'
import UnoButton from '../components/UnoButton.vue'
import ExitButton from '../components/ExitButton.vue'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

const currentCard = ref({ number: '7', color: 'red' })
const participants = ref([])

const route = useRoute()
const gameId = route.params.gameId  // El valor de gameId proviene de los parámetros de la URL

const handleUnoCalled = () => {
  console.log('¡UNO! fue llamado')
}

const handleExitGame = () => {
  console.log('Saliendo del juego...')
}

const handleCardPlayed = (cardData) => {
  console.log('Carta jugada:', cardData)
  currentCard.value = cardData
}

const loadParticipants = async () => {
  if (!gameId) {
    console.error('No se encontró el ID del juego')
    return
  }

  const gamesQuery = query(
    collection(db, 'games'),
    where('code', '==', gameId)  // Buscamos donde el campo 'code' sea igual al gameId
  )

  const querySnapshot = await getDocs(gamesQuery)

  if (querySnapshot.empty) {
    console.log('No se encontró el juego con el ID proporcionado')
    return
  }

  const gameDoc = querySnapshot.docs[0]
  const participantsQuery = query(
    collection(db, 'games', gameDoc.id, 'participants')
  )

  const participantsSnapshot = await getDocs(participantsQuery)
  participants.value = participantsSnapshot.docs.map(doc => doc.data())

  console.log('Cantidad de participantes:', participants.value.length)
}

onMounted(() => {
  if (gameId) {
    loadParticipants()
  } else {
    console.error('ID del juego no disponible')
  }
})
</script>

<template>
  <main class="game-container">
    <div class="exit-button-container">
      <ExitButton @exit-game="handleExitGame" />
    </div>
    <div class="game-layout">
      <!-- Oponente superior -->
      <div class="opponent-section top" v-if="participants.length > 1">
        <div class="row align-items-center justify-content-center">
          <div class="col-2">
            <DeckInCard />
          </div>
          <div class="col-2">
            <AvatarUser v-if="participants[1]" :name="participants[1].nickname" :score="0" :isTurn="false" />
          </div>
          <div class="col-6">
            <HandOpponent v-if="participants[1]" />
          </div>
        </div>
      </div>

      <div class="middle-section">
        <!-- Oponente izquierdo -->
        <div class="opponent-section left" v-if="participants.length > 2">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="d-flex flex-column align-items-center">
                <AvatarUser v-if="participants[2]" :name="participants[2].nickname" :score="0" :isTurn="false" />
                <HandOpponent v-if="participants[2]" :isVertical="true" rotateDirection="left" />
              </div>
            </div>
          </div>
        </div>

        <!-- Tablero central -->
        <div class="game-board">
          <div class="deck-placeholder">
            <DeckOutCard :number="currentCard.number" :color="currentCard.color" />
          </div>
        </div>

        <!-- Oponente derecho -->
        <div class="opponent-section right" v-if="participants.length > 3">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="d-flex flex-column align-items-center">
                <AvatarUser v-if="participants[3]" :name="participants[3].nickname" :score="0" :isTurn="false" />
                <HandOpponent v-if="participants[3]" :isVertical="true" rotateDirection="right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Jugador -->
      <div class="player-section">
        <div class="row align-items-center">
          <div class="col-2">
            <AvatarUser v-if="participants[0]" :name="participants[0].nickname" :score="0" :isTurn="true" />
          </div>
          <div class="col-8">
            <HandPlayer @card-played="handleCardPlayed" />
          </div>
          <div class="col-2">
            <UnoButton @uno-called="handleUnoCalled" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
.game-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.exit-button-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.game-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
}

.middle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 2rem;
}

.opponent-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.opponent-section.left,
.opponent-section.right {
  width: 200px;
  height: 100%;
  min-height: 400px;
}

.opponent-section.left .hand-opponent,
.opponent-section.right .hand-opponent {
  transform: rotate(90deg);
}

.game-board {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
}

.player-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.deck-placeholder {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.current-card {
  position: relative;
  z-index: 2;
}

.card-uno {
  width: 120px;
  height: 180px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.card-uno:hover {
  transform: scale(1.05);
}

.opponent-section.top {
  position: relative;
}

.deck-in-card {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}
</style>
