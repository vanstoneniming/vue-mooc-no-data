<template>

  <div class="footer">

    <slot/>

  </div>
</template>

<style scoped>
/*.footer {
  position: fixed;
    bottom: 0; !* 距离底部 0 像素 *!
  left: 0; !* 如果需要左对齐可以添加这个属性 *!
  width: 100%; !* 宽度100% *!
  justify-content: center; !* 水平居中 *!
  align-items: center; !* 垂直居中 *!
}

div.centered {
  !* 如果你希望按钮在垂直方向也居中，可以设置这个容器的样式 *!
  width: 100%;
  background-color: #73767a;
  align-items: center;
}*/
</style>

<script lang="ts" setup>
import { defineComponent } from 'vue'
defineComponent({
  name: 'LayoutFooter'
})
</script>
