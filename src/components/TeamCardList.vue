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
    </template>
  </van-card>
  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import {TeamType} from "../models/team";
import ikun from "../assets/ikun.gif";
import {teamStatusEnum} from "../constants/team.ts";
import {reqJoinTeam} from "../api/team";
import {showFailToast, showSuccessToast} from "vant";

interface teamCardListProps{
  teamList:TeamType[]
}

const props = withDefaults(defineProps<teamCardListProps>(),{
//@ts-ignore
  teamList:[] as TeamType[]
})

//加入队伍
const doJoinTeam = async (id:string) => {
   const res = await reqJoinTeam(id);
  if (res?.code === 0) {
    showSuccessToast("加入队伍成功")
  } else {
    showFailToast('加入队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: cover;
}
</style>
