<template>
  <div class="notice-edit">
    <van-sticky>
    <van-nav-bar
        title="公告编辑"
        left-text="返回"
        right-text="提交"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
    </van-sticky>
    <div class="notice-edit-content">
      <van-form>
        <van-cell-group inset>
          <van-field
              v-model="notice.title"
              name="title"
              label="标题："
              label-align="top"
              placeholder="请输入公告标题"
              :rules="[{ required: true, message: '请输入公告标题' }]"
              label-class="custom-label"
          />
          <van-field
              v-model="notice.content"
              type="textarea"
              autosize
              name="content"
              label="内容："
              label-align="top"
              placeholder="请输入公告内容"
              :rules="[{ required: true, message: '请输入公告内容' }]"
              label-class="custom-label"
          />
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqGetNoticeById, reqUpdateNotice} from "../../api/notice";
import {showFailToast, showSuccessToast} from "vant";

const NoticeOne = {
  title: '',
  content: ''
}
const router = useRouter();
const route = useRoute();
const notice = ref({...NoticeOne});
const noticeId = Number(route.query.noticeId)
onMounted(() => {
  init();
})

//初始化
const init = async () => {
  if (noticeId > 0){
    const res = await reqGetNoticeById(noticeId);
    if (res.code == 0){
      notice.value = res.data;
    }else {
      showFailToast('加载失败，请重试！')
    }
  }
}
//返回上一级菜单
const onClickLeft = () => {
  router.back();
};
//提交修改
const onClickRight = async () => {
  if (!notice.value.title || !notice.value.content){
    showFailToast('请填写完整信息！')
    return;
  }
  const res = await reqUpdateNotice(noticeId,notice.value.title,notice.value.content)
  if (res.code == 0){
    showSuccessToast('更新成功')
    router.back();
  }else {
    showFailToast('更新失败')
  }
}
</script>


<style scoped>
:deep(.custom-label)  {
  font-size: 16px; /* 设置字体大小 */
  color: red; /* 设置字体颜色 */
}
</style>
