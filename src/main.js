// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './routers'
import store from './pages/vuex/store.js'

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = true

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


