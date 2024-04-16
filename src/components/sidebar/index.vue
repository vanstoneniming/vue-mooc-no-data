<template>
  <div class="sidebar">
    <el-button @click="goBack">
      <i class="iconfont icon-left"></i>
      <span class="title">返回上页</span>
    </el-button>
    <el-button @click="goShare">
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
<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useScroll } from '@/hooks/event/useScroll'
import { getSidebar } from '@/api/common'
import { ERR_OK } from '@/api/config'
import { SidebarItemConfig } from '@/types'
import router from '@/router'
import { ElMessage } from 'element-plus/lib'

export default defineComponent({
  name: 'Sidebar',
  setup () {
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
      navigator.clipboard.writeText(currentURL).then(() => {
        ElMessage.success('链接已复制到剪贴板！')
      })
        .catch((error) => {
          ElMessage.error('链接复制失败: ', error)
        })
    }
    onBeforeMount(async () => {
      const { code, data } = await getSidebar()
      if (code === ERR_OK && data) {
        sidebarList.value = data
      }
    })
    return {
      sidebarList,
      showBackBtn,
      handleScrollToTop,
      goBack,
      goShare
    }
  }
})
</script>
