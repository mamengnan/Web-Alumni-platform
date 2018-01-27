// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 开发环境下使用vue.js,部署时配置vue.min.js
import App from './App'
import router from './routers'
import store from './pages/vuex/store.js'

console.log("%c _   _ ____ _____ ____   ____                            _____ \n" +
  "| | | / ___|_   _/ ___| |  _ \\ _ __ __ _  __ _  ___  _ _|_   _|__  __ _ _ __ ___\n" +
  "| | | \\___ \\ | || |     | | | | '__/ _` |/ _` |/ _ \\| '_ \\| |/ _ \\/ _` | '_ ` _ \\\n" +
  "| |_| |___) || || |___  | |_| | | | (_| | (_| | (_) | | | | |  __/ (_| | | | | | |\n" +
  " \\___/|____/ |_| \\____| |____/|_|  \\__,_|\\__, |\\___/|_| |_|_|\\___|\\__,_|_| |_| |_|\n" +
  "                                         |___/ Release 0.0.1. Powered by 科大软院 DragonTeam.", "color:rgb(18,143,205);font-weight:bold;");

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

Vue.use(VueResource);

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