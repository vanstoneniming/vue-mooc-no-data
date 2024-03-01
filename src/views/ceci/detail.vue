<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in ceciList"
          :key="index"
      >
        {{ item.id }}
        {{ item.title }}
        {{ item.update_datetime }}
        {{ item.status }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { getCeciDetail } from '@/api/common'
import { CeciConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ceci_detail',
  setup () {
    const route = useRoute()
    const ceciList = ref<CeciConfig[]>([])
    const id = route.params.id.toString()
    onBeforeMount(async () => {
      const { code, result: { items: data } } = await getCeciDetail(id)
      if (code === ERR_SUCCESS && data) {
        ceciList.value = data
      }
    })
    return { ceciList }
  }
})
</script>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px 20px;
}

li {
  padding: 10px;
}
</style>
