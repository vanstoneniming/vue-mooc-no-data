<template>
  <div class="sidebar">
    <el-button @click="goBack">
      <i class="iconfont icon-left"></i>
      <span class="title">返回上页</span>
    </el-button>
    <el-button class="share-button" @click="goShare">
      <i class="iconfont icon-share"></i>
      <span class="title">分享链接</span>
    </el-button>
    <el-button v-show="showBackBtn" @click="handleScrollToTop">
      <i class="iconfont icon-back"></i>
      <span class="title">返回顶部</span>
    </el-button>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
</style>

<script setup lang="ts"  name='Sidebar'>
import { ref, onBeforeMount } from 'vue'
import { useScroll } from '@/hooks/event/useScroll'
import { getSidebar } from '@/api/common'
import { ERR_OK } from '@/api/config'
import { SidebarItemConfig } from '@/types'
import router from '@/router'
import { ElMessage } from 'element-plus/lib'
import ClipboardJS from 'clipboard'

const showBackBtn = ref(false)
const sidebarList = ref<SidebarItemConfig[]>([])
const { scrollTo } = useScroll(window, (scrollTop: number) => {
  showBackBtn.value = scrollTop > 200
})
const handleScrollToTop = () => scrollTo()
const goBack = () => {
  router.go(-1)
}
const goShare = () => {
  const currentURL = window.location.href

  // 创建一个新的 ClipboardJS 实例
  const clipboard = new ClipboardJS('.share-button', {
    text: () => currentURL // 将当前 URL 设置为要复制的文本内容
  })

  // 监听复制成功事件
  clipboard.on('success', () => {
    // 复制成功时显示成功消息
    ElMessage.success('链接已复制到剪贴板！')
    clipboard.destroy()
  })

  // 监听复制失败事件
  clipboard.on('error', (error) => {
    // 复制失败时显示错误消息
    ElMessage.error('链接复制失败: ' + error.action)
    clipboard.destroy()
  })
}

onBeforeMount(async () => {
  const { code, data } = await getSidebar()
  if (code === ERR_OK && data) {
    sidebarList.value = data
  }
})

</script>
