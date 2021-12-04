import Sortable from 'sortablejs'
import { onMounted, Ref } from 'vue'
import { unrefElement } from '@vueuse/core'
import { isNumber, isString } from '@/utils/is'

export type OptionsType = Sortable.Options & { level?: number; selector?: string }
export type SortableEvent = Sortable.SortableEvent

/**
 *
 * @param element ref 获取的dom元素
 * @param options Sortable 的配置
 * @param level
 * @returns
 */
export function useSortable(element: Ref<HTMLElement | null>, options?: OptionsType) {
  const level = (options?.level || options?.selector) ?? 0
  const el = unrefElement(element)
  if (!el) {
    console.warn('useSortable: element is null')
    return
  }

  let temp
  if (isNumber(level)) {
    temp = el?.children[0]
    for (let index = 1; index < level; index++) {
      temp = temp?.children[0]
    }
  }

  if (isString(level)) {
    temp = el.querySelector(level)
  }

  temp = (temp || el)!

  return Sortable.create(temp as HTMLElement, options)
}

export function useSortableOnMount(element: Ref<HTMLElement | null>, options?: OptionsType) {
  onMounted(() => {
    useSortable(element, options)
  })
}
