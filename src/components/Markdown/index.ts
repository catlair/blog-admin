import Markdown from './Markdown.vue'
import { createAsyncComponent } from '@/utils/factory/asyncComponent'

const MarkdownAsync = createAsyncComponent(() => import('./Markdown.vue'))

export { Markdown, MarkdownAsync }
