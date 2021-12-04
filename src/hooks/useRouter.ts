import { PageEnum } from '@/enums/pageEnum'
import { isString } from '@/utils/is'
import { RouteLocationRaw, Router, useRouter } from 'vue-router'
import { unref } from 'vue'

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }

function handleError(e: Error) {
  console.error(e)
}

export function useGo(_router?: Router) {
  const router = _router || useRouter()
  const { push, replace } = _router || unref(router)
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    } else {
      const o = opt as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}
