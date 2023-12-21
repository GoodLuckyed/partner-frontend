<template>
 <div id="teamAddPage">
   <van-form @submit="onSubmit">
     <van-cell-group inset>
       <van-field
           v-model="addTeamData.name"
           name="name"
           label="队伍名"
           placeholder="请输入队伍名称"
           :rules="[{ required: true, message: '请输入队伍名称' }]"
       />
       <van-field
           v-model="addTeamData.description"
           rows="4"
           autosize
           label="队伍描述"
           type="textarea"
           placeholder="请输入队伍描述"
       />
       <van-field
           is-link
           readonly
           name="datePicker"
           label="过期时间"
           :placeholder="addTeamData.expireTime ?? '点击选择时间'"
           @click="showPicker = true"
       />
       <van-popup v-model:show="showPicker" position="bottom">
         <van-date-picker
             @confirm="onConfirm"
             @cancel="showPicker = false"
             title="选择日期"
             :min-date="minDate"
         />
       </van-popup>
       <van-field name="radio" label="队伍状态">
         <template #input>
           <van-radio-group v-model="addTeamData.status" direction="horizontal">
             <van-radio :name="0">公开</van-radio>
             <van-radio :name="1">私有</van-radio>
             <van-radio :name="2">加密</van-radio>
           </van-radio-group>
         </template>
       </van-field>
       <van-field
           v-if="Number(addTeamData.status) === 2"
           v-model="addTeamData.password"
           type="password"
           name="password"
           label="密码"
           placeholder="请输入密码"
           :rules="[{ required: true, message: '请填写密码' }]"
       />
     </van-cell-group>
     <div style="margin: 16px;">
       <van-button round block type="primary" native-type="submit">
         提交
       </van-button>
     </div>
   </van-form>
 </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import {reqAddTeam, reqGetTeamInfoById, reqUpdateTeamInfo} from "../api/team";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

// 需要用户填写的表单数据 对象扩展
const addTeamData = ref({})

const id = Number(route.query.id)
//获取当前队伍信息
onMounted(async () => {
  if (id <= 0){
    showFailToast('队伍加载失败')
  }
  const res = await reqGetTeamInfoById(id)
  if(res?.code === 0 && res.data){
    addTeamData.value = res.data
  }else {
    showFailToast('队伍加载失败')
  }
})

//当前时间
const minDate = new Date();
const showPicker = ref(false);
const onConfirm = ({ selectedValues }:any) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false
}

//提交表单
const onSubmit = async () => {
  //提交的表单数据
  const postData = {
    ...addTeamData.value,
    status:Number(addTeamData.value.status)
  }
  const res = await reqUpdateTeamInfo(postData)
  if (res?.code === 0 && res.data){
    showSuccessToast('修改队伍成功')
    router.push({
      path: '/team',
      replace: true
    })
  }else {
    showFailToast('修改队伍失败')
  }
}
</script>


<style scoped>

</style>

