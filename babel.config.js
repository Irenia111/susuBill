module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
    //antdesign的配置
  plugins: [
      [
        "import",
       { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
       ]
  ]
}
