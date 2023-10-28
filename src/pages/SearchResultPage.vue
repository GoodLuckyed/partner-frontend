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
</template>

<script setup>
import { useRoute } from "vue-router";
import {ref} from "vue";
const route = useRoute();

const { tags } = route.query;

const MockUser = {
  id:10,
  username:'张三',
  userAccount:'666',
  profile:'我是一名程序员',
  avatarUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtZtT354mDGUxrzHBfFY7tJgvjIz_fyekbNA&usqp=CAU',
  gender:0,
  phone:'19890965439',
  email:'123@qq.com',
  planetCode:'1234',
  userRole:0,
  tags:['java','python','打工仔','emo中'  ],
  createTime:new Date(),
}

const userList = ref([MockUser])



</script>

<style scoped>

</style>



