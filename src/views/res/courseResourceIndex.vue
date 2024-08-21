<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="260px" class="condition-area">
        <div class="affix-container">
          <el-affix :offset="83" target=".el-aside">
            <SelectOptions @changeSelect="handleSingleSelectChange" :multiple="false" codesIn="period,subject" />
            <SelectOptions @changeSelect="handleMultipleSelectChange" :multiple="true" codesIn="platform,edition,grade,term" />
          </el-affix>
        </div>
      </el-aside>
      <el-main>
        <Resource :singleSelect="singleSelect" :multipleSelect="multipleSelect" :course-id="currentCourseId"/>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SelectOptions from '@/components/common/SelectOptions.vue'
import { ref, watch } from 'vue'
import Resource from '@/views/res/courseResource.vue'

interface SelectOptionsType {
  selectCodes?: {
    [key: string]: any;
  };
}

const singleSelect = ref<SelectOptionsType | null>(null)
const currentCourseId = ref(0)
const multipleSelect = ref<SelectOptionsType | null>(null)
// eslint-disable-next-line no-undef
const props = defineProps(['id'])

watch(() => props.id, () => {
  currentCourseId.value = props.id
}, { immediate: true })
const handleMultipleSelectChange = (selectedValue: SelectOptionsType) => {
  multipleSelect.value = selectedValue
  currentCourseId.value = 0
}

const handleSingleSelectChange = (selectedValue: SelectOptionsType) => {
  singleSelect.value = selectedValue
  currentCourseId.value = 0
}
</script>

<style scoped>
.el-aside {
  background-color: #dddddd;
  padding-top: 10px;
}
.el-main{
  margin: 0;
  padding: 0;
}
</style>
