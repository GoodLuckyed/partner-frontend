<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
      :desc="`简介：${user.profile}`"
      :title="`${user.username}`"
  >
    <template #thumb>
      <van-image
          round
          width="4rem"
          height="4rem"
          :src="user.avatarUrl"
      />
    </template>
    <template #tags>
      <van-tag :color="tagColor[index]" round type="primary" size="medium" v-for="(tag,index) in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" style="position:relative; bottom: 25px;border: none;color: #007acc" @click="toChat(user)">打招呼</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {defineProps, ref, withDefaults} from "vue";
import {UserType} from "../models/user";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const tagColor = ref([
    //定义七种颜色
    '#3286A0',
    '#845EC2',
    '#D65DB1',
    '#FF6F91',
    '#FF9671',
    '#FFC75F',
])

interface UserCardListProps{
  userList:UserType[],
  loading:boolean
}

//@ts-ignore
const props = withDefaults(defineProps<UserCardListProps>(),{
  userList:[] as UserType[],
  loading:false
})

//跳转到聊天页面
const toChat = (user:UserType) => {
  router.push({
    path:'/public_chat',
    query:{
      id:user.id,
      username:user.username,
      userType:1
    }
  })
}

</script>

<style scoped>
.van-card{
  border-radius: 15px;
  background-color: #ffffff;
  margin-bottom: 10px;
  height: 100px;
}

</style>
