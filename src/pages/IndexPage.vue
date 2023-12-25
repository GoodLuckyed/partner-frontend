<template>
  <div id="index">
    <div class="header-box">
      <van-sticky @scroll="onChange">
        <div :class="stickyColor">
          <div class="title">伙伴匹配系统</div>
          <div class="search">
            <van-popover placement="bottom-end" v-model:show="showSearchSelect" theme="dark" :actions="actions">
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
      <van-cell center title="心动匹配">
        <template #right-icon>
          <van-switch v-model="isMatchMode" />
        </template>
      </van-cell>
      <UserCardList :userList="userList" :loading="loading"></UserCardList>
      <van-empty v-if="!userList || userList.length < 1" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import myAxios from "../utils/request.ts";
import {showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const loading = ref<boolean>(false)

const userList = ref([])

const isMatchMode = ref<boolean>(false)
const showSearchSelect = ref<boolean>(false) //点击搜索图标时，显示搜索选项
const handleScroll = ref() //获取滚动元素
const stickyColor = ref('cust-navbar')
const actions = ref([
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' },
])

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

const loadData = async () => {
  loading.value = true;
  let userListData;
  //心动模式，根据标签匹配用户
  if (isMatchMode.value){
    const num = 10;
    userListData = await myAxios.get("/user/match",{
      params:{
        num
      }
    })
        .then(function (response) {
          // showSuccessToast('请求成功');
          return response.data;
        })
        .catch(function (error) {
          showFailToast('请求失败')
        })
  }else {
    //普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend',{
      params:{
        currentPage:1,
        pageSize:4
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
    userList.value = userListData;
  }
  loading.value = false;
}

onMounted(() => {
  loadData();
})

watch(isMatchMode,() => {
  loadData();
})
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
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
.cust-navbar {
}
.cust-navbar-change {
  position: relative;
  padding: 48px 10px 16px 10px;
  background-color: #0095db;
}
</style>



