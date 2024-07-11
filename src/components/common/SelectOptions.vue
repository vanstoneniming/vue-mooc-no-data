<template>
  <div class="options-container">
    <div v-for="(option, index) in dictCodeOptions" :key="index">
      <template v-if="option.data && option.data?.length">
        <dict-code-select
          v-model="selectCodes[index]"
          :multiple="multiple"
          :options="option.data"
          :placeholder="'请选择' + option.label"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.options-container {
  display: flex;
  flex-wrap: wrap;
  padding-right: 20px;
}
</style>

<script lang="ts" setup name="SelectOptions">
import DictCodeSelect from '@/components/common/DictCodeSelect.vue'
import { onMounted, reactive, defineExpose } from 'vue'
import { DictCodeOptions } from '@/types'
import { getDictCodes } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'

const selectCodes: { [key: string]: string } = reactive({
  platform: '', subject: '', edition: '', period: '', grade: '', term: ''
})

const dictCodeOptions: DictCodeOptions = reactive({
  platform: { label: '平台', value: '', data: [] },
  subject: { label: '学科', value: '', data: [] },
  edition: { label: '版本', value: '', data: [] },
  period: { label: '学段', value: '', data: [] },
  grade: { label: '年级', value: '', data: [] },
  term: { label: '学期', value: '', data: [] }
})

// eslint-disable-next-line no-undef
const props = defineProps(['codesIn', 'setCode', 'multiple'])

defineExpose({ selectCodes })
async function fetchData () {
  try {
    const { code, result: dictCodes } = await getDictCodes(props.codesIn)
    if (code === ERR_SUCCESS && dictCodes) {
      for (const dictCode of dictCodes) {
        const key = dictCode.code as keyof typeof dictCodeOptions
        if (dictCodeOptions[key]) {
          dictCodeOptions[key].data.push({
            value: dictCode.value,
            label: dictCode.label
          })
        } else {
          dictCodeOptions[String(key)] = {
            value: '请选择',
            label: String(key),
            data: [{
              value: dictCode.value,
              label: dictCode.label
            }]
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching dictionary codes:', error)
  }
}

onMounted(fetchData)

</script>
