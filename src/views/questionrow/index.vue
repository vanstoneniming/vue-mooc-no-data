<template>
  <div class="home">
    <div v-if="false">
      <dict-code-select v-model="platform" :options="platformOptions" placeholder="请选择平台"></dict-code-select>
      <dict-code-select v-model="subject" :options="subjectOptions" placeholder="请选择学科"></dict-code-select>
      <dict-code-select v-model="edition" :options="editionOptions" placeholder="请选择版本"></dict-code-select>
      <dict-code-select v-model="period" :options="periodOptions" placeholder="请选择学段"></dict-code-select>
      <dict-code-select v-model="grade" :options="gradeOptions" placeholder="请选择年级"></dict-code-select>
      <dict-code-select v-model="term" :options="termOptions" placeholder="请选择学期"></dict-code-select>
    </div>
    <div v-show="ceciList.length==0">
      <el-empty :image-size="300" description="暂无数据"/>
    </div>
    <ul class="ceci-list">
      <li v-for="(item, index) in ceciList" :key="index">
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

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { getDictCode, getQuestionrow, getQuestionsByIds } from '@/api/common'
import { CodeOptionsConfig, QuestionConfig, QuestionrowConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import bus from '@/utils/bus'
import DictCodeSelect from '@/components/ceci/DictCodeSelect.vue'
import { ElPagination } from 'element-plus/lib/components'
import QuestionDetail from '@/components/question/Detail.vue'
import { sanitizeHTML } from '@/hooks/utils/helper'

export default defineComponent({
  name: 'Questionrow',
  methods: { sanitizeHTML },
  components: { QuestionDetail, ElPagination, DictCodeSelect },
  setup () {
    const dataList = ref<QuestionrowConfig[]>([])
    const questionList = ref<QuestionConfig[]>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(12)
    const totalSize = ref<number>(0)
    const searchKeyword = ref('')
    const platform = ref('')
    const platformOptions = ref<CodeOptionsConfig[]>([])
    const subject = ref('')
    const subjectOptions = ref<CodeOptionsConfig[]>([])
    const edition = ref('')
    const editionOptions = ref<CodeOptionsConfig[]>([])
    const period = ref('')
    const periodOptions = ref<CodeOptionsConfig[]>([])
    const grade = ref('')
    const gradeOptions = ref<CodeOptionsConfig[]>([])
    const term = ref('')
    const termOptions = ref<CodeOptionsConfig[]>([])
    bus.on('keywordChange', (event) => {
      searchKeyword.value = event as string
    })

    const filteredQuestions = (itemId: number): QuestionConfig[] => {
      return questionList.value.filter(question => question.questionrow === itemId)
    }
    const getQuestionNo = (qindex: number): number => {
      return qindex + 1
    }

    function toggleContent (item: QuestionrowConfig) {
      item.isExpanded = !item.isExpanded
    }

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getQuestionrow({
          params: {
            page: currentPage.value,
            pageSize: pageSize.value,
            qrquestion: searchKeyword.value,
            platform: platform.value,
            term: term.value,
            period: period.value,
            grade: grade.value,
            edition: edition.value,
            subject: subject.value
          }
        })
        if (code === ERR_SUCCESS && data && data.length > 0) {
          dataList.value = data
          totalSize.value = total
          const idsString = data.map(item => item.id).join(',')
          const { code, result: questions } = await getQuestionsByIds(idsString)
          if (code === ERR_SUCCESS && questions) {
            questionList.value = questions
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    async function fetchDictCode (dictCode: string) {
      try {
        const { code, result: codeList } = await getDictCode({
          params: { code: dictCode }
        })
        if (code === ERR_SUCCESS && codeList) {
          return codeList.filter(item => item.label && item.value).map(item => ({
            value: item.value,
            label: item.label
          }))
        } else {
          return []
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        return []
      }
    }

    onMounted(() => {
      bus.on('keywordChange', (event) => {
        searchKeyword.value = event as string
      })
    })

    onUnmounted(() => {
      // 在组件销毁时移除事件监听
      bus.off('keywordChange')
    })

    onBeforeMount(async () => {
      platformOptions.value = await fetchDictCode('platform')
      subjectOptions.value = await fetchDictCode('subject')
      editionOptions.value = await fetchDictCode('edition')
      periodOptions.value = await fetchDictCode('period')
      gradeOptions.value = await fetchDictCode('grade')
      termOptions.value = await fetchDictCode('term')
    })

    watch([platform, subject, edition, period, grade,
      term, searchKeyword, currentPage, pageSize], () => {
      fetchData()
    }, { immediate: true })
    return {
      ceciList: dataList,
      questionList,
      currentPage,
      pageSize,
      totalSize,
      searchKeyword,
      platform,
      platformOptions,
      subject,
      subjectOptions,
      edition,
      editionOptions,
      period,
      periodOptions,
      grade,
      gradeOptions,
      term,
      termOptions,
      getQuestionNo,
      toggleContent,
      filteredQuestions
    }
  }
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
