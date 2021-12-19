<template>
  <a-select
    :value="value"
    @update:value="updateValue"
    mode="tags"
    placeholder="Tags Mode"
    :options="options"
    v-bind="bindOptions"
    @change="handleChange"
  >
  </a-select>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  props: {
    value: propTypes.oneOfType([
      String,
      propTypes.arrayOf(String),
      Number,
      propTypes.arrayOf(Number)
    ]),
    options: propTypes.arrayOf(
      propTypes.shape({
        value: propTypes.oneOfType([String, Number]),
        label: propTypes.oneOfType([String, Number])
      })
    ),
    bindOptions: propTypes.object.def({})
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const handleChange = (value: string[]) => {
      emit('update:value', value)
      emit('change', value)
    }

    const updateValue = (value) => {
      // 提示 props 为 readonly
      // 这样可以保证 value 不会直接被 a-select 更新，而是通过 emit 到父组件来更新
      // 父组件成为唯一数据源
      handleChange(value)
    }

    return {
      ...toRefs(props),
      updateValue,
      handleChange
    }
  }
})
</script>
