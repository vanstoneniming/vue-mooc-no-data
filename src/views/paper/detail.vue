<template>
  <div class="home">
    <el-tabs type="border-card">
      <el-tab-pane label="试卷切图">
        <paper-split-image :item="paperData"></paper-split-image>
      </el-tab-pane>
      <el-tab-pane label="试卷详情">
        <paper-page :item="paperData"></paper-page>
      </el-tab-pane>
      <el-tab-pane label="pdf预览处理">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px;
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

</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getPaperDetail } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'

import { useRoute } from 'vue-router'
import PaperPage from '@/components/paper/PaperPage.vue'
import PaperSplitImage from '@/components/paper/PaperSplitImage.vue'

export default defineComponent({
  name: 'PaperDetail',
  components: { PaperSplitImage, PaperPage },
  setup () {
    const paperData = ref({})
    const route = useRoute()
    const id = route.params.id.toString()
    async function fetchData () {
      try {
        const { code, result: data } = await getPaperDetail(id)
        if (code === ERR_SUCCESS && data) {
          paperData.value = data
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      paperData
    }
  }
})
</script>
