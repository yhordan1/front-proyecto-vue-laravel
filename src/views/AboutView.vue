<script setup>
import {ref} from "vue";
import authService from "../services/auth.service";

const perfil = ref(null)

async function funPerfil (){
  const { data } = await authService.getPerfil();
  perfil.value = data
}
funPerfil()
</script>

<template>
  <div class="card" v-if="perfil">
    <h1>Correo: {{ perfil.email }}</h1>
    <h1>Nombre: {{ perfil.name }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
