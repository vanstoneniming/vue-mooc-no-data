<template>
  <el-card>
    <div class="item-body">
      <div class="question-row-header">
        <el-tag round type="info">{{ item.questionNo }}</el-tag>
        <div class="quest-title" v-html="sanitizeHTML(item.question)"></div>
      </div>
      <div class="quest-select" v-html="sanitizeHTML(item.questionselect)"></div>
      <div v-if="showAnswer" class="quest-answer"><span v-html="`答案：${item.questionanswer}`"></span>
        <div class="quest-describe" v-html="sanitizeHTML(item.questiondescribe)"></div>
      </div>
    </div>
    <template #footer>
      <div class="right-align">
        <el-button class="answer-button" title="查看答案和解析" @click="toggleAnswer">查看答案
        </el-button>
      </div>
    </template>
  </el-card>
</template>
<script lang="ts" name="QuestionDetail" setup>
import { ref } from 'vue'
import { sanitizeHTML } from '@/hooks/utils/helper'

// eslint-disable-next-line no-undef
defineProps(['item'])

const showAnswer = ref(false)

function toggleAnswer () {
  showAnswer.value = !showAnswer.value
}
</script>

<style scoped>
.question-row-header {
  display: flex;
}

.el-card {
  border-radius: 8px;
}

.item-body {
  //height: 220px;
  overflow: auto;
}

.el-tag {
  margin-right: 8px;
}

.answer-button {
  color: darkseagreen;
}

.quest-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.quest-answer {
  padding: 5px;
  color: darkred;
  border-style: solid;
  border-color: burlywood;
  background-color: honeydew;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.quest-answer p {
  color: darkred;
}

.quest-select {
  margin-left: 40px;
}

.quest-describe {
  font-size: 14px;
  color: #2688E8;
}

.right-align {
  display: flex;
  justify-content: right;
}

@media screen and (max-width: 768px) {
  .item-body {
    height: fit-content;
  }
}

</style>
