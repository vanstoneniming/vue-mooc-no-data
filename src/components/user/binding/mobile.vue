<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="手机号" prop="phoneNum">
      <el-input class="phoneNum" v-model="form.phoneNum" placeholder="请输入手机号码" clearable/>
    </el-form-item>
    <el-form-item label="验证码" prop="verifyNum">
      <el-input class="verifyNum" v-model="form.verifyNum" placeholder="请输入验证码" clearable/>
      <el-button :disabled="disabled || loading" :loading="loading" @click="sendSmsCode">{{ btnContent }}</el-button>
    </el-form-item>
    <div class="phone-submit">
      <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="primary" @click.stop="validateAndSubmit">确定</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { bindMobile, sendPhoneVerifyCode } from '@/api/user'
import { ERR_SUCCESS } from '@/api/config'
import { ElMessage } from 'element-plus/lib'
import Schema from 'async-validator'

const formRef = ref(null)

const disabled = ref(false)
const loading = ref(false)
const btnContent = ref('获取验证码')
let timer: NodeJS.Timeout | null = null
let isTimerRunning = false

const form = reactive({
  phoneNum: '',
  verifyNum: ''
})

// eslint-disable-next-line no-undef
const props = defineProps(['hideDialog', 'mobile'])
onMounted(() => { form.phoneNum = props.mobile })

const rules = reactive({
  phoneNum: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  verifyNum: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{4}$/, message: '请输入4位数字的验证码', trigger: 'blur' }
  ]
})

function startTimer () {
  let count = 10
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

async function sendSmsCode () {
  const validator = new Schema({
    phoneNum: rules.phoneNum
  })

  try {
    await validator.validate({ phoneNum: form.phoneNum })
    // Proceed with sending SMS code
    await sendPhoneVerifyCode({ mobile: form.phoneNum })
    if (isTimerRunning) {
      return
    }
    loading.value = true
    disabled.value = true
    setTimeout(() => {
      loading.value = false
      btnContent.value = '180 秒重新获取'
      disabled.value = false
      startTimer()
    }, 1000)
  } catch (error) {
    ElMessage.error('请正确填写手机号码！')
  }
}

async function validateAndSubmit () {
  const validator = new Schema(rules)

  try {
    await validator.validate(form)
    // Proceed with form submission logic...
    const { code, message } = await bindMobile({
      mobile: form.phoneNum,
      // eslint-disable-next-line @typescript-eslint/camelcase
      mobile_verify_code: form.verifyNum
    })
    if (code === ERR_SUCCESS) {
      ElMessage.success(message)
      props.hideDialog()
    } else {
      ElMessage.error(message)
    }
  } catch (error) {
    ElMessage.error('请正确填写相关字段信息!')
  }
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
.phoneNum {
  width: 274px;
}

.verifyNum {
  width: 160px;
}

.el-button {
  margin-left: 10px;
}

:deep(.phone-submit) {
  display: flex;
  justify-content: center;
}

</style>
