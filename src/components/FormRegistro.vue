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
              <a href="/iniciarsesion" class="text-primary">¿Ya tienes cuenta? Inicia sesión</a>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { db, auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";

export default {
  name: "Registro",
  data() {
    return {
      nombre: '',
      correo: '',
      contrasena: '',
      error: null
    };
  },
  methods: {
    async registrarse() {
      try {
        // Validación básica
        if (!this.nombre || !this.correo || !this.contrasena) {
          throw new Error("Todos los campos son obligatorios");
        }

        // 1. Crear usuario en Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth, // Usamos el auth importado de tu config
          this.correo,
          this.contrasena
        );
        
        // 2. Guardar datos en Firestore
        await setDoc(doc(db, "usuarios", userCredential.user.uid), {
    uid: userCredential.user.uid,
    nombre: this.nombre,
    email: this.correo,
    fechaRegistro: new Date()
});

        console.log("Usuario creado en Auth y Firestore");
        this.$router.push('/iniciarsesion');
        
      } catch (error) {
        console.error("Error:", error);
        this.error = this.traducirError(error.code) || error.message;
      }
    },
    traducirError(codigo) {
      const errores = {
        'auth/email-already-in-use': 'El correo ya está registrado',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres'
      };
      return errores[codigo];
    }
  }
};
</script>
  
  <style scoped>
  /* Estilos originales sin cambios */
  </style>