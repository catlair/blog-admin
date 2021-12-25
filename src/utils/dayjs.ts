import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // import locale

dayjs.locale('zh-cn') // use locale

export default dayjs

export const format = 'YYYY-MM-DD HH:mm:ss'

/**
 * @description: 格式化时间
 */
export function formatDate(date: string | number | Date, formatStr: string = format) {
  return dayjs(date).format(formatStr)
}
