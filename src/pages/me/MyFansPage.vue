<template>
  <van-sticky>
    <van-nav-bar
        title="我的粉丝"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <UserCardList :userList="fansList"></UserCardList>
  <van-empty v-if="fansList.length < 1" description="暂无数据" />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getMyFans} from "../../api/me";
import UserCardList from "../../components/UserCardList.vue";
import {UserType} from "../../models/user";

const router = useRouter();
const fansList = ref([]);
const onClickLeft = () => {
  router.back();
}


onMounted(async () => {
  const res = await getMyFans();
  if (res.code == 0) {
    res.data.forEach((item:UserType) => {
      item.tags = JSON.parse(item.tags);
    })
    fansList.value = res.data
  }
})
</script>


<style scoped>

</style>
