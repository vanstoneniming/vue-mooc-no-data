<template>
  <div class="home">
    <select-options codes-in="period,subject" :multiple="false" ref="singleSelect"/>
    <div v-show="dataList.length==0">
      <el-empty :image-size="300" description="暂无数据"/>
    </div>
    <ul class="ceci-list">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="row-sticky-top">
          <div :class="{ expanded: item.isExpanded }" class="header-content">
            <el-tag effect="dark" round type="success">{{ index + 1 }}</el-tag>
            <div class="ceci-item" v-html="sanitizeHTML(item.qrquestion)"></div>
          </div>
          <el-divider @click="toggleContent(item)">
            <div v-if="item.isExpanded">折叠
              <CaretTop/>
            </div>
            <div v-else>展开
              <CaretRight/>
            </div>
          </el-divider>
        </div>
        <div class="question-card">
          <div class="card-item" v-for="(question, qIndex) in filteredQuestions(item.id)" :key="qIndex">
            <question-detail :index="getQuestionNo(qIndex)" :item="question"/>
          </div>
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
      layout="sizes, prev, pager, next"
      next-text="下一页"
      prev-text="上一页"
      small
    />
  </div>
</template>

<script lang="ts" setup name="Questionrow">
import { defineComponent, inject, ref, watchEffect } from 'vue'
import { getQuestionrow, getQuestionsByIds } from '@/api/common'
import { QuestionConfig, QuestionrowConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { ElPagination } from 'element-plus/lib/components'
import QuestionDetail from '@/components/question/Detail.vue'
import SelectOptions from '@/components/common/SelectOptions.vue'
import { sanitizeHTML } from '@/hooks/utils/helper'

const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })
const dataList = ref<QuestionrowConfig[]>([])
const questionList = ref<QuestionConfig[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
const totalSize = ref<number>(0)
const singleSelect = ref()

function filteredQuestions (itemId: number): QuestionConfig[] {
  return questionList.value.filter(question => question.questionrow === itemId)
}
function getQuestionNo (index: number): number {
  return index + 1
}

const toggleContent = (item: QuestionrowConfig) => {
  item.isExpanded = !item.isExpanded
}

async function fetchData () {
  try {
    const { subject = null, period = null } = singleSelect?.value?.selectCodes || {}
    const { code, result: { items: data, total } } = await getQuestionrow({
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        qrquestion: searchKeyword.value,
        period,
        subject
      }
    })
    if (code === ERR_SUCCESS && data) {
      dataList.value = data
      totalSize.value = total
      const idsString = data.map(item => item.id).join(',') || null
      if (idsString) {
        const { code, result: questions } = await getQuestionsByIds(idsString)
        if (code === ERR_SUCCESS && questions) {
          questionList.value = questions
        }
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

watchEffect(() => { fetchData() })

defineComponent({
  components: { QuestionDetail, ElPagination, SelectOptions }
})
</script>

<style scoped>

.home {
  margin: 10px;
}

.row-sticky-top {
  padding-top: 25px;
  position: sticky;
  top: 70px;
  background-color: white;
}

.question-card {
  display: flex;
  flex-wrap: wrap;
}

.card-item {
  padding: 10px;
  width: 33%;
}

.header-content {
  display: flex;
  max-height: 100px; /* 设置最大高度为屏幕显示区域的50% */
  overflow: hidden; /* 超出部分隐藏 */
  transition: max-height 0.3s ease; /* 添加过渡效果 */
}

.expanded {
  max-height: none; /* 展开时取消最大高度限制 */
}

.el-divider div {
  color: #2688E8;
  width: 50px;
  white-space: nowrap;
  display: inline-flex; /* 将div元素设为行内块 */
  align-items: center; /* 垂直居中 */
  margin-right: 5px; /* 右边距 */
}

.el-tag {
  margin-right: 8px;
  margin-left: 15px;
}

.ceci-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: left;
  margin: 0;
}

ul {
  padding-left: 0;
}

p img {
  width: fit-content;
}

.ceci-list li {
  margin: 10px 0;
  padding-top: 10px;
  box-sizing: border-box;
  text-align: left;
  cursor: grab;
  width: 100%; /* 让所有的 li 高度自动撑满 */
  background-color: snow;
  border-color: seagreen;
  border-style: solid;
  border-radius: 5px;
  border-width: 2px;
}

.ceci-item {
  display: inline;
  text-align: left; /* 左对齐 <p> 元素内容 */
  height: 100%;
}

.ceci-item p {
  display: inline; /* 让 <p> 元素占据整行 */
}

.ceci-item img {
  margin: 0 auto; /* 水平居中 <img> 元素 */
  width: 100%;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}

/* 小屏幕下的样式 */
@media screen and (max-width: 768px) {
  .card-item {
    width: 100%;
  }
}
</style>
