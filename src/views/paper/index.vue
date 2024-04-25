<template>
  <div class="home">
    <dict-code-select :bind="platform" :options="platformOptions" placeholder="请选择平台"></dict-code-select>
    <dict-code-select :bind="subject" :options="subjectOptions" placeholder="请选择学科"></dict-code-select>
    <dict-code-select :bind="edition" :options="editionOptions" placeholder="请选择版本"></dict-code-select>
    <dict-code-select :bind="period" :options="periodOptions" placeholder="请选择学段"></dict-code-select>
    <dict-code-select :bind="grade" :options="gradeOptions" placeholder="请选择年级"></dict-code-select>
    <dict-code-select :bind="term" :options="termOptions" placeholder="请选择学期"></dict-code-select>
    <div v-show="ceciList.length==0">
        <el-empty description="暂无数据" :image-size="300"/>
    </div>
    <ul class="ceci-list">
      <li v-for="(item, index) in ceciList" :key="index">
        <PaperFromDetail :item="item" :index="index+1"/>
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
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  cursor: grab;
  width: 100%; /* 让所有的 li 高度自动撑满 */
  background-color: #f3f5f7;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { getDictCode, getPaper } from '@/api/common'
import { CodeOptionsConfig, PaperConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import bus from '@/utils/bus'
import DictCodeSelect from '@/components/ceci/DictCodeSelect.vue'
import { ElPagination } from 'element-plus/lib/components'
import PaperFromDetail from '@/components/paper/ListDetail.vue'

export default defineComponent({
  name: 'Paper',
  components: { PaperFromDetail, ElPagination, DictCodeSelect },
  setup () {
    const dataList = ref<PaperConfig[]>([])
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

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getPaper({
          params: {
            page: currentPage.value,
            pageSize: pageSize.value,
            papercontent: searchKeyword.value,
            platform: platform.value,
            term: term.value,
            period: period.value,
            grade: grade.value,
            edition: edition.value,
            subject: subject.value
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
      termOptions
    }
  }
})
</script>
