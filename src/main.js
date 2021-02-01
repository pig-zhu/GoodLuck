// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import moment from 'moment'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'

Vue.config.productionTip = false
var ws = new WebSocket('ws://localhost:8001');
if(window.WebSocket){
  ws.onopen = function(e){
      console.log("连接服务器成功");
      ws.send("connection1");
      Vue.prototype.$socket = ws
  }
  ws.onclose = function(e){
      console.log("服务器关闭");
  }
  ws.onerror = function(){
      console.log("连接出错");
  }

  ws.onmessage = function(e){
      console.log("收到消息："+e.data)
  }
}
window.onbeforeunload = function() {
  ws.close();
}

Vue.prototype.$moment = moment
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
