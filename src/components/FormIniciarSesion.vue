<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card p-4 shadow">
          
          <!-- Campo de Correo (sin texto arriba) -->
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Correo"
              v-model="correo"
            />
          </div>

          <!-- Campo de Contraseña (sin texto arriba) -->
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Contraseña"
              v-model="contrasena"
            />
          </div>

          <!-- Botón Iniciar -->
          <div class="d-grid mb-3">
            <button class="btn" style="background-color: black; color: white;" @click="iniciarSesion">Iniciar Sesión</button>
          </div>

          <!-- Link Registrarse -->
          <div class="d-flex justify-content-end">
            <a href="#" class="text-primary">Registrarse</a>
          </div>

          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IniciarSesion",
  data() {
    return {
      correo: '',
      contrasena: ''
    };
  },
  methods: {
    iniciarSesion() {
      console.log("Correo:", this.correo);
      console.log("Contraseña:", this.contrasena);
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
}
.card {
  border-radius: 1rem;
}
</style>
