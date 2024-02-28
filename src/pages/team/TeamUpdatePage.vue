<template>
  <van-sticky>
    <van-nav-bar
        title="更新队伍"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
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
           rows="2"
           maxlength="50"
           autosize
           label="队伍描述"
           type="textarea"
           placeholder="请输入队伍描述"
           show-word-limit
       />
       <van-field
           is-link
           readonly
           name="datePicker"
           label="过期时间"
           :placeholder="addTeamData.expireTime?.toString().split('.000')[0] ?? '点击选择时间'"
           @click="showPicker = true"
       />
       <van-popup v-model:show="showPicker" position="bottom">
         <van-picker-group
             title="设定过期日期"
             :tabs="['选择日期', '选择时间']"
             next-step-text="下一步"
             @confirm="onConfirm"
             @cancel="showPicker = false"
         >
           <van-date-picker v-model="currentDate" :min-date="minDate"/>
           <van-time-picker v-model="currentTime" :columns-type="columnsType"/>
         </van-picker-group>
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
import {reqAddTeam, reqGetTeamInfoById, reqUpdateTeamInfo} from "../../api/team";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const date = new Date()
//默认队伍过期时间为一天
const currentDate = ref<string[]>([date.getFullYear().toString(), date.getMonth().toString(), (date.getDate() + 1).toString()]);
const currentTime = ref<string[]>([date.getHours().toString(), date.getMinutes().toString()]);
const columnsType = ['hour', 'minute', 'second'];

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

const onClickLeft = () => {
  router.back();
}
</script>


<style scoped>

</style>

