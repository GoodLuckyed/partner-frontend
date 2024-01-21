<template>
  <div class="post-detail">
    <van-sticky>
      <van-nav-bar
          title="正文"
          left-arrow
          @click-left="onClickLeft"
      >
        <template #right>
          <svg @click="showBottom = true" t="1704162769481" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6822" width="24" height="24"><path d="M341.333333 512a85.333333 85.333333 0 1 1-170.666666 0 85.333333 85.333333 0 0 1 170.666666 0z m256 0a85.333333 85.333333 0 1 1-170.666666 0 85.333333 85.333333 0 0 1 170.666666 0z m170.666667 85.333333a85.333333 85.333333 0 1 0 0-170.666666 85.333333 85.333333 0 0 0 0 170.666666z" fill="#1296db" p-id="6823"></path></svg>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div>
      <img :src="post?.image" alt="" style="width: 100%;height: 200px">
    </div>
    <van-cell-group inset>
      <van-cell style="display: flex;align-items: center">
        <template #icon>
          <van-image round width="2.5rem" height="2.5rem" :src="author?.avatarUrl" @click="toUserDetail(author?.id)"/>
        </template>
        <template #title>
          <span style="padding-left: 5px">{{ author?.username }}</span>
        </template>
        <template #right-icon>
          <div v-if="author?.id!==currentUser?.id">
            <van-button v-if="author?.isFollow" type="primary" size="small" color="#c1c1c1"
                        @click="followUser(author)">已关注
            </van-button>
            <van-button v-else icon="plus" type="primary" size="small" @click="followUser(author)">关注
            </van-button>
          </div>
        </template>
      </van-cell>
      <van-cell :title="post?.title" style="font-weight: bold"/>
      <van-cell :title="post?.content"/>
    </van-cell-group>

    <van-divider/>

    <van-cell-group inset>
      <van-cell :title="`评论 ${post?.comments ?? '0'}`"/>
    </van-cell-group>

    <div class="line"/>

    <div style="padding-bottom: 80px">
      <CommentList :commentList="commentList" @refresh="refresh"></CommentList>
    </div>

    <van-cell-group :border="false">
      <van-field v-model="comment" :autosize="{minHeight: 32}" type="textarea" rows="1" placeholder="欢迎评论"
                 :border="false"
                 style="position: fixed;bottom: 0;padding-left: 16px;border-top: 1px solid #C1C1C1;padding-right: 10px;z-index: 100">
        <template #right-icon>
          <van-icon name="guide-o" color="blue" @click="addComment"/>
        </template>
        <template #button>
          <van-icon name="envelop-o" size="15" style="margin-right: 5px">
            <span style="margin-left: 2px">{{ post?.comments }}</span>
          </van-icon>
          <van-icon v-if="!post?.isLike" name="good-job-o"  size="15" @click="likePost(post)">
            <span style="margin-left: 2px">{{ post?.likes }}</span>
          </van-icon>
          <van-icon v-else name="good-job-o" color="red" size="15" style="margin-right: 2px" @click="likePost(post)">
            <span style="margin-left: 2px">{{ post?.likes }}</span>
          </van-icon>
        </template>
      </van-field>
    </van-cell-group>

    <van-popup
        v-if="post?.userId == currentUser?.id || currentUser.userRole == 1"
        v-model:show="showBottom"
        round
        position="bottom"
        :style="{ height: '88px' }"
    >
      <van-grid :border="false">
        <van-grid-item @click="copyUrl">
          <template #icon>
            <svg t="1704729452772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4209" width="24" height="24"><path d="M752.535797 273.701662l-2.230808-2.227738c-51.299363-51.300386-135.227868-51.300386-186.526207 0l-118.846782 118.883621c-51.299363 51.281967-51.299363 135.222751 0 186.544627l2.192945 2.156106c4.27742 4.267187 8.833179 8.116865 13.485129 11.728112l43.49563-43.544749c-5.086855-2.956332-9.885138-6.591115-14.223956-10.92891l-2.192945-2.156106c-27.855418-27.866674-27.855418-73.180719 0-101.048417L606.609263 314.26859c27.782763-27.855418 73.084529-27.855418 100.951203 0l2.218528 2.180666c27.855418 27.867698 27.855418 73.194022 0 101.012601l-53.736878 53.765531c9.304923 23.067368 13.740956 47.64002 13.304004 72.114434l83.152838-83.117023C803.83516 408.918273 803.83516 325.004095 752.535797 273.701662L752.535797 273.701662 752.535797 273.701662 752.535797 273.701662zM576.877101 444.959118c-4.266164-4.264117-8.820899-8.118911-13.521968-11.680017l-43.472094 43.496653c5.088902 3.00545 9.888208 6.615675 14.249539 10.952446l2.215458 2.227738c27.855418 27.820626 27.855418 73.135694 0 101.002368L417.465438 709.790762c-27.854395 27.821649-73.15616 27.821649-101.010555 0l-2.229784-2.204202c-27.854395-27.864628-27.854395-73.204256 0-100.999298l53.771671-53.745065c-9.317203-23.070438-13.763468-47.665603-13.340843-72.140017l-83.176374 83.068927c-51.312666 51.349505-51.312666 135.288243 0 186.563046l2.216481 2.228761c51.299363 51.251268 135.227868 51.251268 186.526207 0l118.835526-118.883621c51.250244-51.299363 51.250244-135.263683 0-186.513928L576.877101 444.959118 576.877101 444.959118 576.877101 444.959118 576.877101 444.959118zM576.877101 444.959118" fill="#8a8a8a" p-id="4210"></path></svg>
          </template>
          <template #text>
            <span class="grid-font">复制链接</span>
          </template>
        </van-grid-item>
        <van-grid-item @click="updatePost">
          <template #icon>
            <svg t="1704729500885" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5401" width="24" height="24"><path d="M862.709333 116.042667a32 32 0 1 1 45.248 45.248L455.445333 613.813333a32 32 0 1 1-45.258666-45.258666L862.709333 116.053333zM853.333333 448a32 32 0 0 1 64 0v352c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V224c0-64.8 52.533333-117.333333 117.333333-117.333333h341.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v576a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V448z" fill="#8a8a8a" p-id="5402"></path></svg>
          </template>
          <template #text>
            <span class="grid-font">编辑</span>
          </template>
        </van-grid-item>
        <van-grid-item @click="deletePost">
          <template #icon>
            <svg t="1704729543193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6523" width="24" height="24"><path d="M106.666667 213.333333h810.666666v42.666667H106.666667z" fill="#8a8a8a" p-id="6524"></path><path d="M640 128v42.666667h42.666667V128c0-23.573333-19.093333-42.666667-42.538667-42.666667H383.872A42.496 42.496 0 0 0 341.333333 128v42.666667h42.666667V128h256z" fill="#8a8a8a" p-id="6525"></path><path d="M213.333333 896V256H170.666667v639.957333C170.666667 919.552 189.653333 938.666667 213.376 938.666667h597.248C834.218667 938.666667 853.333333 919.68 853.333333 895.957333V256h-42.666666v640H213.333333z" fill="#8a8a8a" p-id="6526"></path><path d="M320 341.333333h42.666667v384h-42.666667zM490.666667 341.333333h42.666666v384h-42.666666zM661.333333 341.333333h42.666667v384h-42.666667z" fill="#8a8a8a" p-id="6527"></path></svg>
          </template>
          <template #text>
            <span class="grid-font">删除</span>
          </template>
        </van-grid-item>
        <van-grid-item @click="report">
          <template #icon>
            <svg t="1704729591022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7622" width="24" height="24"><path d="M960.288 787.488c-98.88-154.08-287.36-469.568-385.76-622.912-21.44-27.968-71.872-44-102.88 0L61.504 803.872c-23.36 33.888-23.008 79.872 49.376 82.432h824.64c48.416-2.784 48.416-62.496 24.768-98.816z m-437.44-27.776a47.296 47.296 0 1 1 0-94.592 47.296 47.296 0 0 1 0 94.592z m35.456-165.536c0.448 11.52-10.944 23.68-23.648 23.68h-23.648c-12.672 0-23.2-12.16-23.616-23.68l-23.68-224.64c0-19.552 15.904-35.456 35.488-35.456h47.296c19.584 0 35.456 15.904 35.456 35.488l-23.648 224.64z" fill="#8a8a8a" p-id="7623"></path></svg>
          </template>
          <template #text>
            <span class="grid-font">举报</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-popup>

    <van-popup
        v-else
        v-model:show="showBottom"
        round
        position="bottom"
        :style="{ height: '88px' }"
    >
      <van-grid :border="false">
        <van-grid-item @click="copyUrl">
          <template #icon>
            <svg t="1704729452772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4209" width="24" height="24"><path d="M752.535797 273.701662l-2.230808-2.227738c-51.299363-51.300386-135.227868-51.300386-186.526207 0l-118.846782 118.883621c-51.299363 51.281967-51.299363 135.222751 0 186.544627l2.192945 2.156106c4.27742 4.267187 8.833179 8.116865 13.485129 11.728112l43.49563-43.544749c-5.086855-2.956332-9.885138-6.591115-14.223956-10.92891l-2.192945-2.156106c-27.855418-27.866674-27.855418-73.180719 0-101.048417L606.609263 314.26859c27.782763-27.855418 73.084529-27.855418 100.951203 0l2.218528 2.180666c27.855418 27.867698 27.855418 73.194022 0 101.012601l-53.736878 53.765531c9.304923 23.067368 13.740956 47.64002 13.304004 72.114434l83.152838-83.117023C803.83516 408.918273 803.83516 325.004095 752.535797 273.701662L752.535797 273.701662 752.535797 273.701662 752.535797 273.701662zM576.877101 444.959118c-4.266164-4.264117-8.820899-8.118911-13.521968-11.680017l-43.472094 43.496653c5.088902 3.00545 9.888208 6.615675 14.249539 10.952446l2.215458 2.227738c27.855418 27.820626 27.855418 73.135694 0 101.002368L417.465438 709.790762c-27.854395 27.821649-73.15616 27.821649-101.010555 0l-2.229784-2.204202c-27.854395-27.864628-27.854395-73.204256 0-100.999298l53.771671-53.745065c-9.317203-23.070438-13.763468-47.665603-13.340843-72.140017l-83.176374 83.068927c-51.312666 51.349505-51.312666 135.288243 0 186.563046l2.216481 2.228761c51.299363 51.251268 135.227868 51.251268 186.526207 0l118.835526-118.883621c51.250244-51.299363 51.250244-135.263683 0-186.513928L576.877101 444.959118 576.877101 444.959118 576.877101 444.959118 576.877101 444.959118zM576.877101 444.959118" fill="#8a8a8a" p-id="4210"></path></svg>
          </template>
          <template #text>
            <span class="grid-font">复制链接</span>
          </template>
        </van-grid-item>
        <van-grid-item @click="report">
          <template #icon>
            <svg t="1704729591022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7622" width="24" height="24"><path d="M960.288 787.488c-98.88-154.08-287.36-469.568-385.76-622.912-21.44-27.968-71.872-44-102.88 0L61.504 803.872c-23.36 33.888-23.008 79.872 49.376 82.432h824.64c48.416-2.784 48.416-62.496 24.768-98.816z m-437.44-27.776a47.296 47.296 0 1 1 0-94.592 47.296 47.296 0 0 1 0 94.592z m35.456-165.536c0.448 11.52-10.944 23.68-23.648 23.68h-23.648c-12.672 0-23.2-12.16-23.616-23.68l-23.68-224.64c0-19.552 15.904-35.456 35.488-35.456h47.296c19.584 0 35.456 15.904 35.456 35.488l-23.648 224.64z" fill="#8a8a8a" p-id="7623"></path></svg>
          </template>
          <template #text>
            <span class="grid-font">举报</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import {reqDeletePostById, reqLikePost, reqPostById} from "../../api/post";
