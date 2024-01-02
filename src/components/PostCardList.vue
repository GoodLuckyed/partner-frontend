<template>
  <div class="post-card-List">
    <div class="post-card" v-for="post in props.postList" :key="post.id">
      <div class="time">{{ post?.createTime.toString().split('T')[0] }}</div>
      <div class="title">{{ post?.title }}</div>
      <div class="bottom">
        <div class="left">
          <span class="icon-text">
            <svg t="1704117947436" class="icon-message" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5140" width="24" height="24"><path d="M781.3 188.6H269.7c-59.6 0-108 51.1-108 113.9v312.8c0 64.8 50.3 119.5 109.9 119.5h120.2c30.4 32.8 109.8 117 109.8 117 6.2 6.7 14.9 10.5 23.9 10.5s17.6-3.8 24.6-11.3c0.6-0.7 62.1-72 105.6-116.2h123.7c59.6 0 110-54.7 110-119.5V302.6c-0.1-62.9-48.6-114-108.1-114z m-431.4 321c-25.2 0-45.6-20.4-45.6-45.6s20.4-45.6 45.6-45.6 45.6 20.4 45.6 45.6-20.4 45.6-45.6 45.6z m179.4 0c-25.2 0-45.6-20.4-45.6-45.6s20.4-45.6 45.6-45.6 45.6 20.4 45.6 45.6-20.4 45.6-45.6 45.6z m179.4 0c-25.2 0-45.6-20.4-45.6-45.6s20.4-45.6 45.6-45.6 45.6 20.4 45.6 45.6-20.4 45.6-45.6 45.6z" fill="#B2B2B2" p-id="5141"></path></svg>
            <span>{{ post?.comments }}</span>
          </span>
         <span class="icon-text">
            <svg t="1704126144404" class="icon-like" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7150" width="18" height="18"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="7151"></path></svg>
            <span>{{ post?.likes }}</span>
         </span>
        </div>
        <div class="right">
          <img :src="post?.image" alt="" style="width: 80px;height: 80px;">
        </div>
      </div>
    </div>
  </div>

</template>



<script setup lang="ts">
import {PostType} from "../models/post";



interface PostCardListProps {
  postList: PostType[]
}
const props = withDefaults(defineProps<PostCardListProps>(),{
  // @ts-ignore
  postList: [] as PostType[],
})

</script>


<style scoped>
.post-card{
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
}
.time{
  padding-top: 10px;
  padding-left: 10px;
  font-size: 12px;
  color: #7e7f81;
}
.title{
  padding: 15px 0 8px 10px
}
.left{
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.icon-text {
  display: flex;
  align-items: center;
  margin-right: 5px; /* 调整两组图标和文字之间的间距 */
}

.icon-text svg {
  margin-right: 5px; /* 调整图标和文字之间的间距 */
}
.right{
  position: absolute;
  bottom: 5px;
  right: 10px;
}
</style>
