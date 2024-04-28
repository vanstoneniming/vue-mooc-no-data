<template>
  <el-container>
    <el-aside>
      <div class="flex items-center">
        <el-button @click="goToDetail(item.id)">
          <el-icon class="el-icon--left">
            <Expand/>
          </el-icon>
          详情
        </el-button>
        <DownFile v-if="userInfo.id" :item="item"  :is-primary="false" />
        <el-switch v-model="showImg" active-text="显示图片" inactive-text="隐藏图片"
                   inline-prompt size="large"></el-switch>
      </div>
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
    </el-aside>
    <el-main>
      <div class="content" v-html="content"></div>
    </el-main>
  </el-container>
</template>

<style scoped>
/* 默认样式 */
.el-container {
  display: flex;
}

.el-main {
  flex: 1;
  margin-right: 360px;
}

.el-aside {
  width: 360px;
  position: fixed;
  right: 15px;
  border-radius: 5px;
  background-color: forestgreen;
}

.items-center {
  display: flex;
  justify-content: space-around; /* Horizontal alignment */
  align-items: center; /* Vertical centering */
  gap: 10px;
  padding: 10px 20px;
}

.el-image {
  padding: 0 5px;
}

/* 小屏幕下的样式 */
@media screen and (max-width: 1000px) {
  .el-container {
    flex-direction: column-reverse;
  }

  .el-main {
    margin-right: 0;
    padding: 5px 0;
  }

  .el-aside {
    width: 100%;
    position: static;
  }
}

</style>

<script lang="ts" setup>
import router from '@/router'
import { sanitizeHTML } from '@/hooks/utils/helper'
import { defineComponent, defineProps, ref, watch, computed } from 'vue' // Import defineProps directly from 'vue'
import { PaperConfig } from '@/types'
import DownFile from '@/components/paper/DownFile.vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps<{ item: PaperConfig }>() // Define props using defineProps
const showImg = ref(false)
const content = ref('')

function goToDetail (id: number) {
  window.open('/paper/' + String(id), '_blank')
  // router.push({ name: 'PaperDetail', params: { id } })
}

function splitPreviewImages (item: PaperConfig) {
  return item && item.previewimages ? item.previewimages.split(',') : []
}
const userInfo = computed(() => {
  return store.getters.userInfo
})
watch([showImg, () => props.item.papercontent], ([showImgValue, paperContentValue]) => {
  if (showImgValue) {
    content.value = sanitizeHTML(paperContentValue)
  } else {
    content.value = sanitizeHTML(paperContentValue, true)
  }
}, { immediate: true })

defineComponent({
  name: 'PaperPreview'
})
</script>
