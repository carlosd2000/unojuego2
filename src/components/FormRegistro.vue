<template>
    <div class="container d-flex justify-content-center align-items-center">
      <div class="row w-100">
        <div class="col-12 col-md-6 offset-md-3">
          <div class="card p-4 shadow">
            
            <!-- Nombre -->
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                v-model="nombre"
              />
            </div>
  
            <!-- Correo -->
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Correo"
                v-model="correo"
              />
            </div>
  
            <!-- Contraseña -->
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Contraseña"
                v-model="contrasena"
              />
            </div>
  
            <!-- Botón Registrarse -->
            <div class="d-grid mb-3">
              <button 
                class="btn" 
                style="background-color: black; color: white;" 
                @click="registrarse"
              >
                Registrarse
              </button>
            </div>
  
            <!-- Link Iniciar Sesión -->
            <div class="d-flex justify-content-end">
              <a href="/src/views/IniciarSesion.vue" class="text-primary">¿Ya tienes cuenta? Inicia sesión</a>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Registro",
    data() {
      return {
        nombre: '',
        correo: '',
        contrasena: ''
      };
    },
    methods: {
      registrarse() {
        console.log("Datos de registro:", {
          nombre: this.nombre,
          correo: this.correo,
          contrasena: this.contrasena
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos originales sin cambios */
  </style>