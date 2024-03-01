<template>
  <div class="home">
    home page
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>

<style scoped>
  @import '~@/assets/styles/responsive.scss';
  .home {
      margin: 10px 20px;
  }
  li {
    padding: 10px;
  }
</style>
