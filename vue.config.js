module.exports = {
  lintOnSave: false ,
  //使用antdesign自定义主题运行项目时报错 Inline JavaScript is not enabled. Is it set in your options?
  css:{
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
          'font-size-base':'7px',
        },
        javascriptEnabled: true,
      }
    }
  }
}
