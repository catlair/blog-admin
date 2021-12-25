/**
 * 获取父级路径
 */
export function getParentPath(path: string) {
  // return path.split('/').slice(0, -1).join('/')
  const matchArray = path.match(/^\/[^\/]*/) || []
  return matchArray[0] || ''
}

/**
 * 空函数
 */
export const noop = () => {}

/**
 * 字符串转时间戳
 */
export function string2Stamp(str: string) {
  try {
    return new Date(str).getTime()
  } catch (error) {
    return 0
  }
}

/**
 * 时间字符串排序
 */
export function sortTime(a: string, b: string, order: 'ascend' | 'descend' = 'ascend') {
  const aStamp = string2Stamp(a)
  const bStamp = string2Stamp(b)
  if (order === 'ascend') {
    return aStamp - bStamp
  } else {
    return bStamp - aStamp
  }
}
