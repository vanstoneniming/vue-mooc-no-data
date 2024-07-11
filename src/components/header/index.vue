<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid px-0">
      <a class="navbar-brand" href="/home">
        <img
          :alt="altInfo"
          class="navbar-logo"
        :src="require(`@/assets/images/login/${logo}`)"
        />
      </a>
      <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler"
              data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li :class="{ active: isActive('/ceci') }" class="nav-item">
            <a class="nav-link" @click="navigate('/ceci')">册次</a>
          </li>
          <li :class="{ active: isActive('/course') }" class="nav-item">
            <a class="nav-link" @click="navigate('/course')">课例</a>
          </li>
          <li :class="{ active: isActive('/resolve') }" class="nav-item">
            <a class="nav-link" @click="navigate('/resolve')">解析</a>
          </li>
          <li :class="{ active: isActive('/questionrow') }" class="nav-item">
            <a class="nav-link" @click="navigate('/questionrow')">题组</a>
          </li>
          <li :class="{ active: isActive('/question') }" class="nav-item">
            <a class="nav-link" @click="navigate('/question')">单题</a>
          </li>
          <li :class="{ active: isActive('/paper') }" class="nav-item">
            <a class="nav-link" @click="navigate('/paper')">试卷</a>
          </li>
        </ul>
        <div class="header-items">
          <HeaderSearch/>
          <HeaderLoginArea/>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  .navbar-brand {
    display: flex;
    align-items: center; /* 水平对齐Logo和文本 */
    padding: 15px; /* 添加内部padding，以替换原来的全局padding */

    .navbar-logo {
      height: 40px;
      margin: 0 10px; /* 增加Logo和文本之间的间距 */
    }
  }

  .navbar-toggler {
    padding: 5px; /* 确保切换按钮与导航栏的padding一致 */
    margin: 0 15px;
  }
}

/* 默认情况下，不显示背景 */
.navbar-collapse {
  padding: 0 50px;
  transition: background-color 0s; /* 添加过渡效果 */
}

/* 当折叠菜单显示时，添加背景 */
.navbar-collapse.show {
  background-color: #fff; /* 显示时背景变为白色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-nav .nav-item {
  cursor: pointer;
}

.navbar-nav .nav-item.active {
  border-bottom: 2px solid brown; /* 举例，你可以根据需要自定义 */
}

.header-items {
  display: flex;
  align-items: center; /* 保持垂直居中 */
  margin-left: auto; /* 确保HeaderSearch和HeaderLoginArea靠右显示 */
}
</style>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import HeaderSearch from './modules/search.vue'
import HeaderLoginArea from './modules/loginArea.vue'
import { useRouter } from 'vue-router'
import router from '@/router'
const currentNav = ref('') // 用于跟踪当前选中的导航项
const currentDomain = window.location.hostname.replace('www.', '')
const logo = currentDomain === 'ke.video' ? 'signlogo.png' : 'ti_video_logo.png'
const altInfo = currentDomain === 'ke.video' ? '课·视频 ke.video' : '题·视频 ti.video'
defineComponent({
  name: 'Header',
  components: {
    HeaderSearch,
    HeaderLoginArea
  }
})

function navigate (nav: string) {
  currentNav.value = nav
  router.push({ path: nav })
}

function isActive (nav) {
  const router = useRouter()
  currentNav.value = nav
  return router.currentRoute.value.path === nav
}
</script>
