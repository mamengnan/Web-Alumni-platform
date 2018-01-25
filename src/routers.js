import LoginPage from '@/pages/login.vue'
import MainPage from '@/pages/main.vue'
import RegisterPage from '@/pages/register.vue'
import HomePage from '@/pages/home.vue'


export default new VueRouter({
    // mode: "hash", 在浏览器不支持的情况下会自动转为hash模式
    mode: "history",
    routes: [{
            path: '/',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/main',
            name: 'MainPage',
            component: MainPage,
            name: '',
            children: [{
                path: '',
                component: HomePage,
                meta: [],
            }]
        }, {
            path: '/register',
            name: 'RegisterPage',
            component: RegisterPage
        }
    ]

})