<template>
  <div id="index">
    <div class="header-box">
      <van-sticky>
        <span class="title">伙伴匹配系统</span>
      </van-sticky>
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
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const loading = ref<boolean>(false)

const userList = ref([])

const isMatchMode = ref<boolean>(false)


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


</style>



