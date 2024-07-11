<template>
  <div class="center-align">
    <el-button @click="goBack">
      <el-icon size="24px">
        <Back/>
      </el-icon>
      返回
    </el-button>
    <el-button>
      <el-icon size="24px">
        <Share/>
      </el-icon>
      分享
    </el-button>
  </div>
</template>

<script lang="ts" setup name="HeaderShortCut">
import router from '@/router'
function goBack () {
  router.go(-1)
}
</script>

<style scoped>
@import '~@/assets/styles/responsive.scss';

li {
  padding: 10px;
}

.center-align {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 12px;
  margin-bottom: 20px;
}

</style>
