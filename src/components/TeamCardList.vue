<template>
  <div id="teamCardList">
    <van-card
        v-for="team in teamList"
        :desc="team.description"
        :title="team.name"
        :thumb="xiaoxin"
    >
      <template #tags>
        <van-tag plain style="color: #ee0a24;margin-right: 8px;margin-top: 8px" type="primary">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
        <van-tag plain style="color: #ff976a;margin-right: 8px; margin-top: 8px" type="primary">
          队长：{{ team.createUser?.username }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
          <span style="padding-left: 10px">
            -- 剩余位置：{{ team.maxNum - team.hasJoinNum == 0 ? '已满员' : team.maxNum - team.hasJoinNum + '人' }}
          </span>
        </div>
        <div>
          <div>
            {{ '创建时间：' + formatTime(team.createTime) }}
          </div>
          <div v-if="team.expireTime">
            {{ '过期时间：' + formatTime(team.expireTime) }}
          </div>
        </div>
      </template>
      <template #footer>
        <div style="margin-left: 7px">
        <span v-for="user of team.memberList?.slice(0, 3)">
          <img :alt="user.username" :src="user.avatarUrl"
               class="usersImgUrl">
        </span>
          <span v-if="team.memberList?.length>3" class="omit">
               ...
          </span>
        </div>
          <van-button class="smaller-button" size="mini" type="default" color="cornflowerblue" icon="eye-o" @click="showTeam(team.id)">查看队伍</van-button>
          <van-button class="smaller-button" v-if="team.userId != currentUser.id && !team.hasJoin" type="success" icon="plus" size="mini" @click="preJoinTeam(team)">加入队伍</van-button>
          <van-button class="smaller-button" v-if="team.userId == currentUser?.id" type="primary" size="mini" icon="replay" @click="doUpdateTeam(team.id)">更新队伍</van-button>
          <van-button class="smaller-button" v-if="team.hasJoin" type="warning" size="mini" icon="close" @click="doQuitTeam(team.id)">退出队伍</van-button>
          <van-button class="smaller-button" v-if="team.userId == currentUser?.id" size="mini" icon="fail" type="danger" @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入队伍密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinTeamCancle">
      <van-field v-model="password" type="password" placeholder="请输入密码" style="margin-left: 88px"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, watchEffect, withDefaults} from "vue";
import {TeamType} from "../models/team";
import xiaoxin from '../assets/xiaoxin.png'
import {teamStatusEnum} from "../constants/team.ts";
import {reqDeleteTeam, reqGetTeamList, reqJoinTeam, reqQuitTeam} from "../api/team";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

//格式化时间
const formatTime = (time: string) => {
  let date = new Date(time);
  let formattedDate = date.getFullYear() + '-' +
      ('0' + (date.getMonth()+1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2) + ':' +
      ('0' + date.getSeconds()).slice(-2);
  return formattedDate;
}

const router = useRouter();

interface teamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<teamCardListProps>(), {
//@ts-ignore
  teamList: [] as TeamType[]
})

//队伍列表
const teamList = ref([] as TeamType[])
watchEffect(() => {
  teamList.value = props.teamList
})
//更新active
const emit =  defineEmits(['updateActive'])

//密码输入框
const showPasswordDialog = ref(false)
const joinTeamId = ref(0);
const password = ref('')

//获取当前用户
const currentUser = ref()
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})


/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async () => {
  if (joinTeamId.value === 0) {
    return;
  }
  const res = await reqJoinTeam(joinTeamId.value, password.value);
  if (res?.code === 0) {
    showSuccessToast("加入队伍成功")
    //更新队伍列表
    const updatedTeamList =  await reqGetTeamList()
    teamList.value = updatedTeamList.data
    //更新active
    emit('updateActive')
    doJoinTeamCancle()
  } else {
    showFailToast('加入队伍失败' + (res.description ? `，${res.description}` : ''));
    doJoinTeamCancle()
  }
}

/**
 * 判断加入的队伍是否需要密码
 * @param team
 */
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id
  if (team.status === 0){
    doJoinTeam()
  }else {
    showPasswordDialog.value = true
  }
}

const doJoinTeamCancle = () => {
  joinTeamId.value = 0;
  password.value = '';
  showPasswordDialog.value = false
}

//更新队伍
const doUpdateTeam = (id: number) => {
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
const doQuitTeam = async (id: number) => {
  const res = await reqQuitTeam(id)
  if (res?.code === 0) {
    showSuccessToast("退出队伍成功")
    //更新队伍列表
    const updatedTeamList =  await reqGetTeamList()
    teamList.value = updatedTeamList.data
    //更新active
    emit('updateActive')
  } else {
    showFailToast('退出队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 删除（解散）队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await reqDeleteTeam(id)
  if (res?.code === 0) {
    showSuccessToast("解散队伍成功")
    //更新队伍列表
    const updatedTeamList =  await reqGetTeamList()
    teamList.value = updatedTeamList.data
    //更新active
    emit('updateActive')
  } else {
    showFailToast('解散队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 查看队伍
 */
const showTeam = (id:number) => {
  router.push({
    path: '/team/show',
    query: {
      teamId: id
    }
  })
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  height: 120px;
  object-fit: unset;
}
.usersImgUrl{
  height: 20px;
  width: 20px;
  float: left;
  margin-left: -5px;
  padding: 2px 0 2px 0;
  border-radius: 55%;
}
.smaller-button{
  font-size: 9px;
  padding: 1px 2px;
  min-width: 15px;
}
</style>
