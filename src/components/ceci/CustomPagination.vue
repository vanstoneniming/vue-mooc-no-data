<template>
  <div class="pagination">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[12, 24, 36, 48, 60]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 12
    },
    totalItems: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('update:pageSize', val)
    },
    handleCurrentChange (val) {
      this.$emit('update:currentPage', val)
    }
  }
}
</script>
<style scoped>
@import '~@/assets/styles/responsive.scss';

.ceci-list li {
  margin: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: grab;
  height: 100%; /* 让所有的 li 高度自动撑满 */
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>
