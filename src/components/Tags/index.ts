import { createAsyncComponent } from '@/utils/factory/asyncComponent'
import Tags from './Tags.vue'

const TagsAsync = createAsyncComponent(() => import('./Tags.vue'))

export { Tags, TagsAsync }
