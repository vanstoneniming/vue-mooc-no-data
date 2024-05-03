<template>
  <div class="home">
    <select-options codes-in="period,subject" :multiple="false" ref="singleSelect"/>
    <div v-show="dataList.length === 0">
        <el-empty description="暂无数据" :image-size="300"/>
    </div>
    <ul class="ceci-list">
      <li v-for="(item, index) in dataList" :key="index">
        <question-detail :item="item" :index="index+1"/>
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
      layout="sizes, prev, pager, next"
    />
  </div>
</template>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px;
}

.ceci-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  justify-content: left;
}

.ceci-list li {
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  cursor: grab;
  width: 33%; /* 让所有的 li 高度自动撑满 */
}

.ceci-item {
  display: inline;
  text-align: left; /* 左对齐 <p> 元素内容 */
  height: 100%;
}

.ceci-item img {
  margin: 0 auto; /* 水平居中 <img> 元素 */
}

.quest-row {
  font-size: 18px;
}

.quest-answer p {
  color: #E22D2D;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .ceci-list li {
    width: 100%;
  }
}
</style>

<script setup lang="ts" name="Question">
import { defineComponent, ref, inject, watchEffect } from 'vue'
import { getQuestion } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'
import { ElPagination } from 'element-plus/lib/components'
import { QuestionConfig } from '@/types'
import DictCodeSelect from '@/components/common/DictCodeSelect.vue'
import QuestionDetail from '@/components/question/Detail.vue'
import SelectOptions from '@/components/common/SelectOptions.vue'

const dataList = ref<QuestionConfig[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
const totalSize = ref<number>(0)

const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })
const singleSelect = ref()

async function fetchData () {
  try {
    const { subject = null, period = null } = singleSelect?.value?.selectCodes || {}
    const { code, result: { items: data, total } } = await getQuestion({
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        question: searchKeyword.value,
        questionrow: 0,
        period,
        subject
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

watchEffect(() => {
  fetchData()
})

defineComponent({
  components: { QuestionDetail, ElPagination, SelectOptions }
})
</script>
