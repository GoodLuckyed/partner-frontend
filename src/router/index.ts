import * as VueRouter from 'vue-router'
import Index from '../pages/IndexPage.vue'
import TeamPage from '../pages/TeamPage.vue'
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from '../pages/UserUpdatePage.vue'
import UserTeamJoinPage from '../pages/UserTeamJoinPage.vue'
import UserTeamCreatePage from '../pages/UserTeamCreatePage.vue'
import SearchPage from '../pages/SearchPage.vue'
import UserEditPage from '../pages/UserEditPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import UserLoginPage from '../pages/UserLoginPage.vue'
import TeamAddPage from '../pages/TeamAddPage.vue'
import TeamUpdatePage from '../pages/TeamUpdatePage.vue'
//@ts-ignore
const router = VueRouter.createRouter({
    //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            component: Index,
            meta:{
                title:"首页"
            }
        },
        {
            path: '/team',
            component: TeamPage,
            meta:{
                title:"找队伍"
            }
        },
        {
            path: '/user',
            component: UserPage,
            meta:{
                title:"个人信息"
            }
        },
        {
            path: '/user/update',
            component: UserUpdatePage,
            meta:{
                title: '更新个人信息'
            }
        },
        {
            path: '/user/team/join',
            component: UserTeamJoinPage,
            meta:{
                title: '已加入队伍'
            }
        },
        {
            path: '/user/team/create',
            component: UserTeamCreatePage,
            meta:{
                title: '已创建队伍'
            }
        },
        {
            path: '/search',
            component: SearchPage,
            meta:{
                title: '找伙伴'
            }
        },
        {
            path: '/user/edit',
            component: UserEditPage,
            meta:{
                title: '编辑个人信息'
            }
        },
        {
            path: '/user/list',
            component: SearchResultPage,
            meta:{
                title: '用户列表'
            }
        },
        {
            path:'/user/login',
            component:UserLoginPage,
            meta:{
                title:"登录"
            }
        },
        {
            path:"/team/add",
            component:TeamAddPage,
            meta:{
                title: '创建队伍'
            }
        },
        {
            path:"/team/update",
            component:TeamUpdatePage,
            meta:{
                title: '更新队伍'
            }
        }
    ]
})


export default router;

