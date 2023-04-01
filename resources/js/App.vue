
<template>

  <div class="flex h-full w-full">
    <Navbar />
    <RouterView class="overflow-auto"/>
  </div>
</template>

<script>

import Navbar from "./components/navbar/Navbar.vue";
import ContratMenu from "./components/contrat/ContratMenu.vue";

export default {
    name: 'App',
    components: {
      ContratMenu,
      Navbar
  }
}
</script>