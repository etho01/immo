
<template>

  <div class="flex h-full w-full">
    <Navbar />
    <RouterView class="overflow-auto"/>
  </div>
</template>

<script>

import Navbar from "./components/navbar/Navbar.vue";
import ContratList from "./components/contrat/ContratList.vue";

export default {
    name: 'App',
    components: {
      ContratList,
      Navbar
  }
}
</script>