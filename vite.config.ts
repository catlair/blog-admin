import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ mode }: ConfigEnv): UserConfig => {
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
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [AntDesignVueResolver()],
        dts: pathResolve('types/components.d.ts')
      }),
      PurgeIcons()
    ]
  }
}
