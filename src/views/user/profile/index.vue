<template>
  <div class="profile">
    <dl>
      <dt class="profile-title">个人信息</dt>
      <dd class="profile-item">
        <div class="profile-item-title">昵称</div>
        <div class="profile-item-value">{{ userInfo.username || '未设置' }}</div>
      </dd>
      <dd class="profile-item">
        <div class="profile-item-title">姓名</div>
        <div class="profile-item-value">{{ userInfo.name || '未设置' }}</div>
      </dd>
      <dd class="profile-item">
        <div class="profile-item-title">更新日期</div>
        <div class="profile-item-value">{{ new Date(userInfo.update_datetime).toLocaleString() || '未设置' }}</div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts" name="UserProfile" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { UserInfo } from '@/types'

const store = useStore()
const userInfo = computed(() => {
  return store.getters.userInfo as UserInfo
})
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.profile {
  &-title {
    margin-bottom: 20px;
    padding-bottom: 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid $placeholder-text;
    font-size: $font-medium;
    font-weight: bold;
  }

  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 24px;
    font-size: $font-normal;
    color: $primary-text;

    &-title {
      flex: 0 0 120px;
      width: 120px;
      height: 60px;
      line-height: 60px;
      background-color: rgba($secondary-text, 0.15);
      text-align: center;
      font-weight: bold;
    }

    &-value {
      flex: 1;
      margin-left: 15px;
      padding-left: 20px;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid $placeholder-text;
    }
  }
}
</style>
