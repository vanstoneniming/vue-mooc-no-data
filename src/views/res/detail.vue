<template>
  <div class="home">
    <div>
      <div v-show="datalist.length==0">
        <el-empty :image-size="300" description="暂无数据"/>
      </div>
      <ul>
        <li v-for="(item, index) in datalist" :key="index">
          <storage-detail :data="item"/>
        </li>
      </ul>
    </div>
    <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalSize"
      next-text="下一页"
      prev-text="上一页"
      small
      :page-sizes="[12, 24, 36, 48, 60]"
      :hide-on-single-page=true
      layout="prev, pager, next"
    />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { getResDetail } from '@/api/common'
import { ResConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRoute } from 'vue-router'
import router from '@/router'
import StorageDetail from '@/components/resource/detail.vue'
import bus from '@/utils/bus'
import { ElPagination } from 'element-plus/lib'

export default defineComponent({
  name: 'Storage',
  components: { ElPagination, StorageDetail },
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

    onBeforeMount(() => fetchData())
    const goToDetail = (item: ResConfig) => {
      router.push({ name: 'ResourceDetail', params: { id: item.id } })
    }

    watch(
      [searchKeyword, currentPage, pageSize, route],
      () => {
        fetchData()
      }
    )

    return {
      datalist,
      currentPage,
      pageSize,
      totalSize,
      goToDetail
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
  margin: 10px 50px;
}

.el-icon {
  margin-right: 8px;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>
