// src/services/inGameService.js
import { collection, getDocs, doc, updateDoc, getDoc, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

// Obtener cartas de la colección 'cards'
const getCards = async () => {
  try {
    const cardsRef = collection(db, 'cards');
    const cardsSnap = await getDocs(cardsRef);
    const cards = cardsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return cards;
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    return [];
  }
};

// Asignar 7 cartas aleatorias a cada participante
export const assignCardsToParticipants = async (gameId) => {
    try {
      const cards = await getCards();
      if (cards.length === 0) {
        console.log('No hay cartas disponibles.');
        return;
      }
  
      const gameRef = collection(db, 'games');
      const gameQuery = query(gameRef, where('code', '==', gameId));
      const gameSnap = await getDocs(gameQuery);
  
      if (!gameSnap.empty) {
        const gameDoc = gameSnap.docs[0];
        const cardInstancesRef = collection(gameDoc.ref, 'card_instances');
        const cardInstancesSnap = await getDocs(cardInstancesRef);
  
        if (!cardInstancesSnap.empty) {
          console.log('Ya se asignaron cartas previamente. No se reasignan.');
          return; // Evitamos volver a asignar si ya hay cartas
        }
  
        const participantsRef = collection(gameDoc.ref, 'participants');
        const participantsSnap = await getDocs(participantsRef);
  
        for (const participantDoc of participantsSnap.docs) {
          const participantData = participantDoc.data();
          const playerId = participantData.player_id;
          const assignedCards = getRandomCards(cards, 7);
  
          for (let i = 0; i < assignedCards.length; i++) {
            const card = assignedCards[i];
            await addDoc(cardInstancesRef, {
              card_id: doc(db, 'cards', card.id),
              location: 'hand',
              current_owner_player_id: playerId,
              card_order: i
            });
          }
  
          console.log(`Se asignaron 7 cartas al jugador ${playerId}`);
        }
      } else {
        console.log('Juego no encontrado.');
      }
    } catch (error) {
      console.error('Error al asignar las cartas:', error);
    }
  };
  

// Función para obtener cartas aleatorias
const getRandomCards = (cards, number) => {
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, number);
};

export const listenToPlayerCards = (gameId, playerId, callback) => {
  try {
    const cardInstancesRef = collection(db, 'games', gameId, 'card_instances');
    const q = query(cardInstancesRef, where('current_owner_player_id', '==', playerId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cards = [];
      querySnapshot.forEach((doc) => {
        cards.push({ id: doc.id, ...doc.data() });
      });
      callback(cards);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error al escuchar las cartas del jugador:', error);
    return () => {}; // Retorna una función vacía si falla
  }
};
