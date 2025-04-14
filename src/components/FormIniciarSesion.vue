<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card p-4 shadow">
          <div v-if="error" class="alert" role="alert">
              {{ error }}
          </div>
          <form @submit.prevent="handleSubmit">

            <!-- Campo de Correo (sin texto arriba) -->
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Correo"
                v-model="formData.correo"
              />
            </div>
  
            <!-- Campo de Contraseña (sin texto arriba) -->
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Contraseña"
                v-model="formData.contrasena"
              />
            </div>
  
            <!-- Botón Iniciar -->
            <div class="d-grid mb-3">
              <button type="submit" class="btn" style="background-color: black; color: white;" :disabled="loading">
                {{ loading ? "Iniciando..." : "Iniciar Sesión" }}
              </button>
            </div>
  
            <!-- Link Registrarse -->
            <div class="d-flex justify-content-end">
              <a href="/" class="text-primary">Registrarse</a>
            </div>
          </form>         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/firebase/auth';
export default {
  name: "IniciarSesion",
  data() {
    return {
      formData: {
        correo: "",
        contrasena: ""
      },
      loading: false,
      error: null
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null

      const result = await AuthService.login({
        email: this.formData.correo,
        password: this.formData.contrasena
      })

      if (result.success) {
        this.$router.push("/lobby")
      } else {
        this.error = result.error
      }
      
      this.loading = false
    }
  }
};
</script>

<style scoped>
.alert {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8d7da;
  border: 2px solid #000;
  color: #721c24;
  border-radius: 8px;
  font-weight: bold;
  max-width: 400px;
  width: 100%;
}
</style>
