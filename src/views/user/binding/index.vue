<template>
  <div class="binding">
    <!-- 最新登陆时间 -->
    <transition name="slide-up">
      <div v-if="showLatest" class="binding-latest">
        <span>上次登录时间：2021-01-08 14:42:19</span>
        <span>地点：<router-link to="/user/log">查看最近操作记录</router-link></span>
        <i class="iconfont icon-close" @click="showLatest=false"></i>
      </div>
    </transition>

    <el-dialog v-model="dialogVisible" width="500">
      <UserBindingEmail v-show="formTypes.email" :email="bindingInfo.email" :hideDialog="hideDialog"/>
      <UserBindingMobile v-show="formTypes.mobile" :mobile="bindingInfo.mobile"  :hideDialog="hideDialog"/>
      <UserModifyPassword v-show="formTypes.password"  :hideDialog="hideDialog"/>
    </el-dialog>

    <!-- 绑定列表 -->
    <dl class="binding-list">
      <dt class="binding-list-title">账号安全</dt>

      <dd class="binding-list-item">
        <i class="iconfont icon-email"></i>
        <div class="binding-list-item-content">
          <p class="binding-list-item-title">邮箱
            {{ bindingInfo.email_verify_status ? bindingInfo.email + ' 已绑定' : '未绑定' }}</p>
          <p class="binding-list-item-desc">绑定邮箱后，邮箱可以用于接收资料，可用于找回密码</p>
          <el-button @click="showDialog('email')" :disabled="bindingInfo.email_verify_status">绑定邮箱</el-button>
        </div>
      </dd>

      <dd class="binding-list-item">
        <i class="iconfont icon-app"></i>
        <div class="binding-list-item-content">
          <p class="binding-list-item-title">手机
            {{ bindingInfo.mobile_verify_status ? bindingInfo.mobile + ' 已绑定' : '未绑定' }}</p>
          <p class="binding-list-item-desc">绑定手机号可以获得更加优质的服务，可用于找回密码</p>
          <el-button @click="showDialog('mobile')" :disabled="bindingInfo.mobile_verify_status">绑定手机</el-button>
        </div>
      </dd>

      <dd class="binding-list-item">
        <i class="iconfont icon-password"></i>
        <div class="binding-list-item-content">
          <p class="binding-list-item-title">密码</p>
          <p class="binding-list-item-desc">用于保护账号信息和登录安全</p>
          <el-button @click="showDialog('password')">修改密码</el-button>
        </div>
      </dd>

    </dl>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import { getUserBinding } from '@/api/user'
import { BindingConfig } from '@/types'
import { ERR_SUCCESS } from '@/api/config'
import UserBindingEmail from '@/components/user/binding/email.vue'
import UserBindingMobile from '@/components/user/binding/mobile.vue'
import UserModifyPassword from '@/components/user/binding/password.vue'

const dialogVisible = ref(false)
const showLatest = ref(false)
const bindingInfo = reactive<BindingConfig>({
  email: '',
  // eslint-disable-next-line @typescript-eslint/camelcase
  email_verify_status: false,
  mobile: '',
  // eslint-disable-next-line @typescript-eslint/camelcase
  mobile_verify_status: false
})
const formTypes = reactive({
  email: false,
  mobile: false,
  password: false
})

defineComponent([
  'UserBindingEmail', 'UserBindingMobile'
])

const getBindInfo = async () => {
  const { code, result } = await getUserBinding()
  if (code === ERR_SUCCESS) {
    Object.assign(bindingInfo, result)
  }
}

onBeforeMount(getBindInfo)

const showDialog = (formType: keyof typeof formTypes) => {
  dialogVisible.value = true
  for (const key in formTypes) {
    if (Object.prototype.hasOwnProperty.call(formTypes, key)) {
      (formTypes as Record<string, boolean>)[key] = key === formType
    }
  }
}

const hideDialog = () => {
  dialogVisible.value = false
  getBindInfo()
}

</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';

.binding {
  &-latest {
    margin-bottom: 20px;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background-color: rgba($theme-orange, 0.1);
    font-size: $font-small;
    color: $theme-red;

    span {
      & + span {
        margin-left: 10px;
      }

      a {
        font-style: normal;
        color: $theme-blue;
        cursor: pointer;
      }
    }

    .iconfont {
      position: relative;
      float: right;
      cursor: pointer;
      @include extend-click(-3px);
    }
  }

  &-list {
    &-title {
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
      padding: 20px 24px;
      border-bottom: 1px solid $placeholder-text;

      & > .iconfont {
        font-size: 36px;
        color: $secondary-text;
      }

      &-content {
        flex: 1;
        margin-left: 30px;
      }

      &-title {
        font-size: $font-medium;
        font-weight: bold;
        line-height: 24px;
        color: $primary-text;
      }

      &-desc {
        font-size: $font-normal;
        color: $secondary-text;
        line-height: 24px;
      }
    }
  }
}
</style>
