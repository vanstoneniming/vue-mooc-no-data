<template>
  <div class="footer">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
defineComponent({
  name: 'LayoutFooter'
})
</script>
