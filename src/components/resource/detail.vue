<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <el-tag>{{ updateDate(data.update_datetime) }}</el-tag>
        <span>{{ data.resource_name }}</span>
        <el-tag>{{ data.format }}</el-tag>
      </div>
    </template>
    <div class="ceci-info">
      <ul>
        <li v-for="(item, index) in storages" :key="index">
          <div class="flex-container">
            <el-link @click="openOriginal(item)">{{ shortenText(item, 50) }}</el-link>
          </div>
          <div class="flex-container">
            <div class="remind">
              <el-tooltip v-if="commitStr(item)" :content="commitStr(item)" effect="dark" placement="right">
                <el-button type="danger">403 Forbidden</el-button>
              </el-tooltip>
            </div>
            <div class="right-aligned-buttons">
              <el-button size="small" @click="copyLink(item, 'json')">链接字典</el-button>
              <el-button size="small" @click="copyLink(item, 'text')">链接文本</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import { ElMessage } from 'element-plus/lib'

export const CopyLinkType = {
  Text: 'text',
  JSON: 'json'
}

export default {
  name: 'StorageDetail',
  methods: {

    copyLink (url, type = CopyLinkType.JSON) {
      const title = this.data.resource_name
      let text

      if (type === CopyLinkType.Text) {
        text = `资源名称： ${title}\n资源链接： ${url}`
      } else {
        text = `{"url": "${url}", "title": "${title}"}`
      }

      navigator.clipboard.writeText(text)
        .then(() => {
          ElMessage.success('链接已复制到剪贴板！')
        })
        .catch((error) => {
          ElMessage.error('链接复制失败: ', error)
        })
    },
    openOriginal (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    shortenText (text, maxLength) {
      if (text.length <= maxLength) {
        return text // 如果文本长度小于或等于最大长度，直接返回原文本
      } else {
        // 计算在中间添加省略号的位置
        const ellipsisIndex = Math.floor(maxLength / 2)
        const firstPart = text.slice(0, ellipsisIndex)
        const secondPart = text.slice(text.length - ellipsisIndex)
        return firstPart + '...' + secondPart // 返回缩短后的文本，中间添加省略号
      }
    },
    commitStr (item) {
      if (item.includes('.exp.bcevod.com/')) {
        return '添加referrer: https://jpk.eduyun.cn/'
      } else {
        return ''
      }
    },
    updateDate (dateStr) {
      return dateStr.split('T')[0]
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    storages () {
      return this.data.storages.split(',')
    }
  }
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
}

.remind {
  width: 150px;
}

.right-aligned-buttons {
  margin-left: auto;
}

.el-card {
  margin: 5px;
}

.el-card ul {
  padding: 0;
}

.el-link {
  font-size: 14px;
  color: deepskyblue;
  white-space: nowrap; /* 强制文本在一行内显示 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 在溢出时显示省略号 */
}

.el-button {
  margin: 5px;
}

.el-tag {
  color: seagreen;
  margin: 0 10px;
}

.ceci-info {
  color: slategrey;
}
</style>
