<template>
  <div class="content-row">
    <div class="image-preview">
      <el-divider content-position="left">试卷名称</el-divider>
      <h6 class="fix-width-360">{{ item.papername }}</h6>
      <el-divider content-position="left">快速功能</el-divider>
      <div class="flex items-center">
        <DownFile v-if="userInfo.id" :item="item" :isPrimary="true" />
        <el-switch v-model="showImg" active-text="显示图片" inactive-text="隐藏图片"
                   inline-prompt size="large"></el-switch>
      </div>
      <el-divider content-position="left">全卷预览</el-divider>
      <el-image
        v-if="splitPreviewImages(item)[0]"
        :initial-index="0"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="splitPreviewImages(item)"
        :src="splitPreviewImages(item)[0]"
        :zoom-rate="1.2"
        fit="cover"
        :hide-on-click-modal="true"
      />
    </div>
    <div class="text-content">
      <el-divider content-position="right">试卷主体</el-divider>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>
<script lang="ts" setup name= 'PaperPage'>
import { sanitizeHTML } from '@/hooks/utils/helper'
import { PaperConfig } from '@/types'
import { ref, watch, computed } from 'vue'
import DownFile from '@/components/paper/DownFile.vue'
import { useStore } from 'vuex'

const store = useStore()
// eslint-disable-next-line no-undef
const props = defineProps<{ item: PaperConfig }>() // Define props using defineProps
const showImg = ref(true)
const content = ref('')

const userInfo = computed(() => {
  return store.getters.userInfo
})

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

</script>

<style scoped>

.image-preview {
  margin-bottom: 20px; /* Add spacing between image and text */
}

.text-content {
  padding: 5px;
  border-left-style: none;
  width: 100%;
}

.image-preview .el-image {
  width: 100%;
  border-radius: 3px;
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

.fix-width-360 {
  padding-left: 40px;
  width: 100vh;
  flex-wrap: wrap;
  line-height: 1.5em;
  color: #337ecc;
}
/* Media query for wider screens */
@media screen and (min-width: 768px) {
  .fix-width-360 {
    padding-left: 40px;
    width: 306px;
    flex-wrap: wrap;
    line-height: 1.5em;
  }

  .image-preview {
    position: fixed;
  }

  .image-preview .el-image {
    width: 360px;
  }

  .text-content {
    margin-top: 10px;
    margin-left: 360px;
    padding-left: 20px;
    border-left: silver;
    border-left-style: solid;
  }

  .text-content .el-divider {
    z-index: -1;
  }
}

</style>
