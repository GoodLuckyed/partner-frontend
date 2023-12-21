<template>
  <div id="teamCardList">
  <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      :title="`${team.name}`"
      :thumb="ikun"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">
        {{
           teamStatusEnum[team.status]
        }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{'最大人数' + team.maxNum + '人'}}
      </div>
      <div v-if="team.expireTime">
        {{'过期时间' + team.expireTime}}
      </div>
      <div>
        {{'创建时间' + team.createTime}}
      </div>
    </template>
    <template #footer>
      <van-button type="primary" size="mini" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
      <van-button v-if="team.userId == currentUser?.id" size="mini" @click="doUpdateTeam(team.id)">更新队伍</van-button>
      <van-button  size="mini" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
      <van-button v-if="team.userId == currentUser?.id" size="mini" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
    </template>
  </van-card>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, withDefaults} from "vue";
import {TeamType} from "../models/team";
import ikun from "../assets/ikun.gif";
import {teamStatusEnum} from "../constants/team.ts";
import {reqDeleteTeam, reqJoinTeam, reqQuitTeam} from "../api/team";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

const router = useRouter();

interface teamCardListProps{
  teamList:TeamType[]
}

const props = withDefaults(defineProps<teamCardListProps>(),{
//@ts-ignore
  teamList:[] as TeamType[]
})

//获取当前用户
const currentUser = ref()
onMounted( async () => {
  currentUser.value = await getCurrentUser();
})


//加入队伍
const doJoinTeam = async (id:number) => {
   const res = await reqJoinTeam(id);
  if (res?.code === 0) {
    showSuccessToast("加入队伍成功")
  } else {
    showFailToast('加入队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}

//更新队伍
const doUpdateTeam = (id:number) => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id:number) => {
  const res = await reqQuitTeam(id)
  if (res?.code === 0) {
    showSuccessToast("退出队伍成功")
  } else {
    showFailToast('退出队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 删除（解散）队伍
 * @param id
 */
const doDeleteTeam = async (id:number) => {
  const res = await reqDeleteTeam(id)
  if (res?.code === 0) {
    showSuccessToast("解散队伍成功")
  } else {
    showFailToast('解散队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: cover;
}
</style>
