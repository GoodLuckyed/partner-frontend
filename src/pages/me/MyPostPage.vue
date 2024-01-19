<template>
  <van-sticky>
    <van-nav-bar
        title="我的帖文"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <PostCardList :postList="postList"></PostCardList>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getMyPost} from "../../api/me";
import PostCardList from "../../components/PostCardList.vue";

const router = useRouter();
const postList = ref([]);
const onClickLeft = () => {
  router.back();
}


onMounted(async () => {
  const res = await getMyPost();
  if (res.code == 0) {
    postList.value = res.data
  }
})
</script>


<style scoped>

</style>
