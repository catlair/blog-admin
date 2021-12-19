<template>
  <a-radio-group :value="value" @update:value="updateValue">
    <a-radio-button v-for="option in options" :value="option.value" :key="option.value.toString()">
      {{ option.label }}
    </a-radio-button>
  </a-radio-group>
</template>

<script lang="ts">
import { propTypes } from '@/utils/propTypes'
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    value: propTypes.string.isRequired,
    options: propTypes.arrayOf(
      propTypes.shape({
        value: propTypes.oneOfType([String]),
        label: propTypes.oneOfType([String])
      })
    ).isRequired
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const updateValue = (value: string) => {
      emit('update:value', value)
    }
    return {
      ...toRefs(props),
      updateValue
    }
  }
})
</script>
