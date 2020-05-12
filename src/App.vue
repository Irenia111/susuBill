<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script >

  export default {
    name: 'App',
    mounted() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      // We listen to the resize event
      window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01
        //console.log(vh);
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })

if(document.documentElement.clientWidth>800){
  this.$router.push('/qrcode');
}
    }
  }

</script>

<style lang="scss">
  @import '../src/assets/style';
  /*@import "../src/assets/style/helper.scss";
  /*引入全局的设计主题文件*/
  /*@import "../src/assets/style/reset.scss";
  /*引入全局的reset*/

  body{
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
