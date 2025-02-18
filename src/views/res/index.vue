<template>
  <div class="home">
    <div v-show="dataList.length==0">
      <el-empty :image-size="300" description="暂无数据"/>
    </div>
    <ul>
      <li v-for="(item, index) in dataList" v-bind:key="index">
        <div class="ceci-item">
          <resource-list :data="item" :id=pageIndex(index)  :same-group-visible="sameGroupVisible"/>
        </div>
      </li>
    </ul>
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
      layout="sizes, prev, pager, next"
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

export default defineComponent({
  name: 'Resource',
  components: { ElPagination, ResourceList: ResourceDetail },
  setup () {
    const dataList = ref<ResConfig[]>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(12)
    const totalSize = ref<number>(0)
    const searchKeyword = ref('')
    const sameGroupVisible = ref(true)
    const route = useRoute()

    async function fetchData () {
      const queryId = router.currentRoute.value.query.course
      sameGroupVisible.value = !queryId
      try {
        const { code, result: { items: data, total } } = await getRes({
          params:
            {
              page: currentPage.value,
              pageSize: pageSize.value,
              title: searchKeyword.value,
              course: queryId
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

    const pageIndex = (index: number) => {
      return index + 1 + (pageSize.value * (currentPage.value - 1))
    }
    onBeforeMount(() => fetchData())

    watch(
      [searchKeyword, currentPage, pageSize, route],
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
      sameGroupVisible,
      pageIndex
    }
  }

})
</script>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home ul {
  padding: 5px;
}
.el-card ul {
  padding: 0;
}
li {
  margin: 5px 0;
  white-space: nowrap; /* 强制文本在一行内显示 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 在溢出时显示省略号 */
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>
