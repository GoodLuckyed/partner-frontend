<template>
  <div class="post-add">
    <van-sticky>
      <van-nav-bar
          title="发布帖文"
          left-text="取消"
          right-text="发布"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
      />
    </van-sticky>
    <van-uploader class="upload_area" v-model="image" preview-size="100px" :max-count="1" :max-size="2 * 1024 * 1024"
                  @oversize="oversize" :preview-full-image="false">
      <template #default>
        <div>
          <van-icon name="plus" class="upload-icon" size="25px"/>
        </div>
      </template>
    </van-uploader>
    <div class="upload-form">
      <van-form>
        <van-cell-group inset>
          <van-field
              v-model="title"
              name="title"
              placeholder="填写标题"
              :rules="[{ required: true, message: '请填写标题' }]"
          />
          <van-field
              v-model="content"
              type="textarea"
              autosize
              name="content"
              placeholder="添加正文"
              :rules="[{ required: true, message: '请添加正文' }]"
          />
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {reqAddPost} from "../../api/post";

const router = useRouter();
const image = ref([]);
const title = ref('');
const content = ref('');

const oversize = () => {
  showFailToast('图片大小不能超过2M');
};
const onClickLeft = () => {
  router.back();
};
//发布帖文
const onClickRight = async () => {
  if (title.value === '' || content.value === '') {
    showFailToast('请将内容填写完整');
    return;
  }
  const fromData = new FormData();
  fromData.append('title', title.value);
  fromData.append('content', content.value);
  fromData.append('image', image.value[0].file);

  const res = await reqAddPost(fromData);
  if (res.code === 0) {
    showSuccessToast('发布成功');
    router.push('/');
  } else {
    showFailToast('发布失败');
  }
}
</script>


<style scoped>
.upload_area {
  margin-left: 10px;
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-color: #efefef;
  border-radius: 10%;
}

.upload-icon {
  margin-top: 35px;
  margin-left: 37px;
  color: #c7c7c7;
}

.upload-form {
  margin-left: -15px;
}
</style>
