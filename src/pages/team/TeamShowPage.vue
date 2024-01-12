<template>
  <van-sticky>
    <van-nav-bar
        title="查看队伍"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <div class="center">
    <img :alt="team?.name" class="teamImg" :src="xiaoxin">
  </div>
  <van-divider>{{ team?.name }}</van-divider>
  <van-cell :value="team?.name" center icon="award-o">
    <template #title>
      <span class="custom-title">队伍名称</span>
    </template>
  </van-cell>
  <van-cell :value="team?.id" center icon="points">
    <template #title>
      <span class="custom-title">队伍ID</span>
    </template>
  </van-cell>
  <van-cell :value="team?.hasJoinNum + '/' + team?.maxNum" center icon="friends-o">
    <template #title>
      <span class="custom-title">队伍人数</span>
    </template>
  </van-cell>
  <van-cell :value="team?.createUser?.username" center icon="manager-o">
    <template #title>
      <span class="custom-title">队长</span>
    </template>
  </van-cell>
  <van-cell :value="team?.description" center icon="label-o">
    <template #title>
      <span class="custom-title">队伍描述</span>
    </template>
  </van-cell>
  <van-cell is-link center icon="chat-o">
    <template #title>
      <span class="custom-title">队伍聊天室</span>
    </template>
  </van-cell>

  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" content-position="left">队员</van-divider>
  <UserCardList :userList="team?.memberList"></UserCardList>
</template>


<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqGetTeamInfoById} from "../../api/team";
import {showFailToast} from "vant";
import xiaoxin from '../../assets/xiaoxin.png';
import UserCardList from "../../components/UserCardList.vue";

const router = useRouter()
const route = useRoute();
const teamId = Number(route.query.teamId);
const team = ref();

onMounted( () => {
  getTeamInfo();
})

//根据teamId获取队伍信息
const getTeamInfo = async () => {
  const res = await reqGetTeamInfoById(teamId)
  if (res.code == 0){
    team.value = res.data;
    //将tags转换为js数组
    if (team.value.memberList){
      team.value.memberList.forEach(user => {
        if (user.tags){
          user.tags = JSON.parse(user.tags)
        }
      })
    }
  }else {
    showFailToast('获取队伍信息失败，请稍后重试')
  }
}

//返回上一级菜单
const onClickLeft = () => {
  router.back()
}

</script>


<style scoped>
.teamImg{
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
  border-radius: 20%;
  height: 135px;
  width: 135px;
  margin-left: 118px;
  margin-top: 10px;
}
</style>
