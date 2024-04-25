<template>
  <div class="page-header">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{ item.papername }} </span>
      </template>
      <template #extra>
        <div class="flex items-center">
          <DownFile :item="item" v-if="userInfo.id"/>
          <el-switch v-model="showImg" active-text="显示图片" inactive-text="隐藏图片" inline-prompt
                     size="large"></el-switch>
        </div>
      </template>
    </el-page-header>
    <el-divider></el-divider>
  </div>

  <div class="paper-detail">
    <div class="content-row">
      <!-- Image preview -->
      <div class="image-preview">
        <el-image
          v-if="splitPreviewImages(item)[0]"
          :initial-index="4"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="splitPreviewImages(item)"
          :src="splitPreviewImages(item)[0]"
          :zoom-rate="1.2"
          fit="cover"
        />
      </div>

      <div class="text-content">
        <div class="content" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sanitizeHTML } from '@/hooks/utils/helper'
import { PaperConfig } from '@/types'
import router from '@/router'
import { defineComponent, defineProps, ref, watch } from 'vue' // Import defineProps directly from 'vue'
import DownFile from '@/components/paper/DownFile.vue'
import { userInfo } from '@/store/getters'

const props = defineProps<{ item: PaperConfig }>() // Define props using defineProps
const showImg = ref(true)
const content = ref('')

function goBack () {
  router.go(-1)
}

function splitPreviewImages (item: PaperConfig) {
  return item && item.previewimages ? item.previewimages.split(',') : []
}

watch([showImg, () => props.item.papercontent], ([showImgValue, paperContentValue]) => {
  if (showImgValue) {
    content.value = sanitizeHTML(paperContentValue)
  } else {
    content.value = sanitizeHTML(paperContentValue, true)
  }
}, { immediate: true })

defineComponent({
  name: 'PaperPage'
})
</script>

<style scoped>
.el-page-header {
  padding-top: 20px;
  margin-left: 5px;
}

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

.text-content {
  padding: 5px;
  border-left-style: none;
}

.image-preview .el-image {
  width: 100%;
}

.button-row .el-button {
  margin: 0 10px; /* 确保左边没有额外的间距 */
}

.items-center {
  display: flex;
  justify-content: space-around; /* Horizontal alignment */
  align-items: center; /* Vertical centering */
  gap: 10px;
}

/* Media query for wider screens */
@media screen and (min-width: 768px) {

  .page-header {
    width: 100%;
    position: fixed;
    margin-top: -10px;
    padding-right: 20px;
    background-color: white;
  }

  .content-row {
    margin-top: 100px;
    flex-direction: row; /* Switch to row layout on wider screens */
  }

  .image-preview {
    margin-right: 20px; /* Add spacing between image and text */
  }

  .image-preview .el-image {
    width: 360px;
  }

  .text-content {
    padding-left: 20px;
    border-left: silver;
    border-left-style: solid;
  }
}

</style>
