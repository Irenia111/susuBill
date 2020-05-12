import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// @ts-ignore
import store from "./store/index.js";

import MyIcon from'../src/components/MyIcon.vue';
// @ts-ignore
import VeLine from 'v-charts/lib/line.common';

//部分引入ant design的组件
import { Button, Icon, DatePicker,Input,message, Modal} from 'ant-design-vue';
//不引入样式表，依旧无法使用
import 'ant-design-vue/lib/button/style/css'





Vue.config.productionTip = false


Vue.component('MyIcon',MyIcon);

Vue.component(VeLine.name, VeLine)

Vue.component(Icon.name,Icon);
Vue.component(Button.name, Button);
Vue.component(DatePicker.name,DatePicker);
Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker);

Vue.component(Input.name,Input);
Vue.component(Modal.name,Modal);

Vue.prototype.$message = message;




new Vue({
  router:router,
  // @ts-ignore
  store:store,
  render: h => h(App)
}).$mount('#app')
