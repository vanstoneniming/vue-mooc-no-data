<template>
  <el-card>
    <div class="header-content">
      <el-tag round type="info">{{ index }}</el-tag>
      <div class="quest-title" v-html="sanitizeHTML(item.question)"></div>
    </div>

        <div class="quest-select" v-html="sanitizeHTML(item.questionselect)"></div>

        <div v-if="showAnswer" class="quest-answer"><span v-html="`答案：${item.questionanswer}`"></span>
          <div class="quest-describe" v-html="sanitizeHTML(item.questiondescribe)"></div>
        </div>

    <template #footer>
      <div class="right-align">
        <el-button class="answer-button" title="查看答案和解析" @click="toggleAnswer">查看答案
        </el-button>
      </div>
    </template>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { sanitizeHTML } from '@/hooks/utils/helper'

// 定义 props
// eslint-disable-next-line no-undef
const props = defineProps({
  item: Object,
  index: Number
})

// 如果有响应式状态，可以使用 ref 或 reactive 创建
const showAnswer = ref(false)

// 如果有方法，直接定义
function toggleAnswer () {
  // 方法逻辑
  showAnswer.value = !showAnswer.value
}

// 由于 sanitizeHTML 是从外部导入的，我们直接可以在模板中使用它
</script>
<style scoped>
.header-content {
  display: flex; /* Use flexbox to align elements in a row */
}

.el-tag {
  margin-right: 8px; /* Add spacing between el-tag and quest-title */
}

.answer-button {
  color: darkolivegreen;
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

.ceci-item img {
  margin: 0 auto; /* 水平居中 <img> 元素 */
}

/* Style for question title */
.quest-title {
  font-size: 18px;
  font-weight: bold;
}

.quest-answer {
  padding: 5px;
  color: darkred;
  border-style: solid;
  border-color: burlywood;
  background-color: honeydew;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影，偏移量为 (2px, 2px)，模糊半径为 4px，颜色为 rgba(0, 0, 0, 0.2) */
}

.quest-answer p {
  color: darkred;
}

.quest-select{
  margin-left: 20px;
}
/* Style for description */
.quest-describe {
  font-size: 14px;
  color: #2688E8;
}

.right-align {
  display: flex;
  justify-content: right;
}
</style>
