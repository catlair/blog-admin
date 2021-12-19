<template>
  <template v-for="tag in tags" :key="tag">
    <a-tooltip v-if="tag.length > maxLength" :title="tag">
      <a-tag :closable="closable" @close="handleClose(tag)">
        {{ `${tag.slice(0, maxLength)}...` }}
      </a-tag>
    </a-tooltip>
    <a-tag v-else :closable="closable" @close="handleClose(tag)">
      {{ tag }}
    </a-tag>
  </template>
  <a-input
    v-if="inputVisible"
    ref="inputRef"
    v-model:value="inputValue"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
    <plus-outlined />
    {{ newTag }}
  </a-tag>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, nextTick } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { propTypes } from '@/utils/propTypes'

interface StateType {
  inputVisible: boolean
  inputValue: string
}

export default defineComponent({
  components: {
    PlusOutlined
  },
  props: {
    maxLength: propTypes.number.def(10),
    closable: propTypes.bool.def(true),
    newTag: propTypes.string.def('new Tag'),
    tags: propTypes.arrayOf(String).def([])
  },
  emits: ['update:tags'],
  setup(props, { emit }) {
    const inputRef = ref()
    const state = reactive<StateType>({
      inputVisible: false,
      inputValue: ''
    })
    const updateTags = (v: string[]) => emit('update:tags', v)

    const handleClose = (removedTag: string) => {
      const tags = props.tags.filter((tag) => tag !== removedTag)
      updateTags(tags)
    }

    const showInput = () => {
      state.inputVisible = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }

    const handleInputConfirm = () => {
      const inputValue = state.inputValue
      let tags = props.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      updateTags(tags)

      Object.assign(state, {
        inputVisible: false,
        inputValue: ''
      })
    }
    return {
      ...toRefs(state),
      ...toRefs(props),
      handleClose,
      showInput,
      handleInputConfirm,
      inputRef
    }
  }
})
</script>
