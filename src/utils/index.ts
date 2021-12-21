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
