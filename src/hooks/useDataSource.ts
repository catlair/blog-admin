import type { Ref } from 'vue'
import { onActivated, ref } from 'vue'

type CallbackType = () => Promise<any>

export function useDataSource<T = any>(fn?: CallbackType) {
  const loading = ref(false)
  const dataSource = ref<T>(null as unknown as T)

  return {
    loading,
    dataSource,
    onActivatedForDataSource: (cb?: CallbackType) => {
      onActivated(() => {
        callHandle(loading, cb || fn)
      })
    }
  }
}

async function callHandle(loading: Ref<boolean>, handleFunction?: CallbackType) {
  if (!handleFunction) {
    return
  }

  loading.value = true
  handleFunction().then(() => {
    loading.value = false
  })
}
