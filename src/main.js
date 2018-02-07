// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入了base64处理函数atob():base64解码 btoa():base64编码
import App from './App'
import router from './routers'
import store from './pages/vuex/store'
import loadingplugin from './util/global/loadingplugin'

console.log("%c _   _ ____ _____ ____   ____                            _____ \n" +
  "| | | / ___|_   _/ ___| |  _ \\ _ __ __ _  __ _  ___  _ _|_   _|__  __ _ _ __ ___\n" +
  "| | | \\___ \\ | || |     | | | | '__/ _` |/ _` |/ _ \\| '_ \\| |/ _ \\/ _` | '_ ` _ \\\n" +
  "| |_| |___) || || |___  | |_| | | | (_| | (_| | (_) | | | | |  __/ (_| | | | | | |\n" +
  " \\___/|____/ |_| \\____| |____/|_|  \\__,_|\\__, |\\___/|_| |_|_|\\___|\\__,_|_| |_| |_|\n" +
  "                                         |___/ alpha 1.2版. Powered by 科大软院 DragonTeam.", "color:rgb(18,143,205);font-weight:bold;");

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

Vue.use(loadingplugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})