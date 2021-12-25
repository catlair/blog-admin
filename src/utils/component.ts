/**
 * 获取 label 配置
 */
export function getLabelOptions(value: any, labelObj: object) {
  return Object.keys(value)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => ({
      value: key,
      label: labelObj[key],
      disabled: false
    }))
}
