<template>
  <a-form
    ref="formRef"
    name="login"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    @reset="handleReset"
  >
    <a-form-item
      name="title"
      label="标题"
      labelAlign="left"
      :labelCol="{ span: 2, offset: 0 }"
      :wrapperCol="{ span: 22 }"
      required
    >
      <a-input v-model:value="formState.title" autocomplete="off"></a-input>
    </a-form-item>
    <a-form-item name="content" :wrapperCol="fullCol">
      <MarkdownAsync ref="markdownRef" v-model:value="formState.content" />
    </a-form-item>
    <a-form-item name="category" label="分类" required>
      <a-select
        v-model:value="formState.category"
        style="width: 120px"
        :loading="loadStatus.category"
        :options="options.categories"
      ></a-select>
    </a-form-item>
    <a-form-item name="tags" label="标签">
      <TagsSelectAsync
        style="width: 40%"
        v-model:value="formState.tags"
        placeholder="请输入标签"
        :bind-options="{ size: 'large', loading: loadStatus.tags }"
        :options="options.tags"
      ></TagsSelectAsync>
    </a-form-item>
    <a-form-item name="status" label="状态">
      <RadioGroupAsync
        v-model:value="formState.status"
        :options="
          isAuthor
            ? statusOptions
            : statusOptions.map((op) => ({
                ...op,
                disabled: op.value === 'PUBLISHED'
              }))
        "
      />
    </a-form-item>
    <a-form-item name="visibility" label="可见性">
      <RadioGroupAsync v-model:value="formState.visibility" :options="visibilityOptions" />
    </a-form-item>
    <a-form-item name="isTop" label="置顶" v-if="isAdmin">
      <a-switch v-model:checked="formState.isTop">
        <template #checkedChildren><check-outlined /></template>
        <template #unCheckedChildren><close-outlined /></template>
      </a-switch>
    </a-form-item>
    <a-form-item style="margin-bottom: 0" :wrapperCol="fullCol">
      <a-space :size="20" class="float-right">
        <a-button html-type="reset">重置</a-button>
        <a-button type="primary" html-type="submit">{{ isEdit ? '保存' : '发布' }}</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue/es'
import Vditor from 'vditor'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { createArticleApi, getArticleContextApi, updateArticleApi } from '@/api/article'
import { useStorage } from '@vueuse/core'
import { MarkdownAsync } from '@/components/Markdown'
import { TagsSelectAsync } from '@/components/TagsSelect'
import { RadioGroupAsync } from '@/components/RadioGroup'
import {
  visibilityOptions,
  statusOptions,
  initFormState,
  FormState,
  setFormState
} from './ArticleEditorOptions'
import { cloneDeep } from 'lodash-es'
import { ArticleStatusEnum, ArticleVisibilityEnum } from '@/enums/articleEnum'
import { useUserStore } from '@/store/user'
import { useArticleStore } from '@/store/article'
import { CreateArticleParms } from '@/api/model/articleModel'
import { isArray } from '@/utils/is'

const props = withDefaults(
  defineProps<{
    type: 'edit' | 'post'
  }>(),
  {
    type: 'post'
  }
)
const markdownRef = ref<{ vditor: Vditor }>()
const isEdit = props.type === 'edit'
const successMessage = isEdit ? '文章编辑成功' : '文章发布成功'
const errorMessage = isEdit ? '文章编辑失败' : '文章发布失败'
const initFormStateData = ref(initFormState)

const { userInfo } = useUserStore()
const formRef = ref()
const formState = isEdit
  ? initFormStateData
  : useStorage('article-form', cloneDeep(initFormStateData.value))
const isAdmin = userInfo.roles.includes('admin')
const isAuthor = userInfo.roles.includes('author')

const fullCol = { span: 24, offset: 0 }
const rules = {
  title: [{ required: true, message: '请输入标题', whitespace: true }],
  content: [{ require: true, message: '请输入内容' }]
}
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
}
let _id = useRoute().params.id as string
if (_id) {
  if (isArray(_id)) {
    _id = _id[0]
  }
}

const handleReset = () => {
  formState.value = initFormStateData.value
  !isEdit && window.localStorage.removeItem('article-form')
  formRef.value.resetFields()
}
/**
 * 新建文章
 */
const handleFinish = async (values: FormState) => {
  const params = {} as CreateArticleParms
  values.title = values.title.trim()
  Object.assign(params, values)
  params.status = ArticleStatusEnum[values.status] ?? ArticleStatusEnum.DRAFT
  params.visibility = ArticleVisibilityEnum[values.visibility] ?? ArticleVisibilityEnum.PUBLIC
  params.isTop = isAdmin ? values.isTop : false

  try {
    isEdit ? await updateArticleApi(_id, params) : await createArticleApi(params)
    message.success(successMessage)
    handleReset()
    // 用于清空编辑器内容
    markdownRef.value!.vditor.setValue('')

    try {
      await getArticlesAction()
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    message.error(errorMessage)
    console.error(error)
  }
}

const handleFinishFailed = () => {
  message.warn('请检查输入是否正确')
}

/**
 * 编辑模式下，获取文章内容
 */
const getArticleContext = () => {
  if (!isEdit) return
  if (_id) {
    getArticleContextApi(_id)
      .then((res) => {
        initFormStateData.value = setFormState(res)
        try {
          // 避免编辑器切换为空
          markdownRef.value && markdownRef.value.vditor.setValue(res.content)
        } catch {}
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

/**
 * 数据初始化
 */
type OptionType = {
  value: string
}

const options = reactive<{
  categories: OptionType[]
  tags: OptionType[]
}>({
  categories: [],
  tags: []
})
const loadStatus = reactive({
  category: true,
  tags: true
})

const { getCategories, getTags, getArticlesAction } = useArticleStore()

onMounted(async () => {
  getArticleContext()
  try {
    loadStatus.category = true
    const categories = await getCategories()
    options.categories = categories.map((item) => ({
      value: item.name
    }))
    loadStatus.category = false
  } catch (error) {
    console.warn(error)
  }

  try {
    loadStatus.tags = true
    const tags = await getTags()
    options.tags = tags.map((item) => ({
      value: item.name
    }))
    loadStatus.tags = false
  } catch (error) {
    console.warn(error)
  }
})
</script>
