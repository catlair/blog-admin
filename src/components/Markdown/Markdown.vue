<template>
  <div ref="wrapRef"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, unref } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const wrapRef = ref<ElRef>(null)
const props = defineProps<{ value: string }>()
const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'update:value', value: string): void
}>()
const vditor = ref<Vditor>()

function init() {
  vditor.value = new Vditor(unref(wrapRef)!, {
    height: 490,
    mode: 'sv',
    toolbarConfig: {
      pin: true
    },
    cache: {
      enable: false
    },
    fullscreen: {
      index: 999999
    },
    preview: {
      delay: 200,
      actions: []
    },
    input: (v) => {
      emit('change', v)
      emit('update:value', v)
    },
    after() {
      vditor.value!.setValue(props.value)
    },
    ...props
  })
}

onMounted(() => {
  init()
})

defineExpose({
  vditor
})
</script>
