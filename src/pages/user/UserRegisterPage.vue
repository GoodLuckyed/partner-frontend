<template>
  <van-sticky>
    <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <van-row justify="center">
    <van-image
        width="343"
        height="278"
        src="/huoban.png"
        style="background-position:center"
    />
  </van-row>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          :rules="[{ required: true, message: '请填写昵称!' }]"
          label="昵称"
          name="昵称"
          placeholder="请输入昵称"
      />
      <van-field
          v-model="userAccount"
          :rules="[{ required: true, message: '请填写账号!' }]"
          label="账号"
          name="账号"
          placeholder="请输入账号"
      />
      <van-field
          v-model="userPassword"
          :rules="[{ required: true, message: '请填写密码!' }]"
          label="密码"
          name="密码"
          placeholder="请输入密码"
          type="password"
      />
      <van-field
          v-model="checkPassword"
          :rules="[{ required: true, message: '请确认密码!' }]"
          label="确认密码"
          name="确认密码"
          placeholder="确认密码"
          type="password"
      />
      <div>
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
      <van-cell title="" to="/user/login" value="已有账号？点击登录"></van-cell>
    </van-cell-group>
  </van-form>
</template>


<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../utils/request.ts";
import {showSuccessToast} from "vant";

const router = useRouter()
const username = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post("/user/register", {
    "username": username.value,
    "userAccount": userAccount.value,
    "userPassword": userPassword.value,
    "checkPassword": checkPassword.value
  })
  if (res.code == 0) {
    showSuccessToast('注册成功')
    await router.push("/user/login")
  }
};
const onClickLeft = () => {
  router.back();
}
</script>


<style scoped>


</style>
