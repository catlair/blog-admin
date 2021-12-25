## Failed to load source map for

更新依赖以后 vite 会卡很久

https://github.com/nuxt/vite/issues/198

暂时没有好的解决办法

```javascript
optimizeDeps: {
  exclude: [
    'ant-design-vue',
    '@vueuse/core',
    '@iconify/vue',
    '@vueuse/shared',
    '@ant-design/icons-vue',
    'vue',
    'vue-router',
    'axios',
    'pinia',
    'qs',
    'lodash-es',
    'vditor',
    'dayjs',
    'vue-types',
    'sortablejs',
    'resize-observer-polyfill',
    'nprogress'
  ]
}
```
