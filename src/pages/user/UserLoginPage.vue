<template>
  <van-sticky>
    <van-nav-bar
        title="用户登录"
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
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <van-cell title="" to="/user/register" value="还没有账号？点击注册"></van-cell>
  </van-form>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import myAxios from "../../utils/request.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const result =  await myAxios.post('/user/login',{
    userAccount:userAccount.value,
    userPassword:userPassword.value
  })
  if (result.code === 0 && result.data){
    window.location.href = route.query?.redirect as string ?? '/';
    const token = result.data;
    sessionStorage.setItem("token",token);
    showSuccessToast('登录成功')
  }else {
    showFailToast('登录失败')
  }
};

const onClickLeft = () => {
  router.back();
}
</script>

<style scoped>

</style>
