<template>
  <ul class="sidebar">
    <li class="sidebar-item" @click="goBack">
      <i class="iconfont icon-left"></i>
      <span class="title">返回上页</span>
    </li>
    <li class="sidebar-item" @click="goShare">
      <i class="iconfont icon-share"></i>
      <span class="title">分享链接</span>
    </li>
<!--    <li
      v-for="(item, index) in sidebarList"
      :key="index"
      class="sidebar-item"
    >
      <i :class="`icon-${item.icon}`" class="iconfont"></i>
      <span class="title">{{ item.title }}</span>
    </li>-->
    <li v-show="showBackBtn" class="sidebar-item" @click="handleScrollToTop">
      <i class="iconfont icon-back"></i>
      <span class="title">返回顶部</span>
    </li>
  </ul>
</template>
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
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.sidebar {
  z-index: 50;
  position: fixed;
  top: 50%;
  right: 0;
  padding: 0 16px;
  margin-top: -112px;
  background-color: #fff;
  border-top-left-radius: $border-radius-normal;
  border-bottom-left-radius: $border-radius-normal;
  box-shadow: $box-shadow-normal;

  &-item {
    position: relative;
    width: 26px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    cursor: pointer;

    & + &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      border: 1px solid #f3f5f7;
    }

    &:hover {
      .iconfont {
        display: none;
      }

      .title {
        display: inline-block;
      }
    }

    .iconfont {
      font-size: $font-largex;
      color: $placeholder-text;
    }

    .title {
      display: none;
      padding: 14px 0;
      line-height: 14px;
      font-size: $font-small;
      color: $primary-text;
    }
  }
}
</style>
