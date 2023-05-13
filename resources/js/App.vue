
<template>

  <div class="flex h-full w-full">
    <Navbar v-if="showNavBar"/>
    <RouterView class="overflow-auto"/>
  </div>
</template>

<script>

import Navbar from "./components/navbar/Navbar.vue";

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
      Navbar,
  }
}
</script>