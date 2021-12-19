import { createAsyncComponent } from '@/utils/factory/asyncComponent'
import RadioGroup from './RadioGroup.vue'

const RadioGroupAsync = createAsyncComponent(() => import('./RadioGroup.vue'))

export { RadioGroup, RadioGroupAsync }
