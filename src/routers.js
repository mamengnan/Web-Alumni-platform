import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexPage from '@/pages/index.vue'


export default new Router({
    mode: "history",
    routes: [{
        path: '/',
        name: 'IndexPage',
        component: IndexPage
    }]

})