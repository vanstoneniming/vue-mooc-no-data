<template>
  <el-card shadow="always">
    <div class="card-header">
      <el-tag size="large">{{ data.course_name }}</el-tag>
      <el-tag>{{ updateDate }}</el-tag>
      <span>{{ data.title }}</span>
      <el-tag v-if="data.teachers">{{ data.teachers }}</el-tag>
      <el-button-group>
        <el-button type="success" @click="goToCourse(data.course)">同课资源</el-button>
        <el-button type="success" @click="goToDetail(data.id)">资源详情</el-button>
      </el-button-group>
    </div>
  </el-card>
</template>

<script>
import router from '@/router'

export default {
  name: 'ResourceDetail',

  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToDetail (id) {
      router.push({ name: 'ResourceDetail', params: { id } })
    },
    goToCourse (id) {
      router.push({ name: 'Resource', query: { course: id } })
    }
  },
  computed: {
    updateDate () {
      return this.data.update_datetime.split('T')[0]
    }
  }
}
</script>

<style scoped>
.card-header {
  font-size: 18px;
  font-weight: bold;
}

.card-header span {
  margin: 0 10px;
}

.el-button-group {
  float:right;
  margin-bottom: 10px;
}

</style>
