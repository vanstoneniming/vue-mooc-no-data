<template>
  <div class="donate-container">
    <el-card style="max-width: 360px">
      <template #header>
        <div class="card-header">
          <h5 v-if="selectedAmount">捐赠：<span>{{ selectedAmount }}元</span></h5>
          <h5 v-else>选择捐赠金额</h5>
        </div>
      </template>
      <div class="amount-buttons">
        <el-button v-for="amount in donationAmounts" :key="amount"
                   :type="selectedAmount === amount ? 'primary' : 'success'"
                   @click="setDonateAmount(amount)">{{ amount }} 元
        </el-button>
      </div>
      <div class="payment-qrcode">
        <div v-if="paymentQRCode">
          <div v-if="paymentStatus === 1" class="payment-status">
           <div><i class="iconfont icon-zhifuchenggong"></i></div>
            <div><span>支付成功！谢谢您的捐赠！</span></div>
          </div>
          <div v-else class="qr-img">
            <img :src="paymentQRCode" alt="Payment QR Code">
            <h6>
              <i class="iconfont icon-weixin"></i>
              <span>请使用微信扫描码支付</span>
            </h6>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="bottom-right">
          捐赠本站能使本站发展更长久！
        </div>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { checkPaymentStatus, getDonationQR } from '@/api/user'
import { ERR_SUCCESS } from '@/api/config'
import { onUnmounted, ref, watch } from 'vue'

const donationAmounts = [0.01, 10, 20, 30, 50, 100, 200, 500]
const selectedAmount = ref<number>(0.01)
const paymentQRCode = ref<string>('')
const paymentStatus = ref<number>(0)
const paymentId = ref<string>('')

let pollingInterval: number | null = null

const checkPaymentStatusAPI = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const response = await checkPaymentStatus({ donate_id: paymentId.value })
    if (response.code === ERR_SUCCESS) {
      paymentStatus.value = response.result.pay_status // 假设后端返回了支付状态
    }
  } catch (error) {
    console.error('Error checking payment status: ', error)
  }
}

const startPollingPaymentStatus = () => {
  if (!pollingInterval) {
    pollingInterval = setInterval(checkPaymentStatusAPI, 7000)
  }
}

const stopPollingPaymentStatus = () => {
  if (pollingInterval !== null) {
    clearInterval(pollingInterval)
    pollingInterval = null
  }
}

const fetchQR = async () => {
  try {
    const params = { fee: selectedAmount.value, title: '捐赠课·视频网站' }
    const { code, result } = await getDonationQR(params)
    if (code === ERR_SUCCESS) {
      paymentQRCode.value = result.QRcode_url
      paymentId.value = result.donate_id
      startPollingPaymentStatus()
    }
  } catch (error) {
    console.error('Error fetching payment QR code:', error)
  }
}

const setDonateAmount = (amount: number) => {
  if (selectedAmount.value !== amount) {
    stopPollingPaymentStatus()
    selectedAmount.value = amount
    paymentStatus.value = 0
    fetchQR()
  }
}

onUnmounted(() => {
  stopPollingPaymentStatus()
})

watch(selectedAmount, fetchQR, { immediate: true })
watch(paymentStatus, (newValue) => {
  if (newValue === 1) stopPollingPaymentStatus()
})

</script>

<style scoped>
.donate-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.el-card .el-button {
  width: 60px;
  margin: 5px;
}

.card-header {
  display: flex;
  justify-content: center;
}

.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
}

.payment-qrcode {
  display: flex;
  justify-content: center;
  justify-items: center;
  height: 300px;
}

.qr-img {
  text-align: center;
  background-color: #09BB07;
  color: white;
  width: 300px;
  height: 300px;
}

.qr-img img {
  width: 200px;
  margin: 30px;
}

.qr-img i {
  margin-right: 10px;
}

.payment-status {
  text-align: center;
  margin-top: 50px;
  height: 300px;
  justify-content: center;
  justify-items: center;
  color: #09BB07;
}

.payment-status i {
  font-size: 100px;
  color: #09BB07;
}

.bottom-right {
  text-align: center;
  font-size: 14px;
  color: #888;
}
</style>
