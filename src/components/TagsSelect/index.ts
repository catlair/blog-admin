import TagsSelect from './TagsSelect.vue'
import { createAsyncComponent } from '@/utils/factory/asyncComponent'

const TagsSelectAsync = createAsyncComponent(() => import('./TagsSelect.vue'))

export { TagsSelect, TagsSelectAsync }
