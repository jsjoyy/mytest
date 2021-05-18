// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)
const plugins = [
  [
    '@babel/plugin-syntax-dynamic-import'
  ],
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    // 'vant',
    '@babel/plugin-syntax-dynamic-import'
  ]
]

if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', {useBuiltIns: 'usage', corejs: 3}]],
  plugins
}
