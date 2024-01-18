<template>
  <div id="index">
    <div class="header-box">
      <van-sticky @scroll="onChange">
        <div :class="stickyColor">
          <div class="title">伙伴匹配系统</div>
          <div class="search">
            <van-popover placement="bottom-end" v-model:show="showSearchSelect" :actions="actions" @select="onSelect">
              <template #reference>
                <svg t="1703486602000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4262" width="32" height="32"><path d="M937.798221 769.855766 714.895525 546.869159c23.821545-45.681412 37.589107-97.495498 37.589107-152.564721 0-182.559872-148.560524-331.078441-331.079464-331.078441-182.623317 0-331.098907 148.517545-331.098907 331.078441 0 182.559872 148.47559 331.078441 331.098907 331.078441 60.575634 0 117.27089-16.647145 166.206416-45.221948L807.552831 900.100132c17.938558 17.939581 41.551348 26.867928 65.12423 26.867928s47.182602-8.928347 65.123206-26.867928c17.396205-17.396205 27.033703-40.550555 27.033703-65.164139C964.831924 810.321386 955.194426 787.16806 937.798221 769.855766M133.027248 394.304438c0-158.989037 129.34795-288.358477 288.378943-288.358477 158.948105 0 288.3595 129.36944 288.3595 288.358477 0 99.206466-50.437739 186.899714-126.950344 238.795665-1.044796 0.416486-1.876744 1.252527-2.877537 1.835811-45.515636 30.03813-99.999528 47.727001-158.530596 47.727001C262.375198 682.662915 133.027248 553.336454 133.027248 394.304438M907.594315 869.896226c-19.273972 19.191084-50.562583 19.191084-69.836555 0L623.6995 655.797034c26.157753-20.274766 49.186236-44.305065 68.292386-71.421656l215.601406 215.683271c9.344832 9.262968 14.518668 21.694091 14.518668 34.877345S916.939147 860.551394 907.594315 869.896226" fill="#000000" p-id="4263"></path><path d="M215.169059 387.79007c0 0 42.156122-211.011878 234.186693-224.946238C449.355753 162.843832 185.944458 131.555222 215.169059 387.79007" fill="#000000" p-id="4264"></path>
                </svg>
              </template>
            </van-popover>
          </div>
        </div>
      </van-sticky>
      <div class="swipe-box" ref="handleScroll">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" touchable>
          <van-swipe-item>
            <img src="../assets/1.jpg" alt="" style="height: 144px; width: 339px;">
          </van-swipe-item>
          <van-swipe-item >
            <img src="../assets/2.jpg" alt="" style="height: 144px; width: 339px;">
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="content-box">
      <div class="cust-van-tabs" style="padding: 0 10px">
        <van-tabs v-model:active="activeName" sticky swipeable offset-top="64" animated @change="onChangeTab">
          <van-tab title="官方公告" name="notice">
            <div class="notice">
              <NoticeCardList :noticeList="noticeList"></NoticeCardList>
            </div>
          </van-tab>
          <van-tab title="推荐队友" name="recommend">
            <div class="cust-recommend">
              <div class="recommend-switch">
                <van-cell center>
                  <template #title>
                    <svg t="1703559841938" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10215" width="18" height="18"><path d="M882.607224 620.289332c-32.233122-46.50108-75.778894-81.46643-126.399805-101.611236 22.323425-15.70468 41.104163-36.645618 54.679343-61.067844 15.711843-28.26781 24.01802-60.572564 24.01802-93.420693 0-102.397135-79.284741-185.704492-176.739307-185.704492-13.83817 0-25.097608 11.258415-25.097608 25.097608 0 13.855566 11.259438 25.128307 25.097608 25.128307 69.742411 0 126.482693 60.775178 126.482693 135.478578 0 74.719772-56.739259 135.50723-126.482693 135.50723-13.83817 0-25.097608 11.265578-25.097608 25.112957l0 0.1361c0 13.855566 11.259438 25.128307 25.097608 25.128307 125.46348 0 227.536226 108.816335 227.536226 242.568594 0 13.872962 11.285021 25.159006 25.157983 25.159006 13.83817 0 25.097608-11.286044 25.097608-25.159006C935.958316 730.243583 917.509129 670.644183 882.607224 620.289332z" p-id="10216" fill="#1296db"></path><path d="M623.157147 577.673745c-26.348088-18.662035-55.000662-33.399691-85.316108-43.895743 64.020082-38.906102 103.316064-108.150162 103.316064-183.412286 0-118.333082-96.263437-214.604706-214.588333-214.604706-118.358665 0-214.649731 96.271624-214.649731 214.604706 0 40.289612 11.282974 79.585593 32.630165 113.642247 18.054191 28.803 42.605354 52.879348 71.567989 70.318532-30.826076 10.523681-59.94937 25.424042-86.697571 44.369533-29.125341 20.629853-54.761208 45.569872-76.194356 74.126254-44.566008 59.375296-68.122517 130.018216-68.122517 204.28978 0 13.83817 11.258415 25.097608 25.097608 25.097608 13.855566 0 25.128307-11.259438 25.128307-25.097608 0-77.456093 30.202882-150.434198 85.043908-205.489094 54.711066-54.924937 127.125329-85.206614 203.921389-85.283362 2.535753 0.225127 5.117554 0.047072 7.631818-0.515746l1.991354-0.446162c74.719772 1.51347 144.95337 31.659047 198.329021 85.261872 54.815443 55.04978 85.003999 128.013559 85.003999 205.448162 0 13.83817 11.272741 25.097608 25.128307 25.097608 13.83817 0 25.097608-11.259438 25.097608-25.097608 0-74.271564-23.556509-144.913461-68.121494-204.28978C677.918355 623.243617 652.282488 598.303598 623.157147 577.673745zM426.56877 186.002274c90.629113 0 164.362418 73.733305 164.362418 164.363442 0 90.638323-73.733305 164.378791-164.362418 164.378791-90.647533 0-164.393117-73.740468-164.393117-164.378791C262.17463 259.735579 335.921237 186.002274 426.56877 186.002274z" p-id="10217" fill="#1296db"></path></svg>
                    <span>智能匹配</span>
                  </template>
                  <template #right-icon>
                    <van-switch v-model="isMatchMode" />
                  </template>
                </van-cell>
              </div>
              <div class="recommend-partner">
                <van-list
                    v-model:loading="userLoading"
                    :finished="userFinished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                >
                  <UserCardList :userList="userList" :loading="loading"></UserCardList>
                </van-list>
                <van-back-top right="20px" bottom="60px"/>
                <van-empty v-if="!userList || userList.length < 1" description="暂无数据" />
              </div>
            </div>
          </van-tab>
          <van-tab title="热门帖文" name="post">
            <div class="post">
              <van-list
                  v-model:loading="postLoading"
                  :finished="postFinished"
                  finished-text="没有更多了"
                  @load="postOnLoad"
                  :immediate-check="false"
              >
              <PostCardList :postList="postList"></PostCardList>
              </van-list>
              <van-back-top right="20px" bottom="60px"/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
  <van-button v-if="activeName == 'notice' && currentUser.userRole == 1"
              @click="toNoticeAdd"
              icon="plus"
              type="primary"
              style="position: fixed;bottom: 100px;left: 300px;border-radius: 50%;width: 50px;height: 50px;z-index: 10"/>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import myAxios from "../utils/request.ts";
