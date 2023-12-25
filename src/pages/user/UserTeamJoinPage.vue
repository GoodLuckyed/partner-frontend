<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <TeamCardList :team-list="teamList"></TeamCardList>
    <van-empty v-if="teamList.length < 1" description="无搜索结果" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import {reqGetJoinedTeamList} from "../../api/team";
import {showFailToast} from "vant";

const router = useRouter();

const searchText = ref('')
const onSearch = (val:string) => {
  listTeams(val)
}

const teamList = ref([])
onMounted(async () => {
  listTeams();
})

const listTeams = async (val = '') => {
  const res = await reqGetJoinedTeamList(val)
  if (res?.code == 0){
    teamList.value = res.data
  }else {
    showFailToast('加载队伍列表失败,请稍后重试')
  }
}

</script>

<style scoped>

</style>
