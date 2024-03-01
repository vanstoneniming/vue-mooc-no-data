<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in ceciList"
          :key="index" @click="goToDetail(item)"
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
import { getCeci } from '@/api/common'
import { CeciConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Ceci',
  setup () {
    const router = useRouter()
    const ceciList = ref<CeciConfig[]>([])
    onBeforeMount(async () => {
      const { code, result: { items: data } } = await getCeci()
      if (code === ERR_SUCCESS && data) {
        ceciList.value = data
      }
    })
    const goToDetail = (item: CeciConfig) => {
      console.log(item.id)
      router.push({ name: 'CeciDetail', params: { id: item.id } })
    }
    return { goToDetail, ceciList }
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
    cursor: grab;
  }
</style>
