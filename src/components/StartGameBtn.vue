<template>
  <div class="start-button-container">
    <button class="start-btn" @click="startGame">
      Iniciar Partida
    </button>
  </div>
</template>

<script setup>
import { updateDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const props = defineProps({
  gameId: {
    type: String,
    required: true
  }
});

const startGame = async () => {
  try {
    console.log("Intentando iniciar juego..."); // Debug
    const q = query(collection(db, 'games'), where('code', '==', props.gameId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      await updateDoc(doc(db, 'games', querySnapshot.docs[0].id), {
        status: 'in_progress',
        started_at: new Date()
      });
      console.log("Estado del juego actualizado"); // Debug
    }
  } catch (error) {
    console.error("Error al iniciar:", error);
  }
};
</script>

<style scoped>
.start-button-container {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.start-btn {
  padding: 12px 24px;
  background-color: #f8f9fa;
  color: rgb(206, 10, 10);
  border: 2px solid rgb(206, 10, 10);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.start-btn:hover {
  background-color: rgb(206, 10, 10);
  color: white;
}
</style>