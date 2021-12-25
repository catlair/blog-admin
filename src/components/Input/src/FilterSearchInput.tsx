import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Input, Button } from 'ant-design-vue/es'
import 'ant-design-vue/es/input/style/css'
import 'ant-design-vue/es/button/style/css'
import type { Ref } from 'vue'
import { reactive, nextTick } from 'vue'

type Key = string | number

/**
 * 保存搜索框的值
 * @description 官方的例子中，重置后输入框的值不会清空，这里使用中间变量来保存搜索框的值，在重置后清空
 */
const state = reactive({
  searchText: '' as Key
})

export default (
  { column, clearFilters, confirm, setSelectedKeys }: FilterDropdownProps<any>,
  inputRef: Ref<any>
) => (
  <div style={{ padding: '8px' }}>
    <Input
      ref={inputRef}
      placeholder={`Search ${column.dataIndex}`}
      value={state.searchText}
      style="width: 188px; margin-bottom: 8px; display: block"
      onChange={(e) => onChangeHandle(e, setSelectedKeys)}
      onPressEnter={confirm}
    />
    <Button
      type="primary"
      size="small"
      style="width: 90px; margin-right: 8px"
      onClick={() => confirm()}
    >
      <SearchOutlined />
      搜索
    </Button>
    <Button size="small" style="width: 90px" onClick={() => resetHandle(clearFilters)}>
      重置
    </Button>
  </div>
)

/**
 * 点击重置按钮时，清空搜索框的值
 */
function resetHandle(clearFilters: (() => void) | undefined) {
  clearFilters && clearFilters()
  state.searchText = ''
}

/**
 * 搜索框的值发生变化时，更新 state
 */
function onChangeHandle(e: any, setSelectedKeys: (selectedKeys: string[]) => void) {
  const value = e.target.value || ''
  setSelectedKeys(value ? [e.target.value] : [])
  state.searchText = value
}

/**
 * 自动 foucs 到搜索框
 */
export const filterSearchInputFoucs = (
  visible: boolean,
  titleInput: Ref<{ input: HTMLInputElement } | null>
) => {
  if (visible) {
    // 在组件初始化时，titleInput 为 null
    nextTick(() => {
      setTimeout(() => {
        titleInput.value && titleInput.value.input && titleInput.value.input.focus()
      }, 100)
    })
  }
}
