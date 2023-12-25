<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <van-button class="create-button" icon="plus" type="primary" @click="doCreateTeam" />
    <TeamCardList :team-list="teamList" @update-active="updateActive"></TeamCardList>
    <van-empty v-if="teamList.length < 1" description="无搜索结果" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import {reqGetTeamList} from "../../api/team";
import {showFailToast} from "vant";

const router = useRouter();


const active = ref('public')

//更新active
const updateActive = () => {
  active.value = 'public'
}
const onTabChange = (name:string) => {
  if (name === 'public'){
    listTeams(searchText.value,0);
  }else {
    listTeams(searchText.value,2)
  }
}

const searchText = ref('')
const onSearch = (val:string) => {
  listTeams(val)
}
const doCreateTeam = () => {
  router.push({
    path:'/team/add'
  })
}

const teamList = ref([])
onMounted(async () => {
  listTeams();
})

const listTeams = async (val = '',status = 0) => {
  const res = await reqGetTeamList(val,status)
  if (res?.code == 0){
    teamList.value = res.data
  }else {
    showFailToast('加载队伍列表失败,请稍后重试')
  }
}

</script>

<style scoped>
</style>
