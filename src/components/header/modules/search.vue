<template>
  <div>
    <el-input
      v-model="keyword"
      class="input-with-select"
      placeholder="输入关键词..."
      @keyup.enter="handleKeywordChange"
      clearable
    >
      <template v-if="false" #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 100px" clearable>
          <el-option label="册次" value="1"/>
          <el-option label="课程" value="2"/>
          <el-option label="题帽" value="3"/>
          <el-option label="试题" value="4"/>
          <el-option label="试卷" value="5"/>
        </el-select>
      </template>
      <template #append>
        <el-icon type="button" @click="handleKeywordChange">
          <Search/>
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup name="HeaderSearch">
import { inject, ref, watch } from 'vue'

const keyword = ref('')
const select = ref('')
const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })

function handleKeywordChange () {
  searchKeyword.value = keyword.value
}

watch(keyword, (newValue, oldValue) => {
  if (!newValue.trim() && oldValue.trim()) {
    searchKeyword.value = newValue
  }
})
</script>
<style lang="scss" scoped>
.el-input {
  width: 320px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
