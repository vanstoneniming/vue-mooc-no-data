<template>
  <div class="paper-detail">
    <!-- Header row -->
    <div class="header-content">
      <el-tag effect="dark" round>{{ index }}</el-tag>
      <el-text class="quest-title" line-clamp="2">{{item.papername}}</el-text>
<!--      <div v-html=""></div>-->
    </div>
  </div>
</template>

<script lang="ts" name="PaperFromDetail" setup>
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.el-tag {
  margin-right: 8px; /* Add spacing between el-tag and quest-title */
}

.paper-detail {
  display: flex;
  flex-direction: column;
}

.header-content {
  display: flex;
  align-items: center; /* Vertically center align elements */
}

</style>
