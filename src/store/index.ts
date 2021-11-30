import { createPinia } from 'pinia'
// import { useStorage } from '@vueuse/core'

const pinia = createPinia()
// const state = useStorage('piniaState', {})
// 给 pinia 赋予初值
// pinia.state.value = state.value

export default pinia
export { pinia }
