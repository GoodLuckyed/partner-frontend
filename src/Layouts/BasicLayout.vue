<template>
<!--  <van-nav-bar-->
<!--      :title="title"-->
<!--      right-text="按钮"-->
<!--      left-arrow-->
<!--      @click-left="onClickLeft"-->
<!--      @click-right="onClickRight"-->
<!--  >-->
<!--    <template #right>-->
<!--      <van-icon name="search" size="18"/>-->
<!--    </template>-->
<!--  </van-nav-bar>-->
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route v-model="active" active-color="#1296db">
    <van-tabbar-item to="/" name="index">
      <span>主页</span>
      <template #icon="props">
        <svg :class="{ 'active-icon':active === 'index' }" t="1703424559993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9497" width="24" height="24"><path d="M750.236735 909.061224H273.763265c-38.661224 0-70.530612-31.869388-70.530612-70.530612V564.244898c0-6.269388-5.22449-11.493878-10.971429-11.493878h-26.644897c-20.897959 0-38.661224-12.016327-47.020409-31.346938-7.836735-19.330612-3.657143-40.75102 10.971429-55.379592l324.440816-327.053061c15.673469-15.673469 36.04898-24.032653 57.991837-24.032653s42.318367 8.359184 57.991837 24.032653l324.440816 327.053061c14.628571 14.628571 18.808163 36.571429 10.971429 55.379592-7.836735 19.330612-26.122449 31.346939-47.020409 31.346938h-26.644897c-6.269388 0-10.971429 5.22449-10.971429 11.493878v274.285714c0 38.661224-31.869388 70.530612-70.530612 70.530612z" fill="#bfbfbf" p-id="9498"></path><path d="M656.195918 909.061224H367.804082v-208.457142c0-43.885714 35.526531-79.412245 79.412245-79.412245h129.044897c43.885714 0 79.412245 35.526531 79.412245 79.412245V909.061224z" fill="#bfbfbf" p-id="9499"></path>
        </svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/team" name="team">
      <span>组队</span>
      <template #icon="props">
        <svg :class="{ 'active-icon':active === 'team' }" t="1703424630476" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13000" width="24" height="24"><path d="M1006.11712 226.56c-99.584 149.056-246.144 29.184-461.824-132.8-232.32-174.976-370.56 74.496-384.384 103.68 11.072 45.312 159.232 538.048 159.232 538.048 47.04-168.448 142.208-178.496 297.024-129.92 168.704 51.84 304.192-71.232 345.728-161.92 27.648-58.368 49.728-152.32 60.8-207.36 2.752-9.728-11.072-16.192-16.64-9.728zM869.28512 399.744c-35.84 78.464-132.672 135.808-223.104 107.968-115.968-36.416-213.632-29.696-288.384 19.456l-20.032-71.296-0.768-2.624a49329.408 49329.408 0 0 1-67.2-240.96c14.848-20.864 35.392-43.392 57.6-58.432 44.032-29.696 88-28.928 155.2 21.696 185.088 138.944 222.464 164.928 296.832 195.84a323.84 323.84 0 0 0 91.84 24.128l-1.984 4.224z" fill="#bfbfbf" p-id="13001"></path><path d="M110.11712 212.288c-8.32-30.4-38.72-49.792-69.12-41.472a55.296 55.296 0 0 0-38.72 69.12L220.77312 947.2c8.32 30.336 38.72 49.728 69.12 41.408 30.4-8.32 46.976-38.72 38.72-71.872L110.11712 212.288z" fill="#bfbfbf" p-id="13002"></path>
        </svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="add" @click="toShowOverPlay">
      <template #icon="props">
        <svg t="1703435338949" class="add-blog-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25224" width="48" height="48"><path d="M510.21824 0C228.90496 0 0 229.10976 0 510.57664 0 792.064 228.90496 1021.0816 510.21824 1021.0816c281.30304 0 510.1568-229.0176 510.1568-510.50496C1020.37504 229.10976 791.52128 0 510.21824 0z m192.39936 545.61792H546.48832v157.5936c0 14.7456-21.01248 26.90048-35.86048 26.90048-14.848 0-35.82976-12.15488-35.82976-26.90048v-157.5936h-157.0816c-14.7968 0-26.86976-21.03296-26.86976-35.87072 0-14.83776 12.06272-35.91168 26.86976-35.91168h157.0816V318.01344c0-14.92992 20.98176-26.95168 35.82976-26.95168 14.848 0 35.86048 12.02176 35.86048 26.95168v155.83232h156.12928c14.98112 0 26.92096 21.07392 26.92096 35.91168 0 14.82752-12.02176 35.86048-26.92096 35.86048z" fill="#1296db" p-id="25225"></path></svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/public_chat" name="public_chat" dot>
      <span>聊天室</span>
      <template #icon="props">
        <svg :class="{ 'active-icon':active === 'public_chat' }" t="1703434798728" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18858" width="24" height="24"><path d="M511.3 927.1c-72.6 0-144-19-206.6-55-0.9-0.3-4.8-1.2-14.8-0.4-9.5 0.7-20.5 2.4-32.1 4.3-36.8 5.9-74.9 12-98.3-11.4-23.5-23.5-17.6-61.7-11.8-98.7 1.8-11.8 3.6-22.9 4.2-32.4 0.7-10.2-0.3-14.2-0.5-15-35.9-62.5-54.9-133.8-54.9-206.3 0-56 11-110.3 32.6-161.5C150 301.3 179.9 257 218 218.9c38.1-38.1 82.5-68 131.9-88.9 51.2-21.6 105.5-32.6 161.5-32.6s110.3 11 161.5 32.6c49.4 20.9 93.8 50.8 131.9 88.9 38.1 38.1 68 82.5 88.9 131.9 21.6 51.2 32.6 105.5 32.6 161.5s-11 110.3-32.6 161.5c-20.9 49.4-50.8 93.8-88.9 131.9s-82.5 68-131.9 88.9c-51.2 21.5-105.6 32.5-161.6 32.5zM296.9 811.3c13.8 0 26.5 2.2 37.4 8.5 53.6 30.9 114.8 47.2 177 47.2 195.7 0 354.8-159.2 354.8-354.8S707 157.4 511.3 157.4 156.5 316.6 156.5 512.2c0 62.1 16.3 123.2 47.1 176.7 13.3 23 8.5 53.7 3.4 86.2-1.9 12.2-3.7 23.6-4.3 33.5-0.4 6.1-0.2 10.1 0.1 12.4 2.4 0.3 6.3 0.4 12.3 0 9.8-0.7 21.2-2.5 33.2-4.4 17-2.6 33.5-5.3 48.6-5.3z m-93.5 12.9z m-52.1-105.9z" fill="#bfbfbf" p-id="18859"></path><path d="M320.1 513.2m-65 0a65 65 0 1 0 130 0 65 65 0 1 0-130 0Z" fill="#bfbfbf" p-id="18860"></path><path d="M511.3 513.2m-65 0a65 65 0 1 0 130 0 65 65 0 1 0-130 0Z" fill="#bfbfbf" p-id="18861"></path><path d="M704.3 513.2m-65 0a65 65 0 1 0 130 0 65 65 0 1 0-130 0Z" fill="#bfbfbf" p-id="18862"></path></svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user" name="user">
      <span>个人</span>
      <template #icon="props">
        <svg :class="{ 'active-icon':active === 'user' }" t="1703424669550" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14379" width="24" height="24"><path d="M561.975362 570.009567c118.779087-25.056318 207.964552-130.953221 207.408227-256.993438C768.740563 168.848374 650.929627 52.070613 506.761871 52.720864c-144.174981 0.643025-260.938291 118.453962-260.295265 262.614492 0.56355 126.047442 90.681041 231.142369 209.684103 255.143837-179.563057 26.559119-317.445058 182.048458-316.606957 368.73537a38.104678 38.104678 0 0 0 38.270853 37.931278l666.102138-2.962252a38.111903 38.111903 0 0 0 37.931278-38.270854c-0.830876-186.694137-140.092853-340.940775-319.872659-365.903168z" fill="#bfbfbf" p-id="14380"></path>
        </svg>
      </template>
    </van-tabbar-item>
  </van-tabbar>
  <van-overlay :show="showOverPlay" @click="showOverPlay = false">
    <div class="wrapper-box">
      <div class="create-team" @click.stop style="margin-right: 50px" @click="createTeam">
        <div class="back" style="background-color: skyblue;">
          <div class="icon-box">
            <svg t="1703437271753"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26771" width="48" height="48"><path d="M904.057 754.565c66.5 26.208 106.204 59.18 106.204 95.027 0 85.16-224.008 154.24-500.334 154.24-276.26 0-500.266-69.08-500.266-154.24 0-35.845 39.654-68.819 106.17-95.027-15.914 11.095-24.671 23.022-24.671 35.457 0 57.872 187.506 104.733 418.767 104.733 231.328 0 418.802-46.861 418.802-104.733 0-12.435-8.709-24.361-24.672-35.457zM264.32 53.526c50.225 0 90.942 40.717 90.942 90.926 0 50.227-40.717 90.96-90.94 90.96-50.229 0-90.945-40.733-90.945-90.96 0-50.21 40.717-90.926 90.943-90.926z m489.876 0c-50.194 0-90.911 40.717-90.911 90.926 0 50.227 40.717 90.96 90.911 90.96 50.258 0 90.975-40.733 90.975-90.96 0-50.21-40.717-90.926-90.975-90.926z m-89.848 523.027v239.71h64.098l25.603-168.031 25.668 168.031H849.5V550.784c27.663-14.444 46.681-43.396 46.681-76.662v-135.81c0-47.497-38.805-86.351-86.335-86.351H703.61a85.737 85.737 0 0 0-19.966 2.335c14.231 21.749 22.5 47.678 22.5 75.487v147.819c0 37.826-15.54 73.296-41.796 98.949zM511.463 19.883c54.64 0 98.95 44.313 98.95 98.95 0 54.654-44.31 98.965-98.95 98.965-54.669 0-98.965-44.312-98.965-98.965 0-54.638 44.295-98.95 98.965-98.95z m97.774 541.328c30.324-15.588 51.271-47.285 51.271-83.607v-147.82c0-51.664-42.286-93.95-93.95-93.95H450.912c-51.697 0-93.967 42.287-93.967 93.95v147.819c0 36.159 20.703 67.708 50.849 83.41v288.89h75.927l27.905-182.85 27.876 182.85h69.735V561.208z m-255.054 15.341c-26.24-25.652-41.762-61.124-41.762-98.95V329.784c0-27.806 8.233-53.737 22.481-75.484a85.623 85.623 0 0 0-19.966-2.338H208.703c-47.53 0-86.336 38.854-86.336 86.352v135.81c0 33.266 19.02 62.218 46.698 76.663v265.476h69.768l25.668-168.031 25.603 168.03h64.08V576.553z" fill="#ffffff" p-id="26772"></path></svg>
          </div>
        </div>
        <div class="text-team">去组队</div>
      </div>
      <div class="publish-article" @click.stop style="margin-left: 50px" @click="addPost">
        <div class="back" style="background-color: burlywood;">
          <div class="icon-box">
            <svg t="1703437594028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27825" width="48" height="48"><path d="M288 416h192c17.67 0 32-14.33 32-32s-14.33-32-32-32H288c-17.67 0-32 14.33-32 32s14.33 32 32 32zM288 576h352c17.69 0 32-14.31 32-32s-14.31-32-32-32H288c-17.67 0-32 14.31-32 32s14.33 32 32 32zM480 672H288c-17.67 0-32 14.31-32 32s14.33 32 32 32h192c17.67 0 32-14.31 32-32s-14.33-32-32-32zM939.98 645.16L826.84 532.02c-6.25-6.25-14.44-9.37-22.63-9.37s-16.38 3.12-22.63 9.37L553.37 760.24c-6 6-9.37 14.14-9.37 22.63V896c0 17.67 14.33 32 32 32h113.14c8.49 0 16.63-3.37 22.63-9.37l228.21-228.21c12.49-12.5 12.49-32.76 0-45.26zM675.88 864H608v-67.88L804.21 599.9l67.88 67.88L675.88 864z" fill="#ffffff" p-id="27826"></path><path d="M448 864H192V160h383.86l0.11 128.09c0.06 35.23 28.78 63.91 64 63.91H768v80c0 17.67 14.33 32 32 32s32-14.33 32-32V274.87c0-8.58-3.45-16.8-9.56-22.82L673.09 105.18A32.002 32.002 0 0 0 650.66 96H160c-17.67 0-32 14.33-32 32v768c0 17.67 14.33 32 32 32h288c17.67 0 32-14.33 32-32s-14.33-32-32-32z m319.72-576H639.97l-0.1-125.73L767.72 288z" fill="#ffffff" p-id="27827"></path></svg>
          </div>
        </div>
        <div class="text-article">去发帖</div>
      </div>
    </div>
  </van-overlay>

