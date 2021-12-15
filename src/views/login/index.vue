<template>
  <div class="relative w-full h-full px-4 login">
    <div class="container relative h-full px-10 py-2 mx-auto">
      <div class="flex h-full wrap">
        <div class="min-h-full pl-4 mr-4 col left">
          <div class="my-auto">
            <img src="@/assets/svg/login-box-bg.svg" alt="alt" class="w-1/2 -mt-12 -enter-x" />
            <div class="mt-10 font-medium -enter-x" style="color: #fff">
              <span class="text-3xl">博客后台管理系统</span>
            </div>
          </div>
        </div>
        <div class="col right h-full py-5 xh:h-auto xl:py-0">
          <div
            class="
              login-form
              relative
              w-full
              px-5
              py-8
              mx-auto
              my-auto
              xl:ml-16 xl:bg-transparent
              sm:px-8
              xl:p-4
              sm:w-3/4
              lg:w-2/4
              xl:w-auto
              enter-x
            "
            style="max-width: 404px"
          >
            <LoginForm></LoginForm>
            <ForgetPasswordForm></ForgetPasswordForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue'
import ForgetPasswordForm from './ForgetPasswordForm.vue'
import { ref, provide } from 'vue'
import { FromTypeEnum } from './types'

const fromStatus = ref(FromTypeEnum.LOGIN)
const updateFromStatus = (type: FromTypeEnum) => {
  fromStatus.value = type
}

provide(fromStatusKey, readonly(fromStatus))
provide(updateFromStatusKey, updateFromStatus)
</script>

<script lang="ts">
import { defineComponent, InjectionKey, readonly, Ref } from 'vue'

type FromStatusType = Ref<FromTypeEnum>
type UpdateFromStatusType = (type: FromTypeEnum) => void

// 可以放在单独的文件中，这里演示一下 vue 中导出
export const fromStatusKey: InjectionKey<FromStatusType> = Symbol()
export const updateFromStatusKey: InjectionKey<UpdateFromStatusType> = Symbol()

export default defineComponent({
  name: 'Login'
})
</script>

<style lang="less">
.login::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -48%;
  background-image: url(@/assets/svg/login-bg.svg);
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
}

.login {
  input:not([type='checkbox']) {
    min-width: 360px;

    @media (max-width: @screen-xl) {
      min-width: 320px;
    }

    @media (max-width: @screen-lg) {
      min-width: 260px;
    }

    @media (max-width: @screen-md) {
      min-width: 240px;
    }

    @media (max-width: @screen-sm) {
      min-width: 160px;
    }
  }

  .wrap {
    .col {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

    .my-auto {
      margin-top: auto;
      margin-bottom: auto;
    }
  }

  .ant-btn-primary {
    color: #fff;
    background-color: #0960bd;

    &:focus {
      color: #fff;
      background-color: #0a6cd5;
    }
  }
}

.btn-w-full {
  width: 100%;
  height: 40px;
}

.ant-form-item-control {
  max-width: 100% !important;
}
</style>
