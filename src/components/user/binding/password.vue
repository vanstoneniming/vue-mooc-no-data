<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="原始密码" prop="oldPass">
      <el-input v-model="form.oldPass" placeholder="请输入原始密码" show-password clearable type="password"/>
    </el-form-item>
    <el-form-item label="新设密码" prop="newPass">
      <el-input v-model="form.newPass" placeholder="请输入新密码" show-password clearable type="password"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPass">
      <el-input v-model="form.confirmPass" placeholder="请再次输入新密码" show-password clearable type="password"/>
    </el-form-item>
    <div class="phone-submit">
      <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="primary" @click.stop="handleSubmit">确定</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, Ref, ref } from 'vue'
import { modifyPassword } from '@/api/user'
import { ERR_SUCCESS } from '@/api/config'
import { ElMessage } from 'element-plus/lib'
import { UserInfo } from '@/types'
import store from '@/store'
const formRef: Ref<null | { validate: () => Promise<boolean>; clearValidate: () => void }> = ref(null)

// eslint-disable-next-line no-undef
const props = defineProps(['hideDialog'])
const form = reactive({
  oldPass: '',
  newPass: '',
  confirmPass: ''
})

function validateConfirmPass (rule: any, value: string, callback: (arg0: Error | undefined) => void) {
  if (value !== form.newPass) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback(undefined)
  }
}

const rules = {
  oldPass: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
  newPass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
  ],
  confirmPass: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validateConfirmPass, trigger: 'blur' }
  ]
}

const userInfo = computed<UserInfo>(() => {
  return store.getters.userInfo
})

onMounted(() => formRef.value?.clearValidate())
async function handleSubmit () {
  try {
    await formRef.value?.validate()
    const params = { id: userInfo.value.id, oldPass: form.oldPass, password: form.newPass }
    const { code, message } = await modifyPassword(params)
    if (code === ERR_SUCCESS) {
      ElMessage.success(message + '，请用新密码登录。')
      props.hideDialog()
      setTimeout(async () => {
        await store.dispatch('user/logout')
      }, 3000)
    } else {
      ElMessage.error(message)
    }
  } catch (error) {
    ElMessage.error('请正确填写相关字段信息!')
  }
}

function cancel () {
  props.hideDialog()
}

</script>

<style scoped>
.el-button {
  margin-left: 10px;
}

:deep(.phone-submit) {
  display: flex;
  justify-content: center;
}
</style>
