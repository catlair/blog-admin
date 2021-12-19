<template>
  <FormTitle v-if="isShow"></FormTitle>
  <a-form
    ref="formRef"
    name="forget"
    v-if="isShow"
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
        v-model:value="formState.password"
        placeholder="新密码"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback name="email" class="enter-x">
      <a-input
        size="large"
        v-model:value.trim="formState.email"
        placeholder="邮箱"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item name="code" class="enter-x">
      <span class="inline-flex w-full" style="justify-content: space-between">
        <a-input
          size="large"
          v-model:value="formState.code"
          placeholder="验证码"
          autocomplete="off"
          style="min-width: unset"
        >
        </a-input>
        <span class="table-cell ml-2">
          <a-button style="height: 40px" @click="getCode" :disabled="!!wiatInputCode.time">
            {{ wiatInputCode.time ? `${wiatInputCode.time}秒后重新获取` : '获取验证码' }}
          </a-button>
        </span>
      </span>
    </a-form-item>
    <a-form-item class="enter-x">
      <a-button type="primary" class="btn-w-full" html-type="submit"> 重置 </a-button>
      <a-button html-type="reset" class="mt-4 btn-w-full" @click="clickHandle">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import FormTitle from './FormTitle.vue'
import { isEmail } from '@/utils/is'
import { message } from 'ant-design-vue/es'
import { emailCodeApi, passResetApi } from '@/api/user'

const formRef = ref()
const sendCodeFlag = ref(false)
const formState: UnwrapRef<FormState> = reactive({
  username: '',
  email: '',
  password: '',
  code: ''
})
const wiatInputCode = reactive({
  time: 0,
  timer: null as any
})
const updateFromStatus = inject(updateFromStatusKey)
const fromStatus = inject(fromStatusKey)

const isShow = computed(() => {
  return fromStatus?.value === FromTypeEnum.FORGET_PASSWORD
})

const rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 20, message: '请输入6-20位密码' },
    { pattern: /\w/, message: '密码必须包含字母、数字、下划线' }
  ],
  email: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
  code: [
    {
      required: true,
      len: 6,
      message: '验证码长度为6位数字',
      trigger: 'blur',
      pattern: /^\d{6}$/
    }
  ],
  username: [
    { min: 3, max: 12, message: '请输入3-12位用户名' },
    { pattern: /[a-zA-Z]/, message: '账号必须包含字母' }
  ]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}
const handleFinish = async (values: FormState) => {
  if (!sendCodeFlag.value) {
    message.warning('请先获取验证码')
    return
  }
  const { msg } = await passResetApi(values)
  if (msg) {
    message.success('重置成功')
  } else {
    message.error('重置失败')
  }
}
const handleFinishFailed = () => {
  message.warn('请检查表单是否填写完整')
}
const clickHandle = () => {
  updateFromStatus?.(FromTypeEnum.LOGIN)
}
const getCode = async () => {
  if (!isEmail(formState.email)) {
    message.warning('请输入正确的邮箱地址')
    return
  }
  sendCodeFlag.value = true
  const { time, timer } = toRefs(wiatInputCode)
  if (timer.value || time.value) {
    return
  }
  time.value = 60
  timer.value = setInterval(() => {
    if (time.value === 1) {
      clearInterval(timer.value)
      timer.value = 0
    }
    time.value--
  }, 1000)
  await emailCodeApi({ to: formState.email })
}
</script>

<script lang="ts">
import { defineComponent, reactive, ref, inject, computed, toRefs } from 'vue'
import type { UnwrapRef } from 'vue'
import { updateFromStatusKey, fromStatusKey } from './index.vue'
import { FromTypeEnum } from './types'

interface FormState {
  username: string
  email: string
  password: string
  code: string
}
export default defineComponent({
  name: 'ForgetPasswordForm'
})
</script>
