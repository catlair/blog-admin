<template>
  <FormTitle v-show="isShow"></FormTitle>
  <a-form
    ref="formRef"
    name="login"
    v-show="isShow"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item name="username" class="enter-x">
      <a-input
        size="large"
        v-model:value.trim="formState.username"
        placeholder="账号"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item name="password" class="enter-x">
      <a-input
        size="large"
        visibilityToggle
        v-model:value="formState.password"
        placeholder="密码"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item class="enter-x">
      <a-row>
        <a-col :span="12">
          <a-checkbox v-model="checked" name="remenber">记住我</a-checkbox>
        </a-col>
        <a-col :span="12" style="text-align: right">
          <a-button type="link" class="pr-0">
            <a @click.stop="clickForget">忘记密码？</a>
          </a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item class="enter-x">
      <a-button type="primary" html-type="submit" class="btn-w-full">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import FormTitle from './FormTitle.vue'
import { useUserStore } from '@/store/user'
import { message } from 'ant-design-vue/es'

const userStore = useUserStore()

const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  password: '',
  username: ''
})
const updateFromStatus = inject(updateFromStatusKey)
const fromStatus = inject(fromStatusKey)
const checked = ref(true)
const isShow = computed(() => {
  return fromStatus?.value === FromTypeEnum.LOGIN
})

const validatePass = async (_rule: RuleObject, value: string) => {
  if (value.length < 6 || value.length > 20) {
    return Promise.reject('请输入6-20位密码')
  }
  if (!/\w/.test(value)) {
    return Promise.reject('密码必须包含字母、数字、下划线')
  }
  return Promise.resolve()
}
const validateUsername = async (_rule: RuleObject, value: string) => {
  if (value.length < 3 || value.length > 12) {
    return Promise.reject('请输入3-12位用户名')
  }
  if (!/[a-zA-Z]/.test(value)) {
    return Promise.reject('账号必须包含字母')
  }
  return Promise.resolve()
}

const rules = {
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
  username: [{ required: true, validator: validateUsername, trigger: 'change' }]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}
const handleFinish = async (values: FormState) => {
  userStore.login(values)
}
const handleFinishFailed = () => {
  message.warn('请检查输入是否正确')
}
const clickForget = () => {
  updateFromStatus?.(FromTypeEnum.FORGET_PASSWORD)
}
</script>

<script lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form'
import { defineComponent, reactive, ref, inject, computed } from 'vue'
import type { UnwrapRef } from 'vue'
import { updateFromStatusKey, fromStatusKey } from './index.vue'
import { FromTypeEnum } from './types'

interface FormState {
  password: string
  username: string
}
export default defineComponent({
  name: 'LoginForm'
})
</script>
