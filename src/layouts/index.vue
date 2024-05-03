<template>
  <div class="layout">
    <LayoutHeader
      v-show="!meta.hideHeader"
      class="layout-header"
    >
      <MoocHeader />
    </LayoutHeader>
    <LayoutMain class="layout-main" :style="{'margin-top': meta.hideHeader ? 0 : '72px'}" />
    <LayoutFooter v-show="!meta.hideFooter" class="layout-footer">
      <MoocFooter />
    </LayoutFooter>
  </div>
</template>
<script lang="ts" setup name="Layout">
import { defineComponent, provide, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import LayoutHeader from './header/index.vue'
import LayoutMain from './main/index.vue'
import MoocFooter from '@/components/footer/index.vue'
import LayoutFooter from './footer/index.vue'
import MoocHeader from '@/components/header/index.vue'
const { meta } = toRefs(useRoute())
const searchKeyword = ref('')

provide('searchKeyword', { searchKeyword })

defineComponent({
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutFooter,
    MoocHeader,
    MoocFooter
  }
})
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  $header-height: 72px;
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    &-header {
      z-index: 1;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      height: $header-height;
      background-color: #fff;
      box-shadow: $box-shadow-normal;
    }
    &-main {
      z-index: 0;
      flex: auto;
    }
    &-footer {
      height: 130px;
      background-color:$theme-dark;
      overflow: hidden;
    }
  }
</style>
