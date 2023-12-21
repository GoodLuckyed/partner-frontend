<template>
  <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称',user.username)"/>
  <van-cell title="账户" is-link :value="user.userAccount"/>
  <van-cell title="头像" is-link @click="toEdit('avatarUrl','头像',user.avatarUrl)">
    <img style="height: 48px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
  <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
  <van-cell title="星球编号" is-link :value="user.planetCode"/>
  <van-cell title="创建时间" is-link :value="user.createTime"/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {onMounted, ref} from "vue";
import myAxios from "../utils/request";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
const router = useRouter();
const user = ref({})
// const user = {
//   id: '1',
//   username: '小黑子',
//   userAccount: 'dogYuYan',
//   avatarUrl: 'http://t15.baidu.com/it/u=1155900523,2163568117&fm=224&app=112&f=JPEG?w=500&h=500',
//   gender: '男',
//   phone: '19938874583',
//   email: '111222@qq.com',
//   planetCode: '123',
//   createTime: new Date()
// }

onMounted(async () => {
  user.value = await getCurrentUser();
})
const toEdit = (editKey:string,editName:string,currentValue:string) => {
  router.push({
    path:'/user/edit',
    query:{
      editKey,
      editName,
      currentValue
    }
  })
}

</script>

<style scoped>

</style>
