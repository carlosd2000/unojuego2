<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { assignCardsToParticipants } from '../firebase/inGameService.js'
import { getPlayerIdByCurrentUser } from '../firebase/GameService.js'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config.js'
import CardUNO from './CardUNO.vue'

const emit = defineEmits(['card-played'])
const hand = ref([])
const unsubscribe = ref(null) // Definir la referencia correctamente

const handleCardPlayed = (cardData) => {
  emit('card-played', cardData)
}

const loadCards = async () => {
  try {
    const route = useRoute()
    const gameId = route.params.gameId  // Aquí mantenemos 'gameId' como está
    
    console.log('gameId (code desde params):', gameId)

    // 1. Obtener el ID del jugador actual
    const playerId = await getPlayerIdByCurrentUser()
    console.log('playerId (ID del jugador actual):', playerId)

    // 2. Asignar cartas
    console.log('Asignando cartas a los participantes...')
    await assignCardsToParticipants(gameId)  // Usamos gameId para llamar la función

    // 3. Obtener el documento del juego usando el campo 'code' como identificador
    const gamesRef = collection(db, 'games')
    const gameQuery = query(gamesRef, where('code', '==', gameId))  // Buscar por 'code'
    const gameSnap = await getDocs(gameQuery)

    if (!gameSnap.empty) {
      const gameDoc = gameSnap.docs[0]
      console.log('Documento del juego:', gameDoc.data())

      // 4. Obtener las cartas del jugador desde la subcolección 'card_instances'
      const cardInstancesRef = collection(gameDoc.ref, 'card_instances')
      const cardInstancesSnap = await getDocs(cardInstancesRef)

      console.log(`Se encontraron ${cardInstancesSnap.size} documentos en 'card_instances'`)

      const playerCards = []

      // Filtrar las cartas del jugador actual
      cardInstancesSnap.forEach(doc => {
        const cardData = doc.data()
        console.log('Card instance data:', cardData)  // Imprimir datos de cada carta
        if (cardData.current_owner_player_id === playerId) {
          playerCards.push(cardData)
        }
      })

      console.log('Cartas filtradas para el jugador actual:', playerCards)

      // Obtener detalles completos de cada carta
      const detailedCards = await Promise.all(playerCards.map(async (cardInstance) => {
        const cardRef = doc(db, 'cards', cardInstance.card_id.id) // Obtener referencia al documento de la carta
        const cardSnap = await getDoc(cardRef)
        
        if (cardSnap.exists()) {
          const cardData = cardSnap.data()
          console.log('Datos completos de la carta:', cardData)
          return {
            id: cardInstance.id,
            number: cardData.number ?? null,
            color: cardData.color ?? null,
            is_special: cardData.is_special ?? false
          }
        } else {
          console.log(`Carta no encontrada para card_id: ${cardInstance.card_id.id}`)
          return null
        }
      }))

      // Filtrar las cartas que no se hayan encontrado
      hand.value = detailedCards.filter(card => card !== null)
      console.log('Cartas completas:', hand.value)

    } else {
      console.log('No se encontró el documento del juego con el código:', gameId)
    }

  } catch (error) {
    console.error('Error al cargar las cartas:', error)
  }
}



onMounted(() => {
  loadCards()
})

// Asegurarse de limpiar la suscripción cuando el componente se destruya
onUnmounted(() => {
  if (unsubscribe.value) {
    unsubscribe.value()  // Desuscribir de la escucha en tiempo real
  }
})
</script>

<template>
  <div class="hand-container">
    <div class="hand">
      <CardUNO 
        v-for="(card, index) in hand" 
        :key="index" 
        :number="card.number" 
        :color="card.color" 
        :is-special="card.is_special" 
        @card-played="handleCardPlayed" 
      />
    </div>
  </div>
</template>

<style scoped>
.hand-container {
  width: 100%;
  overflow-x: auto;
  padding: 20px 0;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* Mejora el scroll en iOS */
}

.hand {
  display: inline-flex;
  gap: 10px;
  padding: 0 20px;
}

.hand .card-uno {
  transition: transform 0.2s;
  flex-shrink: 0;
}

.hand .card-uno:hover {
  transform: translateY(-20px);
}

/* Estilo personalizado para la barra de scroll */
.hand-container::-webkit-scrollbar {
  height: 8px;
}

.hand-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.hand-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.hand-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .hand-container {
    padding: 10px 0;
  }

  .hand {
    gap: 5px;
    padding: 0 10px;
  }

  .hand .card-uno:hover {
    transform: translateY(-10px);
  }
}
</style>
