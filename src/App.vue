<script setup>
import { onMounted } from 'vue';
import Card from './components/Card.vue';
import Single from './components/pages/Single.vue';
import Popular from './components/pages/Popular.vue';
import Search from './components/pages/Search.vue';
import Navbar from './components/Navbar.vue';


</script>
<template>
<Navbar />
<div class="container mx-auto">
  <RouterView />
  <!-- <Popular /> -->
  <!-- <Single /> -->
  <!-- <Search />  -->
  </div>
</template>
<style scoped></style>
