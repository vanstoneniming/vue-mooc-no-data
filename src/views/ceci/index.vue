<template>
  <div class="home">
    <dict-code-select v-model="platform" :options="platformOptions" placeholder="请选择平台"></dict-code-select>
    <dict-code-select v-model="subject" :options="subjectOptions" placeholder="请选择学科"></dict-code-select>
    <dict-code-select v-model="edition" :options="editionOptions" placeholder="请选择版本"></dict-code-select>
    <dict-code-select v-model="period" :options="periodOptions" placeholder="请选择学段"></dict-code-select>
    <dict-code-select v-model="grade" :options="gradeOptions" placeholder="请选择年级"></dict-code-select>
    <dict-code-select v-model="term" :options="termOptions" placeholder="请选择学期"></dict-code-select>
    <ul class="ceci-list">
      <li v-for="(item, index) in ceciList" :key="index">
        <div class="ceci-item">
          <ceci-detail :data="item"/>
        </div>
      </li>
    </ul>
  </div>

  <CustomPagination
      :total-items="totalSize"
      @update:currentPage="onPageChange"
      @update:pageSize="onPageSizeChange"
    ></CustomPagination>
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

</style>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { getCeci, getDictCode } from '@/api/common'
import { CeciConfig, CodeOptionsConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import CeciDetail from '@/components/ceci/index.vue'
import bus from '@/utils/bus'
import DictCodeSelect from '@/components/ceci/DictCodeSelect.vue'
import CustomPagination from '@/components/ceci/CustomPagination.vue'

export default defineComponent({
  name: 'Ceci',
  components: { CustomPagination, DictCodeSelect, CeciDetail },
  setup () {
    const dataList = ref<CeciConfig[]>([])
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

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getCeci({
          params: {
            page: currentPage.value,
            pageSize: pageSize.value,
            title: searchKeyword.value,
            platform: platform.value,
            term: term.value,
            period: period.value,
            grade: grade.value,
            edition: edition.value,
            subject: subject.value
          }
        })
        if (code === ERR_SUCCESS && data) {
          data.forEach((item) => {
            const title: string = item.title
            const s = title.split('_')
            item.title = s[3].concat('-').concat(s[2])
            item.platform = s[0]
            item.period = s[1]
            item.subject = s[2]
            item.edition = s[3]
            item.grade = s[4]
            item.term = s[5]
          })
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

    function onPageChange (newPage: number) {
      currentPage.value = newPage
    }

    function onPageSizeChange (newSize: number) {
      pageSize.value = newSize
    }

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
      termOptions,
      onPageChange,
      onPageSizeChange
    }
  }
})
</script>