import {onMounted, ref} from "vue";
import {PostType} from "../../models/post";
import {getCurrentUser} from "../../services/user.ts";
import {reqGetUserById} from "../../api/user";
import CommentList from "../../components/CommentList.vue";
import {reqAddComment, reqComment, reqCommentList} from "../../api/comment";
import {CommentType} from "../../models/comment";
import {UserType} from "../../models/user";
import {reqFollowUser} from "../../api/follow";

const router = useRouter();
const route = useRoute();
const id = Number(route.query.postId);
const post = ref<PostType>();
const commentList = ref<CommentType[]>([]);
const author = ref();
const currentUser = ref()
const comment = ref("")
const showBottom = ref(false)

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  await getPost();
  await getCommentList();
})

//获取帖文详情
const getPost = async () => {
  if (id <= 0){
    showFailToast('加载失败')
    return;
  }
  const res = await reqPostById(id);
  if (res.code == 0){
    post.value = res.data;
    const res1 = await reqGetUserById(res.data?.userId)
    author.value = res1.data;
  }else {
    showFailToast('加载失败,请重试')
  }
}

//获取帖文评论列表
const getCommentList = async () => {
  if (id <= 0){
    showFailToast('加载失败')
    return;
  }
  const res = await reqCommentList(id);
  if (res.code == 0){
    commentList.value = res.data
  }
}

