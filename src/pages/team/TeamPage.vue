<template>
  <van-sticky>
    <van-nav-bar
        title="队伍"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public">
        <template #title>
          <van-icon name="fire-o" color="#ee0a24" size="16px"/>
          公开
        </template>
      </van-tab>
      <van-tab title="加密" name="secret">
        <template #title>
          <van-icon name="lock" size="16px"/>
          加密
        </template>
      </van-tab>
      <van-tab title="我的" name="mine">
        <template #title>
          <van-icon name="user-o" size="16px"/>
          我的
        </template>
      </van-tab>
    </van-tabs>
    <div style="padding-top: 4px"></div>
    <van-button class="create-button" icon="plus" type="primary" @click="doCreateTeam" />
    <TeamCardList :team-list="teamList" @update-active="updateActive"></TeamCardList>
    <van-empty v-if="teamList.length < 1" description="暂无数据" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import {reqGetJoinedTeamList, reqGetTeamList} from "../../api/team";
import {showFailToast} from "vant";

const router = useRouter();


const active = ref('public')

//更新active
const updateActive = () => {
  active.value = 'public'
}
const onTabChange = async (name:string) => {
  if (name === 'public'){
    await listTeams(searchText.value,0);
  }
  if (name === 'secret'){
    await listTeams(searchText.value,2)
  }
  if (name === 'mine'){
    const res = await reqGetJoinedTeamList(searchText.value);
    if (res?.code == 0) {
      teamList.value = res.data
    }else {
      showFailToast('加载队伍列表失败,请稍后重试')
    }
  }
}

const searchText = ref('')
const onSearch = () => {
  onTabChange(active.value)
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

const onClickLeft = () => {
  router.back()
}
</script>

<style scoped>
</style>
