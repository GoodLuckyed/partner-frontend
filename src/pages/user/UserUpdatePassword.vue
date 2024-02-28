<template>
  <van-sticky>
    <van-nav-bar
        title="修改密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <van-form @submit="onSubmit">
    <div style="padding-top: 18px"/>
    <van-cell-group inset>
      <van-field
          v-model="oldPassword"
          label="旧密码"
          name="旧密码"
          type="password"
          placeholder="请输入旧密码"
          :rules="[{ required: true, message: '请填写旧密码!' }]"
      />
      <van-field
          v-model="newPassword"
          label="新密码"
          type="password"
          name="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请填写新密码!' }]"
      />
      <van-field
          v-model="checkPassword"
          label="确认密码"
          type="password"
          name="确认密码"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请填写确认密码!' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="primary">
        修改
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import myAxios from "../../utils/request.ts";

const router = useRouter()
const route = useRoute()

const oldPassword = ref();
const newPassword = ref();
const checkPassword = ref();
const id = ref(route.query.id);

const onSubmit = () => {
  showConfirmDialog({
    message: '请确认是否修改密码！',
  }).then(async () => {
    const res = await myAxios.post("/user/update/password", {
      id: id.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      checkPassword: checkPassword.value
    })
    if (res.code == 0) {
      showSuccessToast("修改成功")
    } else {
      showFailToast("修改失败")
      return;
    }
    const loginOut = await myAxios.post("/user/logout", {})
    sessionStorage.clear()
    if (loginOut.code == 0) {
      showSuccessToast("请重新登录")
      router.replace("/user/login").catch(e => console.log(e))
    }
  }).catch(() => {
    showSuccessToast("取消修改")
  });

};

const onClickLeft = () => {
  router.back()
}

</script>

<style scoped>

</style>
