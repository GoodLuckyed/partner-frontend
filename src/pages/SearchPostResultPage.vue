<template>
  <van-sticky>
  <van-nav-bar
      title="搜索帖文"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  </van-sticky>
  <form action="/">
    <van-search
        v-model="searchText"
        placeholder="请输入帖文标题"
        @search="onSearch"
    />
  </form>
  <PostCardList :postList="postList"></PostCardList>
  <van-empty v-if="!postList || postList.length < 1" description="无搜索结果" />
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {showFailToast} from "vant";
import {reqPostByTitle} from "../api/post";
import PostCardList from "../components/PostCardList.vue";

const router = useRouter();
const searchText = ref('')
const postList = ref([])
const onSearch = async () => {
  if (searchText.value == ''){
    showFailToast('请输入搜索内容')
    return;
  }
  const res = await reqPostByTitle(searchText.value);
  if (res.code == 0){
    postList.value = res.data;
  }else {
    showFailToast('加载失败');
  }
}
const onClickLeft = () => {
  router.back();
}
</script>


<style scoped>

</style>
