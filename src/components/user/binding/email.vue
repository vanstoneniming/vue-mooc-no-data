<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="邮箱号" prop="emailAccount">
      <el-input class="emailAccount" v-model="form.emailAccount" placeholder="请输入邮箱账号" clearable/>
    </el-form-item>
    <el-form-item label="验证码" prop="verifyNum">
      <el-input class="verifyNum" v-model="form.verifyNum" placeholder="请输入验证码" clearable/>
      <el-button :disabled="disabled || loading" :loading="loading" @click="sendSmsCode">{{ btnContent }}</el-button>
    </el-form-item>
    <div class="email-submit">
      <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="primary" @click.stop="validateAndSubmit">确定</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { bindEmail, sendEmailVerifyCode } from '@/api/user'
import { ERR_SUCCESS } from '@/api/config'
import { ElMessage } from 'element-plus/lib'
import Schema, { RuleItem } from 'async-validator'

const formRef = ref(null)

const disabled = ref(false)
const loading = ref(false)
const btnContent = ref('获取验证码')
let timer: NodeJS.Timeout | null = null
let isTimerRunning = false // Flag to track whether the timer is currently running

const form = reactive({
  emailAccount: '',
  verifyNum: ''
})

// eslint-disable-next-line no-undef
const props = defineProps(['email', 'hideDialog'])

onMounted(() => {
  form.emailAccount = props.email
})

const rules: { [key: string]: RuleItem[] } = {
  emailAccount: [
    { required: true, message: '请输入邮箱账号', trigger: 'blur', type: 'string' } as RuleItem,
    { type: 'email', message: '请输入正确的电子邮箱账号', trigger: 'blur' } as RuleItem
  ],
  verifyNum: [
    { required: true, message: '请输入验证码', trigger: 'blur', type: 'string' } as RuleItem,
    { len: 4, message: '请输入4位数字的验证码', trigger: 'blur', type: 'string' } as RuleItem
  ]
}

function startTimer () {
  let count = 5
  isTimerRunning = true // Set the flag to indicate that the timer is running
  timer = setInterval(() => {
    if (count <= 0) {
      clearInterval(timer!)
      timer = null
      btnContent.value = '获取验证码'
      isTimerRunning = false // Reset the flag when the timer is stopped
      return
    }
    btnContent.value = `${count} 秒后重新获取`
    count--
  }, 1000)
}

function sendSmsCode () {
  const validator = new Schema({
    emailAccount: rules.emailAccount
  })

  validator.validate({ emailAccount: form.emailAccount }, async (errors) => {
    if (!errors) {
      const { code, message } = await sendEmailVerifyCode({ email: form.emailAccount })
      if (code === ERR_SUCCESS) {
        ElMessage.success(message)
      } else {
        ElMessage.error(message)
      }
      if (isTimerRunning) {
        return
      }
      // Simulate sending SMS code
      loading.value = true
      disabled.value = true
      setTimeout(() => {
        loading.value = false
        btnContent.value = '180 秒重新获取'
        disabled.value = false
        startTimer()
      }, 1000) // Simulate 3 seconds for SMS code to be sent
    } else {
      // Handle validation errors
      ElMessage.error(errors[0].message)
    }
  })
}

async function validationCode () {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const params = { email: form.emailAccount, email_verify_code: form.verifyNum }
  try {
    const validator = new Schema(rules)

    await validator.validate(form, async (errors) => {
      if (!errors) {
        const { code, message } = await bindEmail(params)
        if (code === ERR_SUCCESS) {
          ElMessage.success(message)
          props.hideDialog()
        } else {
          ElMessage.error(message)
        }
      } else {
        // Handle validation errors
        ElMessage.error(errors[0].message)
      }
    })
  } catch (error) {
    ElMessage.error('请正确填写相关字段信息!')
  }
}

function validateAndSubmit () {
  validationCode()
}

function cancel () {
  if (timer) {
    clearInterval(timer)
    isTimerRunning = false
  }
  props.hideDialog()
}
</script>

<style scoped>
.emailAccount {
  width: 274px;
}

.verifyNum {
  width: 160px;
}

.el-button {
  margin-left: 10px;
}

:deep(.email-submit) {
  display: flex;
  justify-content: center;
}

</style>
