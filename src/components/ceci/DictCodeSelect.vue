<template>
  <el-select v-model="currentValue" :multiple="multiple" :placeholder="placeholder" clearable filterable>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'DictCodeSelect',
  props: {
    modelValue: {
      type: [String, Number, Array, Object], // 允许任何类型，因为v-model可以绑定任何类型
      default: () => null
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      currentValue: this.modelValue
    }
  },
  watch: {
    currentValue (newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 160px;
  margin: 10px;
}
</style>
