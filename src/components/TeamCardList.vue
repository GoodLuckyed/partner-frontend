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
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId != currentUser.id && !team.hasJoin" type="primary" size="mini" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userId == currentUser?.id" size="mini" @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.hasJoin" size="mini" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId == currentUser?.id" size="mini" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinTeamCancle">
      <van-field v-model="password" type="password" placeholder="请输入密码" label="密码"/>
    </van-dialog>
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

interface teamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<teamCardListProps>(), {
//@ts-ignore
  teamList: [] as TeamType[]
})

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
