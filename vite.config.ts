import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { viteMockServe } from 'vite-plugin-mock'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY } = viteEnv

  return {
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      // 监听所有本地 ip （不仅仅是 127.0.0.1）
      host: true,
      port: VITE_PORT,
      // 加载环境变量设置代理
      proxy: createProxy(VITE_PROXY),
      strictPort: true
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/design/config.less')}";`
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [AntDesignVueResolver(), ElementPlusResolver()],
        dts: pathResolve('types/components.d.ts')
      }),
      PurgeIcons(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ]
  }
}
