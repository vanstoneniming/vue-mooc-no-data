<template>
  <div class="user">
    <!-- 左侧导航 -->
    <div class="user-nav">
      <div class="user-info">
        <img class="user-info-avatar" :src="userInfo.avatar || avatar" alt="">
        <div class="user-info-name"><el-tag>ID: {{userInfo.id}}</el-tag>{{userInfo.username}}</div>
        <div class="user-info-uid">

          <el-tag>积分: {{userInfo.points}}</el-tag>
          <el-tag>经验: {{userInfo.experience}}</el-tag>
        </div>
      </div>
      <dl>
        <dt class="user-nav-title">账号管理</dt>
        <dd
          v-for="(item, index) in navList"
          :key="index"
          class="user-nav-item"
          :class="{
            active: activeIndex==index
          }"
          @click="handleNavClick(item)"
        >
          {{item.title}}
          <i class="iconfont icon-right"></i>
        </dd>
      </dl>
    </div>

    <!-- 右侧子页面 -->
    <div class="user-page">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup name="UserIndex">
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { NavConfig, UserInfo } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import avatar from '@/assets/images/header.jpg'

const navList = [
  { title: '账号安全', url: '/user/binding' },
  { title: '个人信息', url: '/user/profile' }
]

const store = useStore()
const router = useRouter()
const route = useRoute()
const activeIndex = ref(0)

const userInfo = computed<UserInfo>(() => {
  return store.getters.userInfo
})

const handleNavClick = (item: NavConfig) => {
  router.push(item.url as string)
}

watchEffect(() => {
  const findIndex = navList.findIndex(item => item.url === route.path)
  activeIndex.value = findIndex !== -1 ? findIndex : 0
})

</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  @import '~@/assets/styles/mixin.scss';
  .user {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 0;
    @include mooc-center();
    &-nav {
      flex: 0 0 216px;
      width: 216px;
      height: 100%;
      background-color: #f8fafc;
      &-title {
        margin: 0 24px;
        padding: 12px 0;
        border-bottom: 1px solid $placeholder-text;
        font-size: $font-medium;
        color: $primary-text;
        line-height: 24px;
        font-weight: bold;
      }
      &-item {
        position: relative;
        padding-left: 54px;
        height: 48px;
        line-height: 48px;
        text-align: left;
        font-size: $font-normal;
        color: $primary-text;
        cursor: pointer;
        &:first-of-type {
          margin-top: 10px;
        }
        &:hover {
          color: $theme-red;
          background-color: #f3f5f7;
        }
        &.active {
          color: #fff;
          background-color: $theme-red;
        }
        .iconfont {
          position: absolute;
          right: 25px;
          top: 0;
          color: inherit;
        }
      }
    }
    &-page {
      flex: 1;
      margin-left: 48px;
    }
    &-info {
      padding: 32px 0 24px;
      text-align: center;
      &-avatar {
        display: inline-block;
        width: 100px;
        height: 100px;
        border: 4px solid #ddd;
        border-radius: 50%;
      }
      &-name {
        margin: 10px 5px;
        font-size: $font-largex;
        color: $primary-text;
        line-height: 24px;
      }
    }
  }
  .el-tag {
        font-size: $font-small;
        line-height: 30px;
        color: $theme-blue;
        margin-right: 10px;
      }
</style>
