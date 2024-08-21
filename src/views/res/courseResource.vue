<template>
  <div class="home">
    <el-container class="container-area">
      <el-aside class="ceci-area" width="350px">
        <div v-show="dataList.length==0">
          <el-empty :image-size="300" description="暂无数据"/>
        </div>
        <ul>
          <li v-for="(data, index) in dataList" :key="index" :class="{ 'active-card': currentResource === data }"
              class="ceci-list" @click="showResource(data)">
            <div class="ceci-item">
              <div class="card-header">
                <el-text truncated>{{ data.title }}</el-text>
                <el-tag type="primary">{{ index + 1 }}</el-tag>
              </div>
              <el-divider></el-divider>
              <div class="ceci-info">
                <el-text truncated>{{ data.course_name }}</el-text>
              </div>
            </div>
          </li>
        </ul>
         <Pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total-size="totalSize"/>

      </el-aside>
      <el-main class="no-padding">
        <div v-if="currentResource">
          <resource-storage :resource="currentResource"/>
        </div>
        <div v-else>
          <el-empty :image-size="300" description="点击左侧资源查看详情"/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" name="Resource" setup>
import { inject, onBeforeMount, ref, watchEffect } from 'vue'
import { getRes } from '@/api/common'
import { ResConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import bus from '@/utils/bus'
import ResourceStorage from '@/components/resource/ResourceStorage.vue'
import Pagination from '@/components/common/Pagination.vue'

const dataList = ref<ResConfig[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
const totalSize = ref<number>(0)
const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })
const currentResource = ref<ResConfig | null>(null) // Updated type here

const showResource = (item: ResConfig) => { // Ensure `item` matches `ResConfig`
  currentResource.value = item
}

// eslint-disable-next-line no-undef
const props = defineProps(['singleSelect', 'multipleSelect', 'courseId'])

async function fetchData () {
  try {
    currentResource.value = null
    const { subject = null, period = null } = props.singleSelect || {}
    const { platform = [], edition = [], grade = [], term = [] } = props.multipleSelect || {}
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      title: searchKeyword.value,
      subject: subject,
      period: period,
      platform: Array.isArray(platform) ? platform.join(',') : platform,
      grade: Array.isArray(grade) ? grade.join(',') : grade,
      edition: Array.isArray(edition) ? edition.join(',') : edition,
      term: Array.isArray(term) ? term.join(',') : term,
      course: null
    }
    if (props.courseId > 0) {
      params.course = props.courseId
    }

    const { code, result: { items: data, total } } = await getRes({ params })
    if (code === ERR_SUCCESS && data) {
      dataList.value = data
      totalSize.value = total
      currentResource.value = data[0] || null
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

watchEffect(() => fetchData())

</script>

<style scoped>
@import '~@/assets/styles/responsive.scss';
.home ul {
  padding: 5px;
}

.container-area {
  border-radius: 8px; /* Rounded corners for a smoother appearance */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    background-color: darkseagreen;
}

.no-padding {
  padding: 0;
}

.ceci-area {
  margin: 10px 10px 20px 10px;
  padding: 0 10px;
  background-color: snow;
  border-radius: 8px;
}

.ceci-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 10px 0;
  justify-content: center;
  background-color: white;
  cursor: grab;
  border-radius: 8px; /* Add rounding for the list */
  padding: 10px; /* Add padding for spacing inside the list */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Light shadow for a subtle effect */
}

.ceci-item {
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 320px;
  padding: 0 10px; /* Increased padding for better clickability */
  border-radius: 8px; /* Rounded corners for individual items */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.active-card {
  border-color: #409eff;
  background-color: #f0f9ff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2); /* Stronger shadow for active card */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  padding: 0 10px; /* Add padding for spacing inside the header */
}

.card-header .el-text {
  font-size: 16px;
  font-weight: bold; /* Emphasize the text */
}

.ceci-info .el-text {
  font-size: 14px;
  text-align: left;
  color: #c20a0a;
  padding-left: 10px; /* Add padding for spacing inside the info section */
}

.el-divider {
  margin: 4px 0; /* Adjust margin for consistent spacing */
  width: 180px;
}

.ceci-list:hover {
  background-color: #f0f9ff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* Add a shadow on hover for depth */
}

@media screen and (max-width: 768px) {
  .ceci-item {
    width: 100%; /* Make items full width on smaller screens */
    margin: 10px 0; /* Adjust margin for consistency */
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start; /* Align text to the left on smaller screens */
    padding: 5px; /* Adjust padding for smaller screens */
  }
}
</style>
