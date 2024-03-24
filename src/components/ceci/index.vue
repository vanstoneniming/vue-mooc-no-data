<template>
  <el-card style="width: 400px;">
    <template #header>
      <div class="card-header">
        <span>{{ data.title }}</span>
      </div>
    </template>
    <div class="ceci-info">
      {{ subtitle }}
    </div>
    <template #footer>
      <div class="card-footer">
        <el-button class="info" link @click="goToDetail(data.id)">查看课程</el-button>
      </div>
    </template>
  </el-card>
</template>

<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'CeciDetail',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed:
    {
      subtitle () {
        let subtitle = ''
        if (this.data.platform) {
          subtitle += this.data.platform
        }
        if (this.data.period) {
          subtitle += (subtitle ? ' - ' : '') + this.data.period
        }
        if (this.data.grade) {
          subtitle += (subtitle ? ' - ' : '') + this.data.grade
        }
        if (this.data.term) {
          subtitle += (subtitle ? ' - ' : '') + this.data.term
        }
        return subtitle
      }
    },
  setup () {
    const router = useRouter()

    const goToDetail = (id) => {
      router.push({ name: 'Course', query: { ceci: id } })
    }

    return { goToDetail }
  }
}
</script>
<style scoped>
.card-header {
  font-size: 24px;
  font-weight: bold;
}

.card-footer {
  text-align: right;
}

.ceci-info {
  font-weight: bold;
  color: #c20a0a;
  text-align: left; /* 设置左对齐 */
}

.el-card:hover {
  background-color: whitesmoke;
}
</style>
