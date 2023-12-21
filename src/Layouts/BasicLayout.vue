<template>
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route @change="onChange">
    <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {showToast} from "vant";
import {useRoute, useRouter} from 'vue-router'
import {ref} from "vue";

const router = useRouter();
const route = useRoute();

const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE)

/**
 * @description: 路由前置守卫 (根据路由切换标题)
 */
router.beforeEach((to, from, next) => {
  title.value = to.meta?.title || DEFAULT_TITLE
  next()
})

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}

</style>
