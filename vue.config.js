module.exports = {
  lintOnSave: false ,
  publicPath:'./',
  pwa         : {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
    }
  },
  //使用antdesign自定义主题运行项目时报错 Inline JavaScript is not enabled. Is it set in your options?
  css:{
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        modifyVars: {
          'primary-color': '#ff4c00',
          'border-radius-base': '2px',
          'font-size-base':'14px',
          'icon-color': 'inherit',
          'icon-color-hover': 'fade(@black, 75%)',
        },
        javascriptEnabled: true,
      }
    }
  }
}