//刷新评论列表
const refresh = () => {
  location.reload();
}

//添加评论
const addComment = async () => {
  if (comment.value == ''){
    showFailToast('评论不能为空')
  }else {
    const res = await reqAddComment(id,comment.value);
    if (res.code == 0){
      showSuccessToast('评论成功')
      comment.value = '';
      await getCommentList();
      //刷新评论数量
      const newPost = await reqPostById(id);
      if (newPost.code == 0){
        // @ts-ignore
        post.value.comments = newPost.data.comments;
      }
    }
  }
}

//点赞帖文
const likePost = async (post:PostType) => {
  const res = await reqLikePost(post.id);
  if (res.code == 0){
    const res1 = await reqPostById(post.id);
    if (res1.code == 0){
      post.likes = res1.data.likes;
      post.isLike = res1.data.isLike;
    }
  }
}

//复制链接
const copyUrl = () => {
  var textArea = document.createElement('textarea')
  document.body.appendChild(textArea)
  textArea.readOnly = 'readonly'
  textArea.style.opacity = '0'
  textArea.value = document.location.href
  textArea.select()
  if (textArea.setSelectionRange)
    textArea.setSelectionRange(0, textArea.value.length)
  else
    textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
  //指定toast样式，使文字在一行显示
  showSuccessToast({
    message: "已复制到剪切板",
    className: "copyToast"
  })
  showBottom.value = false
}

