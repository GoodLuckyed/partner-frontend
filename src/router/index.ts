import * as VueRouter from 'vue-router'
import Index from '../pages/IndexPage.vue'
import TeamPage from '../pages/team/TeamPage.vue'
import UserPage from "../pages/user/UserPage.vue";
import UserUpdatePage from '../pages/user/UserUpdatePage.vue'
import UserTeamJoinPage from '../pages/user/UserTeamJoinPage.vue'
import UserTeamCreatePage from '../pages/user/UserTeamCreatePage.vue'
import SearchPage from '../pages/SearchPage.vue'
import UserEditPage from '../pages/user/UserEditPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import UserLoginPage from '../pages/user/UserLoginPage.vue'
import TeamAddPage from '../pages/team/TeamAddPage.vue'
import TeamUpdatePage from '../pages/team/TeamUpdatePage.vue'
import TeamShowPage from "../pages/team/TeamShowPage.vue";
import NoticeDetailPage from '../pages/notice/NoticeDetailPage.vue'
import NoticeEditPage from '../pages/notice/NoticeEditPage.vue'
import NoticeAddPage from '../pages/notice/NoticeAddPage.vue'
import PostAddPage from '../pages/post/PostAddPage.vue'
import PostDetailPage from "../pages/post/PostDetailPage.vue";
import PostEditPage from "../pages/post/PostEditPage.vue";
import SearchPostResultPage from '../pages/SearchPostResultPage.vue';
import ChatPage from "../components/Chat.vue";
import UserDetailPage from "../pages/user/UserDetailPage.vue";
import MyFollowPage from "../pages/me/MyFollowPage.vue";
import MyFansPage from "../pages/me/MyFansPage.vue";
import MyPostPage from "../pages/me/MyPostPage.vue";
import UserUpdatePassword from "../pages/user/UserUpdatePassword.vue";
//@ts-ignore
const router = VueRouter.createRouter({
    //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            component: Index,
            meta: {
                title: "首页"
            }
        },
        {
            path: '/team',
            component: TeamPage,
            meta: {
                title: "找队伍"
            }
        },
        {
            path: '/public_chat',
            component: ChatPage,
            meta: {
                title: "聊天室"
            }
        },
        {
            path: '/user',
            component: UserPage,
            meta: {
                title: "个人信息"
            }
        },
        {
            path: '/user/detail',
            component: UserDetailPage,
            meta: {
                title: "用户详情页"
            }
        },
        {
            path: '/user/update',
            component: UserUpdatePage,
            meta: {
                title: '更新个人信息'
            }
        },
        {
            path: '/user/update/password',
            component: UserUpdatePassword,
            meta: {
                title: '更新密码'
            }
        },
        {
            path: '/user/team/join',
            component: UserTeamJoinPage,
            meta: {
                title: '已加入队伍'
            }
        },
        {
            path: '/user/team/create',
            component: UserTeamCreatePage,
            meta: {
                title: '已创建队伍'
            }
        },
        {
            path: '/search',
            component: SearchPage,
            meta: {
                title: '找伙伴'
            }
        },
        {
            path: '/user/edit',
            component: UserEditPage,
            meta: {
                title: '编辑个人信息'
            }
        },
        {
            path: '/user/list',
            component: SearchResultPage,
            meta: {
                title: '用户列表'
            }
        },
        {
            path: '/user/login',
            component: UserLoginPage,
            meta: {
                title: "登录"
            }
        },
        {
            path: "/team/add",
            component: TeamAddPage,
            meta: {
                title: '创建队伍'
            }
        },
        {
            path: "/team/update",
            component: TeamUpdatePage,
            meta: {
                title: '更新队伍'
            }
        },
        {
            path: "/team/show",
            component: TeamShowPage,
            meta: {
                title: '查看队伍'
            }
        },
        {
            path: '/notice/detail',
            component:NoticeDetailPage,
            meta:{
                title:'公告详情'
            }
        },
        {
            path: '/notice/update',
            component:NoticeEditPage,
            meta:{
                title:'更新公告'
            }
        },
        {
            path: '/notice/add',
            component:NoticeAddPage,
            meta:{
                title:'添加公告'
            }
        },
        {
            path: '/post/add',
            component:PostAddPage,
            meta:{
                title:'发布帖文'
            }
        },
        {
            path: '/post/detail',
            component:PostDetailPage,
            meta:{
                title:'帖文详情'
            }
        },
        {
            path: '/post/edit',
            component:PostEditPage,
            meta:{
                title:'帖文编辑'
            }
        },
        {
            path: '/post/search',
            component:SearchPostResultPage,
            meta:{
                title:'帖文搜索'
            }
        },
        {
            path: '/my/follow',
            component: MyFollowPage,
            meta:{
                title:'我的关注'
            }
        },
        {
            path: '/my/fans',
            component: MyFansPage,
            meta:{
                title:'我的粉丝'
            }
        },
        {
            path: '/my/post',
            component: MyPostPage,
            meta:{
                title:'我的帖文'
            }
        },
    ]
})


export default router;

