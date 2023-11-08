<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username}（${user.planetCode}）`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="无搜索结果" />
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import myAxios from "../utils/request.ts";
import qs from "qs";
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'

const route = useRoute();

const {tags} = route.query;

const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        showSuccessToast('请求成功');
        return response.data;
      })
      .catch(function (error) {
        showSuccessToast('请求失败')
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



