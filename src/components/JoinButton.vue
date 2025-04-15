<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getAuth } from 'firebase/auth';
import { unirseASala } from '../firebase/GameService'; // ajustá la ruta si es distinta

const props = defineProps(["gameId"]);
const router = useRouter();
const handleJoinRoom = async () => {
try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    if (!props.gameId) {
        throw new Error('Debes ingresar un código de partida');
    }
    console.log("Gameid: ", props.gameId)
    await unirseASala(props.gameId, user.uid);
    router.push({ name: 'pregameroom', params: { gameId: props.gameId} });
    console.log('Unido a la sala correctamente');

    // Aquí podrías navegar a la sala si ya tenés rutas configuradas
    // Por ejemplo: router.push(`/sala/${gameId}`);
} catch (error) {
    console.error('Error al unirse a la sala:', error.message);
    // Podés mostrar un mensaje al usuario si querés
}
};
</script>

<template>
    <button @click="handleJoinRoom" class="btn-joingame">
        <span>Ingresar a la partida</span>
    </button>
</template>

<style scoped>
.btn-joingame {
    padding: 12px 30px;
    border-radius: 6px;
    font-weight: bold;
    background-color: black;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}
.btn-joingame:hover {
    background-color: #ffffff;
    color: #000000;
    border-color: #000000;
}
</style>