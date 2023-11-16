<template>
  <UserCardList :userList="userList"></UserCardList>
  <van-empty v-if="!userList || userList.length < 1" description="暂无数据" />
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import myAxios from "../utils/request.ts";
import qs from "qs";
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const {tags} = route.query;

const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend',{
    params:{
      currentPage:1,
      pageSize:4
    }
  })
      .then(function (response) {
        showSuccessToast('请求成功');
        return response.data;
      })
      .catch(function (error) {
        showFailToast('请求失败')
      })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
})

</script>

<style scoped>

</style>



