<template>
  <div class="Markdown ">
    <sticky :class-name="'sub-navbar '+postForm.status">
      <CommentDropdown v-model="postForm.abstract"/>
      <PlatformDropdown v-model="postForm.platforms"/>
      <!-- <SourceUrlDropdown v-model="postForm.source_uri"/> -->
      <el-button
        v-loading="loading"
        style="margin-left: 10px;"
        type="success"
        @click="submitForm"
      >发布</el-button>
      <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
    </sticky>
    <div class="components-container">
      <code>
        Markdown is based on
        <a
          href="https://github.com/sparksuite/simplemde-markdown-editor"
          target="_blank"
        >simplemde-markdown-editor</a> ，Simply encapsulated in Vue.
        <a
          target="_blank"
          href="https://juejin.im/post/593121aa0ce4630057f70d35#heading-15"
        >相关文章</a>
      </code>
      <div class="editor-container">
        <markdown-editor
          id="contentEditor"
          ref="contentEditor"
          v-model="content"
          :height="300"
          :z-index="20"
        />
      </div>

      <el-button
        style="margin-top:80px;"
        type="primary"
        icon="el-icon-document"
        @click="markdown2Html"
      >To HTML</el-button>
      <div v-html="html"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MarkdownEditor from '@/components/MarkdownEditor/index.vue';
// import Showdown from "showdown";
import Sticky from '@/components/Sticky/index.vue'; // 粘性header组件
import { fetchArticle, updateMarkdown } from '@/api/article';
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown,
} from './components/Dropdown';

const defaultForm = {
  status: "draft",
  title: "", // 文章题目
  content: "", // 文章内容
  abstract: "", // 文章摘要
  source_uri: "", // 文章外链
  image_uri: "", // 文章图片
  release_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ["a-platform"],
  comment_disabled: false,
  importance: 0,
};

@Component({
  components: {
    MarkdownEditor,
    Sticky,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
  },
})
export default class Markdown extends Vue {
  private content: string = '';
  private html: string = '';
  private postForm: any = Object.assign({}, defaultForm);
  private loading: boolean = false;

  private markdown2Html() {
    // import('showdown').then((showdown: any) => {
    //   const converter = new showdown.Converter()
    //   this.html = converter.makeHtml(this.content)
    // })
  }

  @Watch('content')
  private realTimeShowContent() {
    import('showdown').then((showdown: any) => {
      const converter = new showdown.Converter();
      this.html = converter.makeHtml(this.content);
    });
  }

  private submitForm() {
    (this.$refs.postForm as any).validate((valid: any) => {
      if (valid) {
        this.loading = true;
        updateMarkdown(this.postForm)
          .then((response: any) => {
            console.log(response);
          })
          .catch((err: any) => {
            console.log(err);
          });

        this.$notify({
          title: '成功',
          message: '发布文章成功',
          type: 'success',
          duration: 2000,
        });
        this.postForm.status = 'published';
        this.loading = false;
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  private draftForm() {
    if (
      this.postForm.content.length === 0 ||
      this.postForm.title.length === 0
    ) {
      this.$message({
        message: '请填写必要的标题和内容',
        type: 'warning',
      });
      return;
    }

    this.$message({
      message: '保存成功',
      type: 'success',
      showClose: true,
      duration: 1000,
    });
    this.postForm.status = 'draft';
  }
}
</script>
<style lang="scss" scoped>
.components-container {
  margin: 30px 50px;
  position: relative;
}
</style>