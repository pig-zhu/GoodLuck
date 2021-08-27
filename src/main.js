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
import { getUuid } from '@/utils/util'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'

Vue.config.productionTip = false
// if (process.env.NODE_ENV === "development") {
//   var ws = new WebSocket('ws://localhost:8001');
// } else {
//   var ws = new WebSocket('ws://120.26.52.177:8001');
// }
var ws = new WebSocket('ws://120.26.52.177:8001');
if(window.WebSocket){
  ws.onopen = function(e){
      console.log("连接服务器成功");
	  let socketId = getUuid()
      ws.send("首次连接, 我的唯一id:" + socketId);
      Vue.prototype.$socket = ws
      Vue.prototype.$socketId = socketId
  }
  ws.onclose = function(e){
	  ws.send('close,id:' + Vue.prototype.$socketId)
      console.log("服务器关闭");
  }
  ws.onerror = function(){
	  Vue.prototype.$socketId
      console.log("连接出错");
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
