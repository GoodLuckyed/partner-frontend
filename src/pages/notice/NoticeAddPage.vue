<template>
  <div class="notice-add">
    <van-sticky>
    <van-nav-bar
        title="添加公告"
        left-text="取消"
        right-text="发布"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
    </van-sticky>
    <div class="notice-add-content">
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
import { useRouter } from "vue-router";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {reqAddNotice} from "../../api/notice";

const NoticeOne = {
  title: '',
  content: ''
}
const notice = ref({...NoticeOne});

const router = useRouter();
//返回上一级菜单
const onClickLeft = () => {
  router.back();
};
//添加公告
const onClickRight = async () => {
  if (!notice.value.title || !notice.value.content){
    showFailToast('请填写完整信息！')
    return;
  }
  const res = await reqAddNotice(notice.value);
  if (res.code == 0){
    showSuccessToast('添加成功')
    router.push('/')
  }else {
    showFailToast('添加失败')
  }
}
</script>


<style scoped>
:deep(.custom-label)  {
  font-size: 16px; /* 设置字体大小 */
  color: red; /* 设置字体颜色 */
}
</style>
