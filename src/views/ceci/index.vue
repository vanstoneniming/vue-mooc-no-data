<template>
  <div class="home">
    <div class="dict-code-options-container">
      <SelectOptions :multiple="false" codesIn="period,subject" ref="singleSelect"/>
      <SelectOptions :multiple="true" codesIn="platform,edition,grade,term" ref="multipleSelect"/>
    </div>
    <div v-show="dataList.length===0">
      <el-empty :image-size="300" description="暂无数据"/>
    </div>
    <ul class="ceci-list">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="ceci-item">
          <ceci-detail :data="item"/>
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
      :total="totalItems"
      layout="sizes, prev, pager, next"
      next-text="下一页"
      prev-text="上一页"
      small
    />
  </div>
</template>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px;
}

.dict-code-options-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.ceci-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  justify-content: center;
}

.ceci-list li {
  margin: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: grab;
  height: 100%; /* 让所有的 li 高度自动撑满 */
}

.ceci-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts" name="Ceci" setup>
import { defineComponent, inject, ref, watchEffect } from 'vue'
import { getCeci } from '@/api/common'
import { CeciConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import CeciDetail from '@/components/ceci/index.vue'
import { ElPagination } from 'element-plus/lib/components'
import SelectOptions from '@/components/common/SelectOptions.vue'

const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })

const dataList = ref<CeciConfig[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
const totalItems = ref<number>(0)
const singleSelect = ref()
const multipleSelect = ref()

async function fetchData () {
  try {
    const { subject = null, period = null } = singleSelect?.value?.selectCodes || {}
    const { platform = [], edition = [], grade = [], term = [] } = multipleSelect?.value?.selectCodes || {}
    const { code, result: { items: data, total } } = await getCeci({
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        title: searchKeyword.value,
        platform: Array.isArray(platform) ? platform.join(',') : platform,
        grade: Array.isArray(grade) ? grade.join(',') : grade,
        edition: Array.isArray(edition) ? edition.join(',') : edition,
        term: Array.isArray(term) ? term.join(',') : term,
        period,
        subject
      }
    })
    if (code === ERR_SUCCESS) {
      data.forEach((item) => {
        const [platform, period, subject, edition, grade, term] = item.title.split('_')
        item.period = period
        item.subject = subject
        item.platform = platform
        item.edition = edition
        item.grade = grade
        item.term = term
        item.title = `${edition}-${subject}`
      })
      dataList.value = data
      totalItems.value = total
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

watchEffect(() => {
  fetchData()
})

defineComponent({
  components: { ElPagination, CeciDetail }
})

</script>
