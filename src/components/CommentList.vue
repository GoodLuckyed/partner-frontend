<template>
  <van-cell-group :border="false" v-for="comment in props.commentList" :key="comment.id">
    <van-cell :border="false" :title="comment.commentUser?.username" :label="comment.createTime.toString().split('T')[0]">
      <template #icon>
        <van-image
            round
            width="2.5rem"
            height="2.5rem"
            :src="comment.commentUser?.avatarUrl"
            style="margin-right: 10px;"
        />
      </template>
      <template #value>
        <van-icon v-if="!comment.isLike" name="good-job-o" size="15" style="margin-right: 15px;margin-top: 15px" @click="likeComment(comment)">
          {{ comment.likes }}
        </van-icon>
        <van-icon v-else name="good-job-o" color="red" size="15" style="margin-right: 15px;margin-top: 15px" @click="likeComment(comment)">
          {{ comment.likes }}
        </van-icon>
        <van-icon v-if="currentUser.id == comment.commentUser?.id || currentUser.userRole == 1" name="delete-o" size="15" @click="deleteComment(comment)"></van-icon>
      </template>
    </van-cell>
    <div class="comment" style="margin-left: 60px">
      {{ comment.content }}
    </div>
  </van-cell-group>
</template>

<script setup lang="ts">
import {CommentType} from "../models/comment";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {reqComment, reqDeleteComment, reqLikeComment} from "../api/comment";
import {showConfirmDialog} from "vant";


//获取当前用户
const currentUser = ref()
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

//点赞评论
const likeComment = async (comment: CommentType) => {
  const res = await reqLikeComment(comment.id);
  if (res.code == 0){
    //点赞/取消点赞成功,获取点赞数量
    const res1 = await reqComment(comment.id);
    if (res1.code == 0){
      comment.likes = res1.data.likes;
      comment.isLike = res1.data.isLike;
    }
  }
}

//删除评论
const deleteComment = (comment:CommentType) => {
  showConfirmDialog({
    title: '确定要删除评论吗',
    message:
        '此操作无法撤回',
  })
      .then(async () => {
        // on confirm
        const res = await reqDeleteComment(comment.id);
        if (res.code == 0){
          emit('refresh')
        }
      })
      .catch(() => {
        // on cancel
      });
}
interface CommentListProps {
  commentList: CommentType[]
}
const props = withDefaults(defineProps<CommentListProps>(),{
  // @ts-ignore
  commentList: [] as CommentType[],
})

const emit = defineEmits(['refresh'])
</script>


<style scoped>

</style>
