<template>
  <div id="teamPage">
    <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
    <TeamCardList :team-list="teamList"></TeamCardList>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import {reqGetTeamList} from "../api/team";
import {showFailToast} from "vant";

const router = useRouter();

const doJoinTeam = () => {
  router.push({
    path:'/team/add'
  })
}

const teamList = ref([])
onMounted(async () => {
  const res = await reqGetTeamList()
  if (res?.code == 0){
    teamList.value = res.data
  }else {
    showFailToast('加载队伍列表失败,请稍后重试')
  }
})

</script>

<style scoped>

</style>
