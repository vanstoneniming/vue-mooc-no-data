<template>
  <div class="paper-detail" @click="goToDetail(item.id)">
    <!-- Header row -->
    <div class="header-content">
      <el-tag effect="dark" round>{{ index }}</el-tag>
      <div class="quest-title" v-html="sanitizeHTML(item.papername)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sanitizeHTML } from '@/hooks/utils/helper'
import router from '@/router'
import { defineComponent } from 'vue'

function goToDetail (id: number) {
  router.push({ name: 'PaperDetail', params: { id } })
}

defineComponent({
  name: 'paperfrom-detail'
})

// eslint-disable-next-line no-undef
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

.content-row {
  display: flex;
  flex-direction: column; /* Default to column layout */
}

.image-preview {
  margin-bottom: 20px; /* Add spacing between image and text */
}

.image-preview .el-image {
  width: 100%;
}

.button-row {
  margin-top: 20px; /* Add spacing between content and buttons */
}

/* Media query for wider screens */
@media screen and (min-width: 768px) {
  .content-row {
    flex-direction: row; /* Switch to row layout on wider screens */
  }

  .image-preview {
    margin-right: 20px; /* Add spacing between image and text */
    margin-bottom: 0; /* Remove bottom margin */
  }

  .image-preview .el-image {
    width: 360px;
  }
}
</style>
