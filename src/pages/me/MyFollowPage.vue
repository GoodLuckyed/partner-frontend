<template>
  <van-sticky>
    <van-nav-bar
        title="我的关注"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <UserCardList :userList="followList"></UserCardList>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getMyFollow} from "../../api/me";
import UserCardList from "../../components/UserCardList.vue";
import {UserType} from "../../models/user";

const router = useRouter();
const followList = ref([]);
const onClickLeft = () => {
  router.back();
}


onMounted(async () => {
  const res = await getMyFollow();
  if (res.code == 0) {
    res.data.forEach((item:UserType) => {
      item.tags = JSON.parse(item.tags);
    })
    followList.value = res.data
  }
})
</script>


<style scoped>

</style>
