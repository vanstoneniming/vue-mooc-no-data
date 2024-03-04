<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in datalist"
          :key="index" @click="goToDetail(item)"
      >
        {{ item.id }}
        {{ item.title }}
      </li>
    </ul>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { getCourseDetail } from '@/api/common'
import { ResConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRoute } from 'vue-router'
import router from '@/router'

export default defineComponent({
  name: 'ceci_detail',
  setup () {
    const route = useRoute()
    const datalist = ref<ResConfig[]>([])
    const id = route.params.id.toString()
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(10)
    const totalSize = ref<number>(50)

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getCourseDetail(id, {
          params:
            {
              page: currentPage.value, pageSize: pageSize.value
            }
        })
        if (code === ERR_SUCCESS && data) {
          datalist.value = data
          totalSize.value = total
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    const handleSizeChange = () => fetchData()

    const handleCurrentChange = () => fetchData()

    onBeforeMount(() => fetchData())
    const goToDetail = (item: ResConfig) => {
      router.push({ name: 'ResourceDetail', params: { id: item.id } })
    }
    return {
      datalist,
      currentPage,
      pageSize,
      totalSize,
      goToDetail,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px 20px;
}

li {
  padding: 10px;
}
</style>