import {showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";
import NoticeCardList from "../components/NoticeCardList.vue";
import PostCardList from "../components/PostCardList.vue";
import {reqGetNoticeList} from "../api/notice";
import {NoticeType} from "../models/notice";
import {getCurrentUser} from "../services/user.ts";
import { useRouter } from "vue-router";
import {PostType} from "../models/post";
import {reqPostList} from "../api/post";


const router = useRouter();

const loading = ref<boolean>(false)
const userLoading = ref<boolean>(false)
const userFinished = ref<boolean>(false)
const currentPage = ref(1)
const postCurrentPage = ref(1)
const postFinished = ref<boolean>(false)
const postLoading = ref<boolean>(false)
const userList = ref([])

const isMatchMode = ref<boolean>(false)
const showSearchSelect = ref<boolean>(false) //点击搜索图标时，显示搜索选项
const handleScroll = ref() //获取滚动元素
const stickyColor = ref('cust-navbar') //顶部颜色
const actions = ref([
  { text: '搜索用户',icon:'friends-o' },
  { text: '搜索帖文',icon:'label-o'},
])
const activeName = ref('recommend') //当前选中的tab
const noticeList = ref<NoticeType[]>([]) // 公告列表
const postList = ref<PostType[]>([]) //帖文列表
//获取当前用户
const currentUser = ref()
onMounted(async () => {
  loadData();
  currentUser.value = await getCurrentUser();
  // 确保页面加载完成后再调用 onChange
  await nextTick();
  onChange();
})

//下拉加载更多
const onLoad =async () => {
  currentPage.value++;
  await loadData();
  userLoading.value = false;
};

const postOnLoad = async () => {
  postCurrentPage.value++
  const res = await reqPostList(postCurrentPage.value);
  if (res.code == 0){
    postList.value = [...postList.value,...res.data.records];
  }
    postLoading.value = false;
  if (!res.data.records || res.data.records.length < 10){
    postFinished.value = true;
  }
}

//跳转到公告添加页面（仅管理员可操作）
const toNoticeAdd = () => {
  router.push({
    path: '/notice/add'
  })
}
//当页面滚动时，判断头部背景颜色是否需要更改
const onChange = () => {
  requestAnimationFrame(() => {
    const h = handleScroll.value.getBoundingClientRect().top;
    if (h < 64) {
      stickyColor.value = 'cust-navbar-change';
    } else {
      stickyColor.value = 'cust-navbar';
    }
  });
};

//当tab切换时触发,加载数据
const onChangeTab = async (name:string) => {
  if (name == 'notice'){
   const res = await reqGetNoticeList();
   if (res.code == 0){
      noticeList.value = res.data;
   }else {
     showFailToast('加载公告失败')
   }
  }
  if (name == 'recommend'){
    loadData();
  }
  if (name == 'post'){
    postCurrentPage.value = 1;
    postList.value = []
    const res = await reqPostList(postCurrentPage.value);
    if (res.code == 0){
      postList.value = res.data.records;
    }else {
      showFailToast('加载帖文失败')
    }
  }
}

const loadData = async () => {
  loading.value = true;
  let userListData;
  //心动模式，根据标签匹配用户
  if (isMatchMode.value){
    userList.value = [];
    currentPage.value = 1;
    const num = 10;
    userListData = await myAxios.get("/user/match",{
      params:{
        num
      }
    })
        .then(function (response) {
          // showSuccessToast('请求成功');
          userFinished.value = true;
          return response.data;
        })
        .catch(function (error) {
          showFailToast('请求失败')
        })
  }else {
    userFinished.value = false;
    //普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend',{
      params:{
        currentPage:currentPage.value,
        pageSize:10
      }
    })
        .then(function (response) {
          // showSuccessToast('请求成功');
          return response.data;
        })
        .catch(function (error) {
          showFailToast('请求失败')
        })
  }
  if (userListData) {
    userListData.forEach((user:UserType) => {
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = [...userList.value, ...userListData]; // 将新数据添加到现有数据
  }
  // 检查是否所有的数据都已经获取
  if (!userListData || userListData.length < 9) { // 假设每页的大小是10
    userFinished.value = true;
  }

  loading.value = false;
}

watch(isMatchMode,() => {
  loadData();
})

const onSelect = (actions:any) => {
  showSearchSelect.value = false;
  if (actions.text == '搜索用户'){
    router.push({
      path: '/search'
    })
  }
  if (actions.text == '搜索帖文'){
    showSearchSelect.value = false;
    router.push({
      path: '/post/search'
    })
  }
}

</script>

<style scoped>
.header-box{
  width: 100%;
  height: 225px;
  /*渐变色*/
  background: linear-gradient(#0052cc, #007acc, #0095db, #00b4e6);

}
.title{
  font-size: 18px;
  font-family: 黑体;
  color: white;
  position: absolute;
  left: 10px;
  top:24px;
}
.search{
  /*位置靠右*/
  position: absolute;
  right: 10px;
  top: 18px;
}
.swipe-box{
  padding: 65px 18px;
}
.my-swipe{
  border-radius: 20px;
}
.cust-navbar {
}
.cust-navbar-change {
  position: relative;
  padding: 48px 10px 16px 10px;
  background-color: #0095db;
}
.content-box{
  background-color: #eef0f3;
}
.recommend-switch{
  padding: 10px 0;
}
.notice{
  margin-top: 10px;
}
.post{
  margin-top: 10px;
}
</style>



