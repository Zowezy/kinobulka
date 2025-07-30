<script>
  import { ContentLoader } from "vue-content-loader"

  export default {
    components: { ContentLoader }
  }
</script>

<template>
  <content-loader
    class="w-[100%] relative mt-5 rounded-[6px]"
    viewBox="0 0 236 460"
    :speed="1"
    primaryColor="#1f232d"
    secondaryColor="#171a21"
  >
    <rect x="0" y="0" rx="0" ry="0" width="236px" height="460px" /> 
  </content-loader>
</template>