<!--  <van-tabbar route @change="onChange">-->
<!--    <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>-->
<!--    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>-->
<!--    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>-->
<!--  </van-tabbar>-->
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from "vue";

const router = useRouter();
const route = useRoute();

//默认激活的tabbar
const active = ref('index')
//是否显示遮罩层
const showOverPlay = ref(false)

const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE)

onMounted(async () => {
  await router.isReady()
  active.value = route.name
})

//显示遮罩层
const toShowOverPlay = () => {
  showOverPlay.value = true
}

//跳转到创建队伍页面
const createTeam = () => {
  router.push('/team/add')
  showOverPlay.value = false
}
//跳转到发帖页面
const addPost = () => {
  router.push('/post/add')
  showOverPlay.value = false
}
/**
 * @description: 路由前置守卫 (根据路由切换标题)
 */
router.beforeEach((to, from, next) => {
  title.value = to.meta?.title || DEFAULT_TITLE
  next()
})

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
.active-icon path{
  fill: #1296db;
}
/* 如果需要调整上下距离，可以使用 margin 属性 */
.add-blog-btn {
  margin-top: 5px; /* 调整上边距 */
  margin-bottom: 0px; /* 调整下边距 */
}
.wrapper-box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.create-team,.publish-article{
  text-align: center;
}
.back{
  width: 100px;
  height: 100px;
  border-radius: 60px;
}
.icon-box{
  width: 100px;
  height:100px;
  padding: 24px 0;
  text-align: center;
}
.text-team,.text-article{
  font-size: 18px;
  color: #ffffff;
  margin-top: 5px;
}
</style>
