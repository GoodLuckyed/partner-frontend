<template>
  <div class="notice-detail">
    <van-sticky>
      <van-nav-bar
          title="官方公告"
          left-text="返回 "
          left-arrow
          @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="content-box">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-image class="my-image" round width="2.5rem" height="2.5rem" :src="image"/>
          <span style="padding-left: 8px">
            <van-tag class="my-tag" color="#007acc" size="large">官方</van-tag>
          </span>
        </template>
      </van-cell>
      <div class="title">{{ notice?.title }}</div>
      <div class="time">公告发表于{{ notice?.updateTime.toString().split('T')[0]}}</div>
      <div class="content">{{notice?.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {reqGetNoticeById} from "../../api/notice";
import {onMounted, ref} from "vue";
import {NoticeType} from "../../models/notice";
import {showFailToast} from "vant";

const image = new URL('../../assets/china.png',import.meta.url).href
const router = useRouter();
const route = useRoute();
const notice = ref<NoticeType>()
//返回上一级菜单
const onClickLeft = () => {
  router.back();
}

onMounted(()=> {
  getNoticeDetail()
})

const noticeId = Number(route.query.noticeId);
//获取公告详情
const getNoticeDetail = async () => {
  if (noticeId > 0){
    const res = await reqGetNoticeById(noticeId);
    if (res.code == 0){
      notice.value = res.data;
    }else {
      showFailToast('加载失败，请重试！')
    }
  }
}
</script>


<style scoped>
.my-image{
  vertical-align: middle;
}
.title{
  padding: 10px 16px;
  font-size: 18px;
  font-family: 黑体;
}
.time{
  text-align: center;
  font-size: 12px;
  color: #7e7f81;
}
.content{
  padding: 12px 16px;
  font-size: 16px;
  font-family: 华文细黑;
}
</style>