//编辑帖文
const updatePost = () => {
  router.push({
    path:'/post/edit',
    query:{
      postId:post.value?.id,
      image:post.value?.image,
      title:post.value?.title,
      content:post.value?.content
    }
  })
}

//删除帖文
const deletePost = () => {
  showConfirmDialog({
    title: '确定要删除帖文吗',
    message:
        '此操作无法撤回',
  })
      .then(async () => {
        // on confirm
        const res = await reqDeletePostById(id);
        if (res.code == 0){
          router.replace('/');
          showSuccessToast('删除成功')
        }else {
          showFailToast('删除失败')
        }
      })
      .catch(() => {
        // on cancel
        showBottom.value = false
      });
}

//举报帖文
const report = () => {
  showSuccessToast('举报成功,等待管理员审核')
  showBottom.value = false
}

//返回上一级菜单
const onClickLeft = () => {
  router.back();
}

//关注 取关
const followUser = async (author:UserType) => {
  const res = await reqFollowUser(author.id);
  if (res.code == 0) {
    const res1 = await reqGetUserById(author.id);
    if (res1.code == 0){
      author.isFollow = res1.data.isFollow;
    }
  }
}
//跳转到用户详情页面
const toUserDetail = (id:number) => {
  router.push({
    path:'/user/detail',
    query:{
      id:id
    }
  })
}
</script>


<style scoped>
.line {
  width: 100%;
  height: 1px;
  background: #ededed;
  position: relative;
}
.grid-font {
  font-size: 13px;
  color: #949494;
  margin-top: 5px
}
</style>
