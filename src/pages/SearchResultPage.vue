<template>
    <van-sticky>
      <van-nav-bar
          title="搜索结果"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
    </van-sticky>
    <UserCardList :userList="userList"></UserCardList>
    <van-empty v-if="!userList || userList.length < 1" description="无搜索结果" />
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted} from "vue";
import myAxios from "../utils/request.ts";
import qs from "qs";
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import UserCardList from "../components/UserCardList.vue";
import {reqGetUsers} from "../api/user/index.ts";

const router = useRouter();
const route = useRoute();

const {tags} = route.query;

const userList = ref([])

const username = route.query.searchText

onMounted(async () => {
  let userListData;
   userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        // showSuccessToast('请求成功');
        return response.data;
      })
      .catch(function (error) {
        showFailToast('请求失败')
      })

  if(username){
    const res = await reqGetUsers(username);
    if (res.code == 0){
      userListData = res.data;
    }
  }

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
})

const onClickLeft = () => {
  router.back();
}
</script>

<style scoped>

</style>



