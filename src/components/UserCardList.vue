<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
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
  </van-skeleton>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import {UserType} from "../models/user";

interface UserCardListProps{
  userList:UserType[],
  loading:boolean
}

//@ts-ignore
const props = withDefaults(defineProps<UserCardListProps>(),{
  userList:[] as UserType[],
  loading:false
})


</script>

<style scoped>

</style>
