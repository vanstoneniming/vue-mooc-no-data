<template>
  <el-button :icon="Download" size="small" type="primary" @click="visible = true">下载附件</el-button>
  <el-dialog v-model="visible" :show-close="false" draggable>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ item.paperfile.length }}个附件可以下载</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled/>
          </el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <el-divider></el-divider>
    <div class="button-row">
      <div v-for="(item, key) in dataList" :key="key" class="file-info">
        <el-tag class="file-index" effect="dark">{{ key + 1 }}</el-tag>
        <el-link :href="item.url" class="file-name" type="primary">{{ shortenText(item.name, 40) }}</el-link>
        <el-tag class="file-size" type="info">{{ formatFileSize(item.size) }}</el-tag>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'
import { CircleCloseFilled, Download } from '@element-plus/icons-vue'
import { PaperConfig } from '@/types'
import { getPaperFile } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'
import { formatFileSize, shortenText } from '@/hooks/utils/helper'

const visible = ref(false)
const dataList = ref([])

const props = defineProps<{ item: PaperConfig }>() // Define props and assign to variable

async function paperFiles () {
  try {
    const idsString = props.item.paperfile.join(',')
    const { code, result: data } = await getPaperFile(idsString)
    if (code === ERR_SUCCESS && data) {
      dataList.value = data
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

watch(() => props.item.paperfile, () => {
  paperFiles() // Call paperFiles function to fetch paper files when component is mounted
})
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center; /* Vertical centering */
}

.my-header h4 {
  margin: 0; /* Reset margin to zero */
  padding: 0; /* Reset padding to zero */
}

.button-row {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Set spacing between items */
}

.file-info {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center; /* 垂直居中 */
}

.file-index {
  margin-right: 10px; /* 可以调整索引和文件名之间的间距 */
}

.file-name {
  margin-right: 10px; /* 可以调整文件名和文件大小之间的间距 */
}

.file-size {
  margin-left: auto; /* 文件大小右对齐 */
}

</style>
