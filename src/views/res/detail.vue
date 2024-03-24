<template>
  <div class="home">
    <HeaderShortCut />
    <div>
      <ul>
        <li v-for="(item, index) in datalist"
            :key="index"
        >
          <div class="ceci-item">
            <storage-detail :data="item"/>
          </div>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :hide-on-single-page=true
        :page-sizes="[12, 24, 36, 48, 60]"
        :total="totalSize"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { getResDetail } from '@/api/common'
import { ResConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRoute } from 'vue-router'
import router from '@/router'
import StorageDetail from '@/components/resource/detail.vue'
import bus from '@/utils/bus'
import { ElMessage, ElPagination } from 'element-plus/lib'
import HeaderShortCut from '@/components/header/modules/ShortCut.vue'

export default defineComponent({
  name: 'Storage',
  components: { HeaderShortCut, ElPagination, StorageDetail },
  setup () {
    const route = useRoute()
    const datalist = ref<ResConfig[]>([])
    const id = route.params.id.toString()
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(10)
    const totalSize = ref<number>(0)
    const searchKeyword = ref('')

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getResDetail(id, {
          params:
            {
              // eslint-disable-next-line @typescript-eslint/camelcase
              page: currentPage.value, pageSize: pageSize.value, resource_name: searchKeyword.value
            }
        })
        if (code === ERR_SUCCESS && data) {
          data.map((item) => {
            const storageUrl: string = item.storages
            item.storages = storageUrl.split('?')[0]
          })
          datalist.value = data
          totalSize.value = total
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    bus.on('keywordChange', (event) => {
      searchKeyword.value = event as string
      fetchData()
    })

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

.el-icon {
  margin-right: 8px;
}
</style>
