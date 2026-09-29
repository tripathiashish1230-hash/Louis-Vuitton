<script>
import Navbar from './components/Navbar.vue';
// import Home from './components/Home.vue';

export default {
  components: {
    // Home,
    Navbar
  }
}
</script>
<template>
  <!-- <Home /> -->

  <Navbar />

  <router-view />
</template>
