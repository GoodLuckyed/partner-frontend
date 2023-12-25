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
         <van-picker-group
             title="设定过期日期"
             :tabs="['选择日期', '选择时间']"
             @confirm="onConfirm"
             @cancel="showPicker = false"
         >
           <van-date-picker v-model="currentDate" :min-date="minDate"/>
           <van-time-picker v-model="currentTime" :columns-type="columnsType"/>
         </van-picker-group>
       </van-popup>
       <van-field name="stepper" label="最大人数">
         <template #input>
           <van-stepper v-model="addTeamData.maxNum" min="3" max="10"/>
         </template>
       </van-field>
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
import {ref} from "vue";
import { reqAddTeam } from "../../api/team";
import {showFailToast, showSuccessToast} from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
//初始化数据
const initFormData = {
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": 0
}

// 需要用户填写的表单数据 对象扩展
const addTeamData = ref({...initFormData})

//当前时间
const minDate = new Date();
const showPicker = ref(false);

const currentDate = ref(['2023', '10', '01']);		//定义一个初始时间(年月日)
const currentTime = ref(['00', '00', '00']);      //定义一个初始时间(时分秒)
const columnsType = ['hour', 'minute', 'second'];

const onConfirm = () => {
  addTeamData.value.expireTime = currentDate.value.join('-') + 'T' + currentTime.value.join(':');
  showPicker.value = false
}

//提交表单
const onSubmit = async () => {
  //提交的表单数据
  const postData = {
    ...addTeamData.value,
    status:Number(addTeamData.value.status)
  }
  const res = await reqAddTeam(postData)
  if (res?.code === 0 && res.data){
    showSuccessToast('创建队伍成功')
    router.push({
      path: '/team',
      replace: true
    })
  }else {
    showFailToast('创建队伍失败')
  }
}
</script>


<style scoped>

</style>

