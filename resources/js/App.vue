
<template>

  <div class="flex h-full w-full">
    <Navbar v-if="showNavBar"/>
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
    data() {
      return {
        routeWithoutNavBar : [
          '/login'
        ]
      }
    },
    computed: {
      showNavBar() {
        return !this.routeWithoutNavBar.includes(this.$route.fullPath);
      }
    },
    components: {
      MenuContrat,
      Navbar,
      MenuAppart,
      MenuLocataire
  }
}
</script>