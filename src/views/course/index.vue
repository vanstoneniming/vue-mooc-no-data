<template>
  <div class="home">
    <header-short-cut/>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogModelTitle"
      :width="dialogModelWidth"
      @close="dialogVisible = false"
    >
      <el-image
        :src="thumbsImage"
        fit="contain"
        style="width: 100%; height: 100%;"
      />
    </el-dialog>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="({ceci, ceci_name, id, original_link, teachers, thumbnails:thumbs, title, year} , index) in dataList"
        :key="index">
        <template #title>
          <div class="title">
            {{ courseIndex(index) }}. {{ title }}
            <el-tag v-if="teachers">{{ teachers }}</el-tag>
          </div>
        </template>
        <div>
          <el-tag v-for="(nameTag, index) in ceciNameList(ceci_name)" :key="index">{{ nameTag }}</el-tag>
          <el-tag v-if="year">{{ year }}</el-tag>
          <el-button-group>
            <el-button type="success" @click="goToCeci(ceci)">同册课程</el-button>
            <el-button v-if="thumbs" type="success" @click="openOriginal(thumbs)">查看图片</el-button>
            <el-button v-if="original_link" type="success" @click="openOriginal(original_link)">原始链接</el-button>
            <el-button type="success" @click="goToDetail(id)">配套资源</el-button>
          </el-button-group>
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :hide-on-single-page=true
      :page-sizes="[12, 24, 36, 48, 60]"
      :total="totalSize"
      layout="total, sizes, prev, pager, next, jumper"
      next-text="下一页"
      prev-text="上一页"
    />
  </div>
</template>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px 20px;
}

.el-tag {
  margin: 8px; /* 调整标签之间的下方间距 */
  line-height: 1.5; /* 调整标签的行高 */
}

.el-collapse {
  margin: 0 20px;
}

button div.title {
  font-size: 18px;
  font-weight: bold;
  color: darkslategray;
}

button.is-active div.title {
  color: #2688E8;
}

.el-button-group {
  float: right;
  margin-right: 25px;
  margin-bottom: 10px;
}

.ceci-list {
  padding: 0;
  justify-content: center;
}

.ceci-list li {
  margin-bottom: 10px;
  box-sizing: border-box;
  text-align: center;
  height: 100%; /* 让所有的 li 高度自动撑满 */
}

.ceci-item {
  align-items: center;
  justify-content: center;
  height: 100%;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { getCourse, getImages } from '@/api/common'
import { CourseConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import { useRoute, useRouter } from 'vue-router'
import bus from '@/utils/bus'
import { ElPagination } from 'element-plus/lib/components'
import HeaderShortCut from '@/components/header/modules/ShortCut.vue'

export default defineComponent({
  name: 'Course',
  components: { HeaderShortCut, ElPagination },

  setup () {
    const route = useRoute()
    const router = useRouter()
    const dataList = ref<CourseConfig[]>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(12)
    const totalSize = ref<number>(0)
    const searchKeyword = ref('')
    const activeName = ref('0')
    const thumbsImage = ref('')
    const dialogVisible = ref(false)
    const dialogModelWidth = ref(380)
    const dialogModelTitle = ref('图片预览')

    async function fetchData () {
      try {
        const { code, result: { items: data, total } } = await getCourse({
          params: {
            page: currentPage.value,
            pageSize: pageSize.value,
            title: searchKeyword.value,
            ceci: router.currentRoute.value.query.ceci
          }
        })
        if (code === ERR_SUCCESS && data) {
          dataList.value = data
          totalSize.value = total
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    bus.on('keywordChange', (event) => {
      searchKeyword.value = event as string
      fetchData()
    })

    const goToDetail = (id: number) => {
      router.push({ name: 'Resource', query: { course: id } })
    }

    const openOriginal = (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    const goToCeci = (id: number) => {
      router.push({ name: 'Course', query: { ceci: id } })
    }

    const titleWithAuthor = (title: string, teachers: string) => {
      return teachers !== '' ? `${title}-${teachers}` : title
    }

    const courseIndex = (index: number) => {
      return index + 1 + (pageSize.value * (currentPage.value - 1))
    }

    const ceciNameList = (ceci: string) => {
      return ceci.split('_')
    }
    const thumbnails = (title: string, thumbs: any, width: number) => {
      if (thumbs === null) {
        thumbsImage.value = ''
      } else {
        thumbsImage.value = getImages(thumbs, width)
        dialogVisible.value = true
        dialogModelWidth.value = width
        dialogModelTitle.value = title + '_width=' + width + 'px'
      }
    }

    onBeforeMount(() => fetchData())

    watch(
      [searchKeyword, currentPage, pageSize, route],
      () => {
        fetchData()
      },
      { deep: true }
    )

    return {
      dataList,
      currentPage,
      pageSize,
      totalSize,
      activeName,
      thumbsImage,
      dialogVisible,
      dialogModelWidth,
      dialogModelTitle,
      openOriginal,
      ceciNameList,
      thumbnails,
      goToCeci,
      goToDetail,
      courseIndex,
      titleWithAuthor
    }
  }
})
</script>
