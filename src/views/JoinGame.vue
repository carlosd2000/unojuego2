<script setup>
import Logo from '@/components/Logo.vue';
import JoinGame from '@/components/JoinGame.vue';
import JoinButton from '@/components/JoinButton.vue';
import { ref } from 'vue';

const gameId = ref("");
</script>

<template>
    <main class="form-joingame-container">
        <div class="logo-container">
            <Logo/>
        </div>
        <div class="join-component">
            <JoinGame v-model="gameId"/>
        </div>
        <div class="join-btn-container">
            <JoinButton :game-id="gameId"/>
        </div>
    </main>
</template>

<style scoped>
.form-joingame-container{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.logo-container{
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.join-component{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
}
.join-button-container{
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>