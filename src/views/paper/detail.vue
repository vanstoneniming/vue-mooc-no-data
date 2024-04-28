<template>
  <div class="home">
    <ul class="ceci-list">
        <paper-page :item="paperData"></paper-page>
    </ul>
  </div>
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
  justify-content: left;
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

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getPaperDetail } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'

import { useRoute } from 'vue-router'
import PaperPage from '@/components/paper/PaperPage.vue'

export default defineComponent({
  name: 'PaperDetail',
  components: { PaperPage },
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
