<template>
  <div class="home">
    <div v-show="dataList.length==0">
        <el-empty description="暂无数据" :image-size="300"/>
    </div>
    <el-collapse v-model="activeName" accordion>
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
      <el-collapse-item
        v-for="({ceci, ceci_name, id, original_link, teachers, thumbnails:thumbs, title, year} , index) in dataList"
        :key="index">
        <template #title>
          <div class="title">
            <el-tag round>{{ courseIndex(index) }}</el-tag> {{ title }}
            <el-tag type="success" v-if="teachers">{{ teachers }}</el-tag>
          </div>
        </template>
        <div>
          <el-tag v-for="(nameTag, index) in ceciNameList(ceci_name)" :key="index" type="info">{{ nameTag }}</el-tag>
          <el-tag v-if="year" type="info">{{ year }}</el-tag>
          <el-button-group>
            <el-button size="small" v-if="sameGroupVisible" type="success" @click="goToCeci(ceci)">同册课程</el-button>
            <el-button size="small" v-if="thumbs" type="success" @click="openOriginal(thumbs)">新页大图</el-button>
            <el-button size="small" v-if="thumbs" type="success" @click="thumbnails(title,thumbs,500)">弹层略图</el-button>
            <el-button size="small" v-if="original_link" type="success" @click="openOriginal(original_link)">原始链接</el-button>
            <el-button size="small" v-if="original_link" type="success" @click="resolveUrl(original_link)">解析链接</el-button>
            <el-button size="small" type="success" @click="goToDetail(id)">配套资源</el-button>
          </el-button-group>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalSize"
      next-text="下一页"
      prev-text="上一页"
      small
      :page-sizes="[12, 24, 36, 48, 60]"
      :hide-on-single-page=true
      layout="sizes, prev, pager, next"
    />
  </div>
</template>

<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 5px 5px;
}

.el-tag {
  margin: 2px; /* 调整标签之间的下方间距 */
  //line-height: 1.5; /* 调整标签的行高 */
}

button div.title {
  font-size: 14px;
  font-weight: bold;
  color: darkslategray;
  white-space: nowrap; /* 强制文本在一行内显示 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 在溢出时显示省略号 */
}

button.is-active div.title {
  color: #2688E8;
}

.el-button-group {
  float: right;
  margin: 5px;
}

.ceci-list {
  padding: 0;
  justify-content: center;
}

.ceci-list li {
  //margin-bottom: 5px;
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
  margin: 5px;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts" setup name="Course">
import { defineComponent, inject, onBeforeMount, ref, watchEffect } from 'vue'
import { getCourse, getImages } from '@/api/common'
import { useRouter } from 'vue-router'
import { ElPagination } from 'element-plus/lib/components'
import { ERR_SUCCESS } from '@/api/config'
import { CourseConfig } from '@/types'

const router = useRouter()
const dataList = ref<CourseConfig[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
const totalSize = ref<number>(0)
const activeName = ref('0')
const thumbsImage = ref('')
const dialogVisible = ref(false)
const dialogModelWidth = ref(380)
const dialogModelTitle = ref('图片预览')
const sameGroupVisible = ref(true)
const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })

defineComponent({
  components: { ElPagination }
})

async function fetchData () {
  const queryCeci = router.currentRoute.value.query.ceci
  sameGroupVisible.value = !queryCeci
  try {
    const { code, result: { items: data, total } } = await getCourse({
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        title: searchKeyword.value,
        ceci: queryCeci
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

const goToDetail = (id: number) => {
  router.push({ name: 'Resource', query: { course: id } })
}

const openOriginal = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const resolveUrl = (url: string) => {
  router.push({ path: 'Resolve', query: { url } })
}

const goToCeci = (id: number) => {
  router.push({ name: 'Course', query: { ceci: id } })
}

const courseIndex = (index: number) => {
  return index + 1 + (pageSize.value * (currentPage.value - 1))
}

const ceciNameList = (ceci: string) => {
  return ceci.split('_').filter(item => item.trim() !== '')
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

watchEffect(() => { fetchData() })

</script>
