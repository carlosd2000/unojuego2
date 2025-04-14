<template>
<div class="joingame-container">
    <div class="logo-container">
        <Logo/>
    </div>
    <div class="form-container">
        <h2>Ingresar Código</h2>
        <div class="input-container">
            <input 
            type="text" 
            class="joingame-input" 
            placeholder="Código de la partida">
        </div>
        <div class="btn-container">
            <button 
            class="btn-joingame">
            Ingresar a la partida</button>
        </div>
    </div>
</div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
</script>

<style scoped>
.joingame-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    text-align: center;
    position: center;
    font-weight: bold;
}
.form-container{
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px rgba(26, 25, 25, 0.526);
    padding: 30px;
    gap: 15px;
}
.joingame-input{
    font-size: 1em;
    padding: 12px;
    width: 100%;
    background-color: white;
    border: 2px solid black;
    border-radius: 6px;
    font-size: 1rem;
    text-align: center;
    transition: all 0.1s ease;
}
.joingame-input:focus{
    transform: scale(1.05);
    outline: none;
    border-color: aqua;
}
.btn-joingame{
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
.btn-joingame:hover{
    background-color: #ffffff; 
    color: #000000; 
    border-color: #000000;
}
</style>