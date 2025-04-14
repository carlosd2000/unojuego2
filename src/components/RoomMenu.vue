<template>
    <div class="room-actions-container">
      <div class="room-actions">
        <button @click="createRoom" class="btn btn-primary">Crear Sala</button>
        <button @click="joinRoom" class="btn btn-secondary">Unirse a Sala</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const createRoom = () => {
    // Lógica para crear una nueva sala
    console.log("Creando una nueva sala...");
  };
  
  const joinRoom = () => {
    // Lógica para unirse a una sala existente
    console.log("Uniéndose a una sala...");
  };
  </script>
  
  <style scoped>
  .room-actions-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
  }
  
  .room-actions h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px; /* Espacio entre el título y los botones */
  }
  
  .room-actions {
    display: flex;
    flex-direction: column; /* Asegura que los botones se alineen de arriba a abajo */
    gap: 10px; /* Espacio entre los botones */
  }
  
  .room-actions button {
    width: 200px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .room-actions .btn-primary {
  background-color: #ffffff;
  color: rgb(206, 10, 10);
  border: 2px solid rgb(206, 10, 10);
  transition: all 0.3s ease; /* Añadido para suavizar la transición */
}

.room-actions .btn-primary:hover {
  background-color: rgb(206, 10, 10); /* Cambiar el fondo al pasar el cursor */
  color: #ffffff; /* Cambiar el color del texto */
  border-color: #ffffff; /* Cambiar el color del borde */
}

.room-actions .btn-secondary {
  background-color: #ffffff;
  color: #2196f3;
  border: 2px solid #2196f3;
  transition: all 0.3s ease; /* Añadido para suavizar la transición */
}

.room-actions .btn-secondary:hover {
  background-color: #2196f3; /* Cambiar el fondo al pasar el cursor */
  color: #ffffff; /* Cambiar el color del texto */
  border-color: #ffffff; /* Cambiar el color del borde */
}

  
  .room-actions button:hover {
    opacity: 0.9;
  }
  </style>
  