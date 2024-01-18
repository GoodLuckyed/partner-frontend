<template>
  <van-sticky>
    <van-nav-bar
        title="用户详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-row justify="center">
      <van-image :src="user?.avatarUrl" round width="128" height="128" style="padding-top: 5px"/>
    </van-row>
    <van-cell-group inset style="margin-top: 20px">
      <van-cell title="昵称" :value="user?.username"/>
      <van-cell title="标签">
        <template #value>
          <van-tag v-if="user?.tags?.length > 0" v-for="(tag,index) in user?.tags" :color="tagColor[index]" round style="margin-right: 8px">
            {{ tag }}
          </van-tag>
          <span v-else>该用户暂未填写标签</span>
        </template>
      </van-cell>
      <van-cell title="个性签名">
        <template #value>
          <van-text-ellipsis :content="user?.profile || '该用户暂未填写个人简介'"/>
        </template>
      </van-cell>
      <van-cell title="性别">
        <span v-if="user?.gender===1">男</span>
        <span v-else-if="user?.gender===0">女</span>
        <span v-else-if="user?.gender===2">保密</span>
        <span v-else>该用户暂未填写性别</span>
      </van-cell>
      <!--        <van-cell title="电话" :value="user?.phone"/>-->
      <van-cell title="邮箱" :value="user?.email || '该用户暂未填写邮箱'"/>
    </van-cell-group>
    <div style="margin: 16px">
      <div v-if="user?.id !== currentUser?.id">
        <van-button v-if="user?.isFollow" style="width: 100%" plain round type="primary" color="#c1c1c1"
                    @click="followUser">
          已关注
        </van-button>
        <van-button v-else style="width: 100%" plain round type="primary" @click="followUser">关注</van-button>
        <van-button style="width: 100%;margin-top: 10px" plain round type="primary" @click="toChat">
          私聊
        </van-button>
      </div>
    </div>
  </van-sticky>
</template>


<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqGetUserById} from "../../api/user";
import {UserType} from "../../models/user";
import {getCurrentUser} from "../../services/user.ts";
import {reqFollowUser} from "../../api/follow";

const route = useRoute();
const router = useRouter();
const user = ref<UserType>({} as UserType)
const tagColor = ref([
  //定义七种颜色
  '#3286A0',
  '#845EC2',
  '#D65DB1',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
])

const onClickLeft = () => {
  router.back();
}

const currentUser = ref()
onMounted(async () => {
  await getUserDetail();
  currentUser.value = await getCurrentUser();
})

//获取用户详情信息
const getUserDetail = async () => {
  const res = await reqGetUserById(route.query.id)
  if(res.code == 0){
    if (res.data.tags){
      res.data.tags = JSON.parse(res.data.tags)
    }
    user.value = res.data
  }
}

//关注用户
const followUser = async () => {
  const res = await reqFollowUser(user.value.id)
  if (res.code == 0){
    const res1 = await reqGetUserById(route.query.id)
    if (res1.code == 0){
      user.value.isFollow = res1.data.isFollow
    }
  }
}
//跳转到聊天页面
const toChat = () => {
  router.push({
    path:'/public_chat',
    query:{
      id:user.value.id,
      username:user.value.username,
      userType:1
    }
  })
}

</script>

<style scoped>

</style>
