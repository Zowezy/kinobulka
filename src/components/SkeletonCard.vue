<script>
  import { ContentLoader } from "vue-content-loader"

  export default {
    components: { ContentLoader }
  }
</script>

<template>
  <content-loader
    class="block"
    viewBox="0 0 236 330"
    :speed="1"
    primaryColor="#1f232d"
    secondaryColor="#171a21"
  >
    <rect x="0" y="5" rx="0" ry="0" width="236" height="330" /> 
  </content-loader>
</template>