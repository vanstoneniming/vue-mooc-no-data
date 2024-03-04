<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in dataList"
          :key="index" @click="goToDetail(item)"
      >
        {{ item.id }}
        {{ item.course_name }}
        {{ item.title }}
      </li>
    </ul>
  </div>
    <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { getRes } from '@/api/common'
import { ResConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import router from '@/router'

export default defineComponent({
  name: 'Footer',
  setup () {
    const dataList = ref<ResConfig[]>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(10)
    const totalSize = ref<number>(50)

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getRes({
          params:
              {
                page: currentPage.value, pageSize: pageSize.value
              }
        })
        if (code === ERR_SUCCESS && data) {
          dataList.value = data
          totalSize.value = total
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    const handleSizeChange = () => {
      fetchData()
    }
    function handleCurrentChange () {
      fetchData()
    }

    onBeforeMount(() => {
      fetchData()
    }
    )
    const goToDetail = (item: ResConfig) => {
      router.push({ name: 'ResourceDetail', params: { id: item.id } })
    }

    return {
      dataList,
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
