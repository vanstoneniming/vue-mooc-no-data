<template>
  <div class="d-flex align-items-center">
    <input v-model="keyword"
           class="form-control me-2 form-control"
           placeholder="册次、课程关键词..."
           type="text"
           @blur="isFocus = false"
           @focus="isFocus = true"
           @keyup.enter="handleKeywordChange"
    >
    <div class="search-icon" @click="handleKeywordChange">
      <i class="iconfont icon-search"></i>
    </div>
  </div>

</template>
<script lang="ts">

import { defineComponent, ref } from 'vue'
import bus from '@/utils/bus'

export default defineComponent({
  name: 'HeaderSearch',
  setup () {
    const keyword = ref('')
    const isFocus = ref(false)

    function handleKeywordChange () {
      bus.emit('keywordChange', keyword.value)
    }

    return { keyword, isFocus, handleKeywordChange }
  }
})
</script>
<style lang="scss" scoped>
.d-flex {
  position: relative; /* 设置相对定位 */
  display: flex;
}

.align-items-center {
  align-items: center;
}

.search-icon {
  cursor: pointer;
  position: absolute; /* 设置绝对定位 */
  right: 15px; /* 调整图标与输入框的距离 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
}

.form-control {
  padding-right: 30px; /* 给输入框增加右边距以容纳图标 */
}
</style>
