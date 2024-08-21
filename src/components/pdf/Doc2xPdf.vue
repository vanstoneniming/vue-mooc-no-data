<template>
  <div>
    <span>{{ doc2xs }}</span>
    <span>{{ limit }}</span>

  </div>
</template>

<script name="PdfProcessor" setup>
import { DOC2X } from 'doc2x'

import { onMounted, ref } from 'vue'

const limit = ref(0)
const doc2xs = ref(null)

onMounted(async () => {
  const doc2x = new DOC2X({
    baseUrl: 'https://api.doc2x.noedgeai.com',
    key: process.env.VUE_APP_DOC2X_KEY
  })

  await doc2x.init()

  console.log(doc2x.remain())
})
</script>

<style scoped>
/* 添加一些简单的样式 */
h3 {
  margin-top: 20px;
}
</style>
