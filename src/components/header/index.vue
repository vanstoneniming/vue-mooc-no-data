<template>
  <div class="header" style="display: none">
    <!-- brand -->
    <router-link
      to="/"
      custom
      v-slot="{navigate}"
    >
      <div class="header-brand">
        <img
          src="@/assets/images/common/brand.png"
          alt="课·视频"
          title="课·视频"
          @click="navigate"
        >
      </div>
    </router-link>

    <!-- navigation -->
    <HeaderNavigation />

    <!-- search -->

    <!-- login area -->
  </div>
<div class="header">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="/home">
      <img
        style="width: 180px"
        src="@/assets/images/common/brand.png"
        alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <HeaderSearch />
    <el-menu-item index="/ceci">册次</el-menu-item>
    <el-menu-item index="/course">课程</el-menu-item>
    <el-menu-item index="/res">资源</el-menu-item>
    <HeaderLoginArea />

  </el-menu>
</div>

</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import HeaderNavigation from './modules/navigation.vue'
import HeaderSearch from './modules/search.vue'
import HeaderLoginArea from './modules/loginArea.vue'
import { useRouter } from 'vue-router'
const activeIndex = ref('1')
const router = useRouter()
const handleSelect = (key: string) => {
  router.push(key)
}
defineComponent({
  name: 'Header',
  components: {
    HeaderNavigation,
    HeaderSearch,
    HeaderLoginArea
  }
})
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/responsive.scss';
  .header {
    &-brand {
      float: left;
      margin: 0 20px;
      cursor: pointer;
      @include respond-to {
        margin: 0 10px;
      }
      img {
        width: 220px;
        margin-top: 8px;
      }
    }
  }
  .flex-grow {
  flex-grow: 1;
}
</style>
