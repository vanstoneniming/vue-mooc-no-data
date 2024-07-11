<template>
  <div class="home">
    <el-container>
      <el-aside>
        <div class="radio-buttons">
          <el-radio-group v-model="selectedType">
            <el-radio-button label="试卷" value="paper"/>
            <el-radio-button label="资源" value="res"/>
          </el-radio-group>
        </div>
        <div v-show="dataList.length==0">
          <el-empty :image-size="300" description="暂无数据"/>
        </div>
        <ul class="ceci-list">
          <li v-for="(item, index) in dataList" :key="index" :class="{ 'selected': index === selectedIndex }"
              @click="preview(item, index)">
            <PaperFromDetail :index="index+1" :item="item"/>
          </li>
        </ul>
        <div class="pagination">
          <SelectOptions v-if="false" :multiple="false" :setCode="setSelectCode" codesIn="period,subject"/>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :hide-on-single-page=true
            :page-sizes="[12, 24, 36, 48, 60]"
            :total="totalSize"
            layout="prev, pager, next"
            next-text="下一页"
            prev-text="上一页"
            small
          />
        </div>
      </el-aside>
      <el-main>
        <div v-if="currentPaper">
          <el-tabs type="border-card">
            <el-tab-pane label="试卷切图">
              <paper-split-image :item="currentPaper"></paper-split-image>
            </el-tab-pane>
            <el-tab-pane label="试卷详情">
              <paper-preview :item="currentPaper"/>
            </el-tab-pane>
            <el-tab-pane label="pdf预览处理">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else>暂无数据展示</div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup name="Paper">
import { defineComponent, inject, reactive, ref, watchEffect } from 'vue'
import { getPaper } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'
import { ElPagination } from 'element-plus/lib/components'
import PaperFromDetail from '@/components/paper/ListDetail.vue'
import PaperPreview from '@/components/paper/PaperPreview.vue'
import SelectOptions from '@/components/common/SelectOptions.vue'
import { PaperConfig } from '@/types'
import PaperSplitImage from '@/components/paper/PaperSplitImage.vue'

const dataList = ref<PaperConfig[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
const totalSize = ref<number>(0)
const currentPaper = ref<PaperConfig | null>(null)
const selectedIndex = ref(0)
const { searchKeyword } = inject('searchKeyword', { searchKeyword: ref('') })
const codes: { [key: string]: string } = reactive({ platform: '', subject: '', edition: '', period: '', grade: '', term: '' })
const selectedType = ref('paper')

function setSelectCode (key: string, code: string | string[]) {
  codes[key] = Array.isArray(code) ? code.join(',') : code
}
async function fetchData () {
  try {
    const { code, result: { items: data, total } } = await getPaper({
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        papercontent: searchKeyword.value,
        papertype: selectedType.value,
        platform: codes.platform,
        term: codes.term,
        period: codes.period,
        grade: codes.grade,
        edition: codes.edition,
        subject: codes.subject
      }
    })
    if (code === ERR_SUCCESS && data) {
      const paperList = data.map(obj => {
        obj.papercontent = obj.papercontent.replace(/ src=/g, ' src_url=')
        return obj
      })
      dataList.value = paperList
      currentPaper.value = paperList[0]
      totalSize.value = total
      selectedIndex.value = 0
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function preview (item: PaperConfig | null, index: number) {
  selectedIndex.value = index
  currentPaper.value = item
}

watchEffect(() => { fetchData() })

defineComponent({
  components: { SelectOptions, PaperPreview, PaperFromDetail, ElPagination }
})
</script>

<style scoped>
.home {
  margin: 10px;
}

.radio-buttons {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.ceci-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  justify-content: left;
  margin: 3px 0;
}

.ceci-list li {
  margin: 3px 6px;
  padding: 5px 10px;
  box-sizing: border-box;
  text-align: left;
  cursor: grab;
  width: 100%; /* 让所有的 li 高度自动撑满 */
  background-color: aliceblue;
  border-radius: 3px;
}

li.selected{
  background-color: #a0cfff;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}

.el-container {
  display: flex;
  flex-direction: row;
}

.el-main {
  flex: 1;
  margin-left: 360px;
}

.el-aside {
  margin: 15px 0;
  padding: 5px 0;
  width: 360px;
  position: fixed;
  border-radius: 5px;
  background-color: orange;
}

/* 小屏幕下的样式 */
@media screen and (max-width: 1300px) {
  .el-container {
    display: flex;
    flex-direction: column; /* 设置为垂直方向排列 */
  }

  .el-main {
    margin: 10px 0;
    display: flex;
    padding: 5px 0;
  }

  .el-aside {
    width: 100%;
    position: relative;
  }

  .ceci-list {
    display: flex;
    max-height: 200px; /* 设置最大高度为屏幕显示区域的50% */
    overflow: auto; /* 超出部分隐藏 */
    transition: max-height 0.3s ease; /* 添加过渡效果 */
  }

  .ceci-list:hover {
    display: flex;
    max-height: none; /* 设置最大高度为屏幕显示区域的50% */
  }

}
</style>
