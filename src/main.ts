import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from'@/components/Layout.vue'

import MyIcon from'../src/components/MyIcon.vue'

//部分引入ant design的组件
import { Button, Icon, DatePicker,Input, notification } from 'ant-design-vue';
//不引入样式表，依旧无法使用
import 'ant-design-vue/lib/button/style/css'



Vue.config.productionTip = false

Vue.component('Layout',Layout);
Vue.component('MyIcon',MyIcon);

Vue.component(Icon.name,Icon);
Vue.component(Button.name, Button);
Vue.component(DatePicker.name,DatePicker);
Vue.component(Input.name,Input);


new Vue({
  router:router,
  store:store,
  render: h => h(App)
}).$mount('#app')
