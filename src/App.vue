<script setup>
import { onMounted } from 'vue';
import Card from './components/Card.vue';
import Single from './components/pages/Single.vue';
import Popular from './components/pages/Popular.vue';
import Search from './components/pages/Search.vue';
import Navbar from './components/Navbar.vue';


</script>
<template>
<div class="flex min-h-screen">
  <Navbar />
  <main class="flex-1 sm:ml-20">
    <div class="container mx-auto p-5">
      <RouterView />
    </div>
  </main>
  <!-- <Popular /> -->
  <!-- <Single /> -->
  <!-- <Search />  -->
</div>
</template>
<style scoped></style>
