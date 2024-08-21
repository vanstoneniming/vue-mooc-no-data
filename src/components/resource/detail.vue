<template>
  <down-file-dialog v-model="dialogFormVisible" :title="dialogTitle" :url="currentUrl"/>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>官网链接</span>
      </div>
    </template>
    <div v-if="data.length==0">
      <el-empty :image-size="80" description="暂无数据"/>
    </div>
    <div v-else class="ceci-info">
      <ul>
        <li v-for="(item, index) in data" :key="index">
          <div v-for="(value, key) in item" :key="key" class="flex-container">
            <el-tag effect="dark" size="large">{{ key }}</el-tag>
            <el-text size="large" truncated type="primary" @click="openOriginal(value[0])">{{
                shortenText(value[0], 100)
              }}
            </el-text>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { shortenText } from '@/hooks/utils/helper'
import DownFileDialog from '@/components/common/DownFileDialog.vue'

// Define props with appropriate types
defineProps<{
  data: Record<string, any>[];
}>()

const dialogFormVisible = ref(false)
const currentUrl = ref('')
const dialogTitle = ref('')

const openOriginal = (url: string) => {
  const fileExtension = url.split('.').pop()?.toLowerCase()

  if (!fileExtension) {
    console.error('无法解析文件扩展名')
    return
  }

  if (url.includes('.exp.bcevod.com/')) {
    currentUrl.value = url
    dialogTitle.value = '资源下载受限，请添加 referrer: https://jpk.eduyun.cn/'
    dialogFormVisible.value = true
    return
  }

  if (fileExtension === 'm3u8') {
    currentUrl.value = url
    dialogTitle.value = 'M3U8 文件不能直接下载，请使用支持 M3U8 的播放器观看，或者下载到本地后再观看。'
    dialogFormVisible.value = true
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.card-header {
  font-size: 16px;
  font-weight: bold;
}

.flex-container {
  display: flex;
  align-items: center;
  cursor: grab;
}

.right-aligned-buttons {
  margin-left: auto;
}

.el-card {
  margin: 10px 10px 10px 0;
}

.card-header span {
  white-space: nowrap;
}

.el-card ul {
  padding: 0;
}

.el-link {
  font-size: 14px;
  color: deepskyblue;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-tag {
  min-width: 60px;
  color: lightyellow;
  margin: 5px 20px;
}

.descriptions {
  margin: 20px 0;
}

.el-form-item {
  min-width: 100px;
}

.file-list .el-text {
  cursor: grab;
}

.ceci-info {
  color: slategrey;
}
</style>
