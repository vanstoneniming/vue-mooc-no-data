<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in ceciList"
          :key="index" @click="goToDetail(item)"
      >
        {{ item.id }}
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
import { getCeci } from '@/api/common'
import { CeciConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Ceci',
  setup () {
    const router = useRouter()
    const ceciList = ref<CeciConfig[]>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(10)
    const totalSize = ref<number>(50)

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getCeci({
          params:
            {
              page: currentPage.value, pageSize: pageSize.value
            }
        })
        if (code === ERR_SUCCESS && data) {
          ceciList.value = data
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
    const goToDetail = (item: CeciConfig) => {
      router.push({ name: 'CeciDetail', params: { id: item.id } })
    }
    return {
      goToDetail,
      ceciList,
      currentPage,
      pageSize,
      totalSize,
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
  cursor: grab;
}

</style>
