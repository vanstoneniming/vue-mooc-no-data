<template>
  <div class="home">
    <header-short-cut/>
    <ul>
      <li v-for="(item, index) in dataList" v-bind:key="index">
        <div class="ceci-item">
          <resource-list :data="item"/>
        </div>
      </li>
    </ul>
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
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { getRes } from '@/api/common'
import { ResConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import router from '@/router'
import ResourceDetail from '@/components/resource/index.vue'
import bus from '@/utils/bus'
import { ElPagination } from 'element-plus/lib'
import { useRoute } from 'vue-router'
import HeaderShortCut from '@/components/header/modules/ShortCut.vue'

export default defineComponent({
  name: 'Resource',
  components: { HeaderShortCut, ElPagination, ResourceList: ResourceDetail },
  setup () {
    const dataList = ref<ResConfig[]>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(12)
    const totalSize = ref<number>(0)
    const searchKeyword = ref('')
    const route = useRoute()

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getRes({
          params:
            {
              page: currentPage.value,
              pageSize: pageSize.value,
              title: searchKeyword.value,
              course: router.currentRoute.value.query.course
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

    bus.on('keywordChange', (event) => {
      searchKeyword.value = event as string
      fetchData()
    })

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

    watch(
      () => route,
      () => {
        fetchData()
      },
      { deep: true }
    )

    return {
      dataList,
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
