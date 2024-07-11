<template>
  <el-select-v2
    v-model="currentValue"
    :max-collapse-tags="3"
    :multiple="multiple"
    :options="options"
    :placeholder="placeholder"
    clearable
    collapse-tags
    collapse-tags-tooltip
    filterable
  />
</template>

<script lang="ts" name="DictCodeSelect" setup>
import { ref } from 'vue'

const currentValue = ref('')
// eslint-disable-next-line no-undef
defineProps({
  options: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})
</script>

<style scoped>
.el-select {
  width: 240px;
  margin: 10px;
}
</style>
