<template>
  <div class="login-area">
    <ul>
      <template v-if="userInfo.id">
        <li class="login-area-item user">
          <img :src="avatar" alt="头像" height="32" width="32">
          <UserCard class="user-card"/>
        </li>
      </template>
      <li v-else class="login-area-item login">
        <el-button  type="primary" title="登陆" @click="handleLoginClick(0)">登陆</el-button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { UserInfo } from '@/types'
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import avatar from '@/assets/images/header.jpg'

const UserCard = defineAsyncComponent(() => import('./userCard.vue'))
const router = useRouter()
const store = useStore()
ref(false)
const userInfo = computed<UserInfo>(() => store.getters.userInfo)
const goToCart = () => {
  router.push('/cart')
}
const myLesson = () => {
  router.push('/lesson')
}
const handleLoginClick = (type: number) => {
  router.push({ path: '/login', query: { type } })
}
defineComponent({
  name: 'HeaderLoginArea',
  components: {
    UserCard
  }
})
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

$header-height: 72px;
$half-height: calc(#{$header-height} / 2);
.login-area {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px;

  &-item {
    position: relative;
    display: inline-block;
    vertical-align: top;
    line-height: $header-height;
    font-size: $font-normal;
    color: $regular-text;

    & > span {
      white-space: nowrap;
      cursor: pointer;
    }

    &:not(.login):hover {
      & > span {
        color: $theme-red;
      }
    }

    &.cart {
      margin: 18px 0;
      height: $half-height;
      line-height: calc(#{$header-height} / 2 - 2px);
      border: 1px solid $placeholder-text;
      border-radius: $border-radius-large;
      box-sizing: border-box;

      &:hover {
        border-color: $theme-red;
      }

      .iconfont {
        margin-right: 8px;
      }
    }

    &.bell, &.lesson, &.user {
      width: 100px;
      text-align: center;
      cursor: pointer;
    }

    &.bell {
      &:hover {
        .iconfont {
          color: $theme-red;
        }
      }

      :deep(.el-badge) {
        line-height: 1.4;
      }
    }

    &.user {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 70px;

      &:hover {
        img {
          border-color: $theme-red;
        }

        .user-card {
          display: block;
        }
      }

      img {
        display: inline-block;
        border-radius: 50%;
        border: 2px solid transparent;
      }
    }

    &.login {
      margin-left: 10px;
      color: $placeholder-text;

      span {
        display: inline-block;
        line-height: $header-height;
        color: $regular-text;

        &:hover {
          color: $theme-red;
        }
      }
    }
  }
}

</style>
