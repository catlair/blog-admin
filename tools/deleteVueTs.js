const path = require('path')
const fs = require('fs')

/**
 * 遍历所有文件，排除指定文件夹, 并打印文件路径
 * @param {String} dirPath 文件夹路径
 * @param {Array<string>} excludeDir 排除的文件夹
 * @returns {Array<string>} 文件路径数组
 */
function readDirExclude(dirPath, excludeDir) {
  let files = fs.readdirSync(dirPath)
  let result = []
  files.forEach((file) => {
    let filePath = path.join(dirPath, file)
    let stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      if (excludeDir.indexOf(file) === -1) {
        result = result.concat(readDirExclude(filePath, excludeDir))
      }
    } else {
      result.push(filePath)
    }
  })
  return result
}

/**
 * 删除路径数组中带有关键字的文件, 并打印删除的文件路径
 * @param {Array<string>} filePaths 文件路径数组
 * @param {String} key 关键字
 * @returns {Array<string>} 文件路径数组
 */
function deleteFile(filePaths, key) {
  let result = []
  filePaths.forEach((filePath) => {
    if (filePath.indexOf(key) === -1) {
      result.push(filePath)
    } else {
      fs.unlinkSync(filePath)
      console.log(`删除文件: ${filePath}`)
    }
  })
  return result
}

/**
 * 如果路径数组中存在 .vue.ts 文件，且 .vue 存在，则删除 .vue.ts
 * @param {Array<string>} filePaths 文件路径数组
 * @returns {Array<string>} 文件路径数组
 */
function deleteVueTs(filePaths) {
  let result = []
  filePaths.forEach((filePath) => {
    if (filePath.indexOf('.vue.ts') !== -1) {
      let tsPath = filePath.replace('.vue.ts', '.vue')
      if (filePaths.indexOf(tsPath) !== -1) {
        fs.unlinkSync(tsPath)
        console.log(`删除文件: ${tsPath}`)
      }
    }
    result.push(filePath)
  })
  return result
}

// 操作
deleteVueTs(deleteFile(readDirExclude('./src', ['node_modules', '.git']), '__VLS_'))
