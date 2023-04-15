
<template>

  <div class="flex h-full w-full">
    <Navbar />
    <RouterView class="overflow-auto"/>
  </div>
</template>

<script>

import Navbar from "./components/navbar/Navbar.vue";
import MenuContrat from "./components/menu/MenuContrat.vue";
import MenuAppart from "./components/menu/MenuAppart.vue";
import MenuLocataire from "./components/menu/MenuLocataire.vue";

export default {
    name: 'App',
    components: {
      MenuContrat,
      Navbar,
      MenuAppart,
      MenuLocataire
  }
}
</script>