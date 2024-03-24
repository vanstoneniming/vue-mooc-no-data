<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-link @click="goToDetail(data.id)">{{ data.title }}</el-link>
      </div>
    </template>
    <div class="ceci-info">
      <p>教师：{{ data.teachers }}</p>
      <p>年份：{{ data.year }}</p>
      <p><img :src="thumbnails"></p>
      <p v-if="originalLink">
        <a :href="originalLink">原始链接</a>
      </p>
      <p v-else>
        没有原始链接
      </p>
    </div>
    <template #footer>
      <el-link @click="goToCeci(data.ceci)">{{ data.ceci_name }}</el-link>
    </template>
  </el-card>
</template>

<script>
import { useRouter } from 'vue-router'
import { getImages } from '@/api/common'

export default {
  name: 'CourseDetail',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    originalLink () {
      return this.data.original_link
    },
    thumbnails () {
      const imageUrl = this.data.thumbnails
      if (imageUrl === null) {
        return 'https://basic.beijing.smartedu.cn/static/img/1.f146f40.png'
      } else {
        return getImages(imageUrl, 360)
      }
    }
  },
  setup () {
    const router = useRouter()
    const goToDetail = (id) => {
      router.push({ name: 'Resource', query: { course: id } })
    }
    const goToCeci = (id) => {
      router.push({ name: 'Course', query: { ceci: id } })
    }
    return {
      goToDetail, goToCeci
    }
  }
}
</script>

<style scoped>
.card-header {
  font-size: 24px;
  font-weight: bold;
}

.card-header .el-link {
  font-size: 24px;
  margin-right: 8px;
}

.card-header .el-link .el-icon--right .el-icon {
  vertical-align: text-bottom;
}

.ceci-info {
  font-weight: bold;
  color: #c20a0a;
  text-align: left; /* 设置左对齐 */
}
</style>
