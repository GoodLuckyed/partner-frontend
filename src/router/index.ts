import * as VueRouter from 'vue-router'
import Index from '../pages/IndexPage.vue'
import Team from '../pages/TeamPage.vue'
import User from '../pages/UserPage.vue'
import SearchPage from '../pages/SearchPage.vue'
import UserEditPage from '../pages/UserEditPage.vue'
import SearchResult from '../pages/SearchResultPage.vue'
import UserLogin from '../pages/UserLoginPage.vue'

//@ts-ignore
const router = VueRouter.createRouter({
    //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/team',
            component: Team
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/search',
            component: SearchPage
        },
        {
            path: '/user/edit',
            component: UserEditPage
        },
        {
            path: '/user/list',
            component: SearchResult
        },
        {
            path:'/user/login',
            component:UserLogin
        }
    ]
})


export default router;

