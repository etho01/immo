
<template>

  <div class="grid grid-cols-8 grid-rows-1">
    <Navbar />
    <div class="col-span-6">
      <RouterView />
    </div>
  </div>
</template>

<script>

import Navbar from "./components/navbar/Navbar.vue";
import PaiementRetard from "./components/paiement/PaiementRetard.vue";

export default {
    name: 'App',
    components: {
      PaiementRetard,
      Navbar
  }
}
</script>