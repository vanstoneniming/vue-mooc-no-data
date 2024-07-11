<template>
  <div class="url-parser-container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input v-model="inputUrl" placeholder="请输入网址，国家智慧中小学云平台、部优精品课、皖教云、山东优课、北京空中课堂……" clearable></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="parseUrl">解析</el-button>
      </el-col>
    </el-row>
    <el-tag>粘贴url地址，点击解析，稍等几秒钟，展示解析结果。</el-tag>
    <div v-if="fileList.length" class="file-list">
      <el-card v-for="(file, index) in fileList" :key="index" class="file-card">
        <template #header>
          <div class="card-header">
              <span>{{ index + 1 }}. {{ file.title }}</span>
          </div>
        </template>
        <div>{{ file.link }}</div>
      </el-card>
    </div>
    <div v-else>
        <el-empty description="暂无文件链接" :image-size="300"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseCourseUrl } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputUrl = ref(router.currentRoute.value.query.url || '')
const fileList = ref([])

async function parseUrl () {
  if (inputUrl.value.indexOf('http://') === -1 && inputUrl.value.indexOf('https://') === -1) {
    return
  }
  try {
    fileList.value = []
    const { code, result: { resolve_result: data } } = await parseCourseUrl({
      url: inputUrl.value
    })
    if (code === ERR_SUCCESS && data) {
      fileList.value = JSON.parse(data)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

watch(inputUrl, (newValue) => {
  if (newValue === '') fileList.value = []
})

onMounted(parseUrl)
</script>

<style scoped>
.url-parser-container {
  margin: 20px; /* 外部边距 */
}

.el-row {
  margin-bottom: 20px; /* 可选：行与行之间的间距 */
}

.file-list {
  margin-top: 20px; /* 文件列表与输入框组之间的间距 */
}

.file-card {
  margin-bottom: 20px; /* 每个文件卡片之间的间距 */
}
</style>
