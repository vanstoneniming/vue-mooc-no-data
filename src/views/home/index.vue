<template>
  <div class="home">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-col class="center-col">
            <el-icon size="50px">
              <Stopwatch />
            </el-icon>
            本站为"课·视频[ke.video]"和"题·视频[ti.video]"联合站，系统正在建设中，部分功能处于调试阶段，敬请期待！
          </el-col>
        </div>
      </template>
      <div class="statistics-container">
        <el-statistic :value="ceci" title="册次数量"/>
        <el-statistic :value="course" title="课程数量"/>
        <el-statistic :value="resource" title="资源数量"/>
        <el-statistic :value="resUrl" title="链接数量"/>
        <el-statistic :value="paper" title="试卷数量"/>
        <el-statistic :value="questionRow" title="题帽题数"/>
        <el-statistic :value="question" title="单题数量"/>
      </div>
      <el-divider/>
      <div>
        <ul>
          <li>
            <div class="icon-container">
              <el-icon>
                <Files/>
              </el-icon>
            </div>
            <div class="text-container">
              课·视频致力于为广大一线教师提供多平台丰富的视频微课、公开课、精品课等资源。
              题·视频致力于整理和优化试卷、试题组织管理、查询和重组等功能研发和实践。
            </div>
          </li>
          <li>
            <div class="icon-container">
              <el-icon>
                <Files/>
              </el-icon>
            </div>
            <div class="text-container">
              课程信息和内容主要来源于国家和地方相关课程资源，如：国家中小学智慧教育云平台、部级精品课平台、北京空中课堂、上海微课、广州共享课堂、皖教云（云课堂/资源专区/活动评选）、赣教云等。
            </div>
          </li>
          <li>
            <div class="icon-container">
              <el-icon>
                <Files/>
              </el-icon>
            </div>
            <div class="text-container">
              资源类型包含多种常用类型，如：视频、课件、教案、学习任务单、课后练习等官网提供的原始资源。
            </div>
          </li>
          <li>
            <div class="icon-container">
              <el-icon>
                <Files/>
              </el-icon>
            </div>
            <div class="text-container">
              资源处理和加工主要包含：根据视频文件转写文字，生成逐字稿（可包含时间标记）、字幕文件、字幕视频等资源。
            </div>
          </li>
          <li>
            <div class="icon-container">
              <el-icon>
                <Files/>
              </el-icon>
            </div>
            <div class="text-container">
              资源格式包含常见的mp4视频文件，ppt课件，docx教案，还有部分资源是pdf格式的，如有需要可以用百度网盘等工具转换成pptx或者docx格式。
            </div>
          </li>
          <li>
            <div class="icon-container">
              <el-icon>
                <Files/>
              </el-icon>
            </div>
            <div class="text-container">
              题·视频网站主要收集整理各地中高考真题和模拟试卷，并且进行深加工，比如试卷pdf转换word或者markdown，latex等格式，试题切割入库，
              后期陆续研发利用分割好的试题组卷、在线练习、在线考试、试题视频讲解等功能。
            </div>
          </li>
        </ul>
      </div>
      <template #footer>
        <div class="card-footer">
          <ul>
            <li>
              <div class="icon-container">
                <el-icon>
                  <Star/>
                </el-icon>
              </div>
              <div class="text-container">
                本站提供的资源和方法为互联网公开资源和站长亲自动手制作处理。
              </div>
            </li>
            <li>
              <div class="icon-container">
                <el-icon>
                  <Star/>
                </el-icon>
              </div>
              <div class="text-container">
                如涉及相关版权问题，请与站长联系删除相关资源文件和引用链接。
              </div>
            </li>
            <li>
              <div class="icon-container">
                <el-icon>
                  <Star/>
                </el-icon>
              </div>
              <div class="text-container">
                本站为广大一线教师提供专业服务，商家勿扰，禁止将本站处理成果进行倒卖。
              </div>
            </li>
          </ul>
        </div>
      </template>
    </el-card>
  </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { getDataCount } from '@/api/common'
import { ERR_SUCCESS } from '@/api/config'

const counts = reactive({
  ceci: 0,
  resUrl: 0,
  course: 0,
  resource: 0,
  paper: 0,
  question: 0,
  questionRow: 0
})
const { ceci, resUrl, course, resource, paper, question, questionRow } = toRefs(counts)
async function fetchData () {
  try {
    const { code, result } = await getDataCount()
    if (code === ERR_SUCCESS) {
      Object.assign(counts, result)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)
</script>
<style scoped>
@import '~@/assets/styles/responsive.scss';

.home {
  margin: 10px 20px;
  position: relative; /* 确保 z-index 生效 */
  z-index: -1; /* 设置为较低的值，例如 1 */
}

.statistics-container {
  display: flex;
  justify-content: space-between; /* Adjust as needed */
  align-items: center; /* Adjust as needed */
}

.el-col {
  text-align: center;
}

.el-statistic {
  margin: 0 10px;
  padding: 5px 20px;
  background-color: aliceblue;
  white-space: nowrap;
  border-style: solid;
  border-radius: 3px;
  border-color: #a0cfff;
}

.el-card li {
  display: flex;
  align-items: flex-start;
}

.icon-container {
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-top: 5px;
}

.text-container {
  flex: 1;
  align-self: flex-start;
}

.card-header {
  font-size: 18px;
  color: #409EFF;
}

.el-card li {
  font-size: 16px;
  line-height: 1.5;
  color: #409EFF;
  margin: 20px 0;
}

.el-card p {
  font-size: 14px;
  line-height: 1.5;
}

.card-footer {
  font-size: 12px;
  line-height: 1.5;
}

.card-footer li {
  font-size: 12px;
  color: #73767a;
  margin: 5px 0;
}

.el-col .el-icon {
  color: #09BB07;
  margin-left: 10px;
  vertical-align: center;
}

.el-icon {
  align-items: center;
  margin-right: 5px;
}

.center-row {
  width: 100%;
}

.center-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
