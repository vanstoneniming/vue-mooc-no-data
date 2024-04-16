<template>
  <div class="center-align">
    <el-button @click="goBack">
      <el-icon size="24px">
        <Back/>
      </el-icon>
      返回
    </el-button>
    <el-button @click="goShare">
      <el-icon size="24px">
        <Share/>
      </el-icon>
      分享
    </el-button>
  </div>
</template>
<script lang="ts">
import router from '@/router'
import { ElMessage } from 'element-plus/lib'

export default {
  name: 'HeaderShortCut',
  methods: {
    goBack () {
      router.go(-1)
    },
    goShare () {
      const currentURL = window.location.href
      const text = `资源链接： ${currentURL}`
      navigator.clipboard.writeText(text).then(() => {
        ElMessage.success('链接已复制到剪贴板！')
      })
        .catch((error) => {
          ElMessage.error('链接复制失败: ', error)
        })
    }
  }
}
</script>
<style scoped>
@import '~@/assets/styles/responsive.scss';

li {
  padding: 10px;
}

.center-align {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 12px;
  margin-bottom: 20px;
}

</style>
