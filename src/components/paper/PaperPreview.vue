<template>
  <el-container>
    <el-aside>
      <!-- 侧边栏内容 -->
      <div class="flex items-center">
        <!-- 详情按钮 -->
        <el-button @click="goToDetail(item.id)">
          <el-icon class="el-icon--left">
            <Expand/>
          </el-icon>
          详情
        </el-button>
        <!-- 下载文件组件 -->
        <DownFile :is-primary="false" :item="item"/>
        <!-- 显示/隐藏图片开关 -->
        <el-switch v-model="showImg" active-text="显示图片" inactive-text="隐藏图片"
                   inline-prompt size="large"></el-switch>
      </div>
      <!-- 图片展示区域 -->
      <el-image
        v-if="splitPreviewImages(item)[0]"
        :hide-on-click-modal="true"
        :initial-index="0"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="splitPreviewImages(item)"
        :src="splitPreviewImages(item)[0]"
        :zoom-rate="1.2"
        fit="cover"
      />
      <el-tag v-for="anchor in anchors" :key="anchor.id" @click="scrollAnchor(anchor.id)">
        {{ anchor.id.replace('anchor-','') }} ... {{ anchor.text }} ...
      </el-tag>
    </el-aside>
    <el-main>
      <!-- 内容展示区域 -->
      <div class="content" v-html="contentWithAnchors"></div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { sanitizeHTML } from '@/hooks/utils/helper'
import { inject, nextTick, ref, watchEffect } from 'vue'
import { PaperConfig } from '@/types'
import DownFile from '@/components/paper/DownFile.vue'

// eslint-disable-next-line no-undef
const props = defineProps<{ item: PaperConfig }>()
const showImg = ref(false)
const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })
const anchors = ref<{ id: string; text: string }[]>([])
const contentWithAnchors = ref('')

function observeImages () {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        const dataSrc = img.getAttribute('src_url')
        if (dataSrc) img.setAttribute('src', dataSrc)
        observer.unobserve(img)
      }
    })
  }, {
    threshold: 0// 将阈值设置为0到1之间的值，表示元素可见性的百分比
  })

  nextTick(() => {
    const images = document.querySelectorAll('img[src_url]')
    images.forEach(img => {
      observer.observe(img)
    })
  })
}

function goToDetail (id: number) {
  window.open('/paper/' + String(id), '_blank')
}

function splitPreviewImages (item: PaperConfig) {
  return item && item.previewimages ? item.previewimages.split(',') : []
}

function removeHTMLTags (html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

function scrollAnchor (anchorId: string) {
  // 计算滚动距离并应用样式
  const anchorElement = document.getElementById(anchorId) // 假设第一个锚点的 ID 为 anchor-1
  if (anchorElement) {
    const topOffset = anchorElement.getBoundingClientRect().top // 获取距离视口顶部的距离
    window.scrollTo({ top: window.pageYOffset + topOffset - 78, behavior: 'smooth' }) // 应用滚动样式，减去 72px 的固定元素高度
  }
}

watchEffect(() => {
  const originalContent = showImg.value
    ? sanitizeHTML(props.item.papercontent)
    : sanitizeHTML(props.item.papercontent, true)
  const keyword = searchKeyword.value.trim()
  if (keyword) {
    let idCount = 1
    const headings: { id: string; text: string }[] = []
    const regex = new RegExp(`(${keyword})`, 'gi') // 使用全局匹配
    let match
    const removedHtmlTagsContent = removeHTMLTags(originalContent)
    while ((match = regex.exec(removedHtmlTagsContent)) !== null) {
      const startIndex = match.index - 5
      const endIndex = Math.min(startIndex + keyword.length + 15, removedHtmlTagsContent.length)
      const text = removedHtmlTagsContent.substring(startIndex, endIndex) // 截取关键词后面10个字符的文本
      const id = `anchor-${idCount++}`
      headings.push({ id, text })
    }
    idCount = 1
    const highlightedContent = originalContent.replace(regex, (match, keyword) => {
      const id = `anchor-${idCount++}`
      return `<span id="${id}" class="anchor highlighted">${keyword}</span>`
    })
    anchors.value = headings
    contentWithAnchors.value = highlightedContent
  } else {
    anchors.value = []
    contentWithAnchors.value = originalContent
  }
  observeImages()
})
</script>

<style scoped>
/* 默认样式 */
.el-container {
  display: flex;
}

.el-main {
  flex: 1;
  margin-right: 360px;
}

.el-tag {
  margin: 5px;
  width: 350px;
  justify-content: flex-start;
  cursor: grab;
}

p {
  background-color: yellow !important;
  font-weight: bold !important;
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

.el-container :deep(.highlighted) {
  background-color: yellow;
  font-weight: bold;
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
