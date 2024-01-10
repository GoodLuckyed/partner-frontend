<template>
  <van-sticky>
    <van-nav-bar
        title="搜索用户"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </van-sticky>
  <form action="/">
    <van-search
        v-model="searchText"
        placeholder="请输入用户昵称"
        @search="onSearch"
    />
  </form>
  <van-divider v-if="activeIds.length != 0" content-position="left">已选标签</van-divider>
<!--  <van-empty v-if="activeIds.length == 0" description="未选择标签" :image-size="[35,20]" style="height: 50px"/>-->
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag  :show="true" closeable size="small" type="primary" @close="doclose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <van-divider content-position="left">自定义标签</van-divider>
  <van-cell-group inset>
    <van-field v-model="userDefinedTag" placeholder="请输入标签" style="padding-right: 5px">
      <template #button>
        <van-button size="small" type="primary" @click="addUserDefinedTag">添加</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">标签搜索</van-button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import {showFailToast} from "vant";

const router = useRouter();
const activeIds = ref([]);
const activeIndex = ref(0);
const searchText = ref('');

const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
      {text: '保密', id: '保密'}
    ],
  },
  {
    text: '年级',
    children: [
      {text: '高一', id: '高一'},
      {text: '高二', id: '高二'},
      {text: '高三', id: '高三'},
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '研究生', id: '研究生'},
      {text: '已工作', id: '已工作'},
    ],
  },
  {
    text: "编程",
    children: [
      {text: "Java", id: "Java"},
      {text: "Python", id: "Python"},
      {text: "C++", id: "C++"},
      {text: "JavaScript", id: "JavaScript"},
      {text: "Ruby", id: "Ruby"},
      {text: "PHP", id: "PHP"},
      {text: "Swift", id: "Swift"},
      {text: "Objective-C", id: "Objective-C"},
      {text: "C#", id: "C#"},
      {text: "Go", id: "Go"},
      {text: "Kotlin", id: "Kotlin"},
      {text: "TypeScript", id: "TypeScript"},
      {text: "Rust", id: "Rust"},
      {text: "Lua", id: "Lua"},
      {text: "Perl", id: "Perl"},
      {text: "Scala", id: "Scala"},
      {text: "Dart", id: "Dart"},
      {text: "R", id: "R"},
      {text: "MATLAB", id: "MATLAB"},
      {text: "Haskell", id: "Haskell"},
      {text: "Julia", id: "Julia"},
      {text: "Groovy", id: "Groovy"},
      {text: "Shell", id: "Shell"},
      {text: "Assembly", id: "Assembly"},
      {text: "F#", id: "F#"},
      {text: "Clojure", id: "Clojure"},
      {text: "Erlang", id: "Erlang"},
      {text: "Lisp", id: "Lisp"},
      {text: "Prolog", id: "Prolog"},
      {text: "Smalltalk", id: "Smalltalk"}
    ]
  },
  {
    text: '兴趣爱好',
    children: [
      {text: '阅读', id: '阅读'},
      {text: '旅游', id: '旅游'},
      {text: '游戏', id: '游戏'},
      {text: '音乐', id: '音乐'},
      {text: '电影', id: '电影'},
      {text: '美食', id: '美食'},
      {text: '健身', id: '健身'},
      {text: '编程', id: '编程'},
      {text: '摄影', id: '摄影'},
      {text: '绘画', id: '绘画'},
      {text: '写作', id: '写作'},
      {text: '手工', id: '手工'},
      {text: '园艺', id: '园艺'},
      {text: '钓鱼', id: '钓鱼'},
      {text: '篮球', id: '篮球'},
      {text: '足球', id: '足球'},
      {text: '棒球', id: '棒球'},
      {text: '乒乓球', id: '乒乓球'},
      {text: '羽毛球', id: '羽毛球'},
      {text: '网球', id: '网球'}
    ]
  },
  {
    text: '职业',
    children: [
      {text: '医生', id: '医生'},
      {text: '律师', id: '律师'},
      {text: '教师', id: '教师'},
      {text: '工程师', id: '工程师'},
      {text: '程序员', id: '程序员'},
      {text: '设计师', id: '设计师'},
      {text: '销售', id: '销售'},
      {text: '市场营销', id: '市场营销'},
      {text: '会计师', id: '会计师'},
      {text: '金融分析师', id: '金融分析师'},
      {text: '投资银行家', id: '投资银行家'},
      {text: '记者', id: '记者'},
      {text: '编辑', id: '编辑'},
      {text: '作家', id: '作家'},
      {text: '演员', id: '演员'},
      {text: '导演', id: '导演'},
      {text: '音乐家', id: '音乐家'},
      {text: '画家', id: '画家'},
      {text: '建筑师', id: '建筑师'},
      {text: '厨师', id: '厨师'},
      {text: '学生', id: '学生'}
    ]
  }
];
//标签列表
let tagList = ref(originTagList)

const onSearch = () => {
  router.push({
    path: '/user/list',
    query:{
      searchText:searchText.value
    }
  })

  //标签搜索
  // tagList.value = originTagList.map(parentTag =>  {
  //   const tempParentTag = {...parentTag}
  //   const tempChildren = [...parentTag.children]
  //   tempParentTag.children =  tempChildren.filter(item => item.text.includes(searchText.value));
  //   return tempParentTag;
  // })
};


// const onCancel = () => {
//   searchText.value = '';
//   tagList.value = originTagList
// };

//移除标签
const doclose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

//执行搜索
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query:{
      tags:activeIds.value
    }
  })
}

//添加自定义标签
const userDefinedTag = ref('')
const addUserDefinedTag = () => {
  if (userDefinedTag.value !== '') {
    activeIds.value.push(userDefinedTag.value)
    userDefinedTag.value = ''
  } else {
    showFailToast("请先输入标签名")
  }
}

const onClickLeft = () => {
  router.back();
}
</script>
<style scoped>

</style>
