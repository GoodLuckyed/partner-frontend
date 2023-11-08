<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute,useRouter} from "vue-router";
import myAxios from "../utils/request";
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import {getCurrentUser, setCurrentUser} from "../services/user";
import {setCurrentUserState} from "../states/user";

const router = useRouter();
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

//提交后台修改
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  const result = await myAxios.post('/user/update',{
    'id':currentUser.id,
    [editUser.value.editKey]:editUser.value.currentValue
  })
  if (result.code === 0){
    //更新缓存
    const result = await myAxios.get('/user/current')
    setCurrentUser(result.data);
    router.back();
    showSuccessToast('修改成功')
  }else {
    showFailToast('修改失败')
  }
};

</script>

<style scoped>

</style>
