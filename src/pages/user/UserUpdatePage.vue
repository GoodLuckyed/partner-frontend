<template>
  <van-sticky>
    <van-nav-bar
        title="用户修改"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>

  <van-cell title="头像" is-link center>
    <van-uploader v-model="imgUrl" :max-count="1" :after-read="afterRead" :max-size="2 * 1024 * 1024" @oversize="oversize">
      <template #preview-delete/>
      <img :src="user.avatarUrl" style="width: 60px;height: 60px;border-radius: 50%" alt=""/>
    </van-uploader>
  </van-cell>
  <van-cell title="账户" :value="user.userAccount"/>
  <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称',user.username)"/>
  <van-cell title="简介" is-link :value="user.profile ?? '还未填写个人简介'" @click="toEdit('profile','个人简介',user.profile)"/>
  <van-cell title="性别" is-link @click="()=>showPicker=true">
    <span v-if="user.gender===1">男</span>
    <span v-if="user.gender===0">女</span>
  </van-cell>
  <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
  <van-cell title="标签" is-link to="/user/update/tags"/>
  <van-cell title="密码" is-link @click="updatePassword(user.id)"></van-cell>
  <van-cell title="创建时间"   :value="user.createTime?.toString().split('.000')[0]"/>

  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
        title="性别"
        :columns="genders"
        @confirm="onConfirmGender"
        @cancel="()=>showPicker=false"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import {UserType} from "../../models/user";
import myAxios from "../../utils/request.ts";
import {showFailToast, showSuccessToast} from "vant";
const router = useRouter();
const user = ref<UserType>({} as UserType)
const showPicker = ref(false);
const genders = [
  {text: '男', value: '1'},
  {text: '女', value: '0'},
];
const imgUrl = ref([])
onMounted(async () => {
  user.value = await getCurrentUser();
})
const toEdit = (editKey:string,editName:string,currentValue:string) => {
  router.push({
    path:'/user/edit',
    query:{
      editKey,
      editName,
      currentValue
    }
  })
}

const onConfirmGender = async ({selectedValues} : any) => {
  const res = await myAxios.post("/user/update", {
    "id": user.value.id,
    gender: selectedValues[0]
  })
  if (res?.code === 0) {
    showSuccessToast("修改成功")
  } else {
    showFailToast("修改失败")
  }
  showPicker.value = false
  user.value = await getCurrentUser();
}

//修改密码
const updatePassword = (id: number) => {
  router.push({
    path: '/user/update/password',
    query: {
      id
    }
  })
}

//上传头像
const afterRead = async () => {
  let formData = new FormData();
  formData.append('avatarImg',imgUrl.value[0].file)
  formData.append('id',user.value.id.toString())
  const res = await myAxios.post('/user/upload',formData,{
    headers:{
      "Content-Type": "multipart/form-data"
    }
  })
  if (res.code == 0){
    window.location.reload()
    showSuccessToast('头像上传成功')
    await getCurrentUser().then(res => {
      user.value.avatarUrl = res.data.avatarUrl
    })
  }else {
    showFailToast('头像上传失败')
  }
  imgUrl.value = []
}

const oversize = () => {
  showFailToast('图片大小不能超过2M');
};
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped>

</style>
