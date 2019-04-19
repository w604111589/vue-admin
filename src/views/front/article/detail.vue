<template>
  <div class="detail globalbg">
    <div class="front-container">
      <div class="front-title">
        <div class="title-left">文章详情</div>
        <!-- <div class="title-right">
          <el-input v-model="search" placeholder="搜索"></el-input>
        </div>-->
      </div>
      <div class="front-body">
        <div class="body-title">{{list.title}}</div>
        <div class="body-intro">
          <div class="left-intro">作者：{{list.author}}</div>
          <div class="left-intro">发布时间：{{list.release_time}}</div>
        </div>
        <div class="body-content">
          <div v-html="this.html"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const defaultForm = {
  status: 0,
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
  type: 1
};
import { Component, Prop, Vue } from "vue-property-decorator";
import { fetchArticle } from "@/api/article";

@Component
export default class FrontArticleDetail extends Vue {
  private list: any = defaultForm;

  private get id() {
    return this.$route.query.id;
  }

  private html: string = "";

  private mounted() {
    this.getList();
  }
  /**
   * @author wt
   * 根据ID获取文章详情
   */
  private getList() {
    fetchArticle(this.id).then((response: any) => {
      this.list = response.data;
      this.showContent();
    });
  }

  private showContent() {
    if (this.list.type !== 1) {
      this.html = this.list.content;
    } else {
      import("showdown").then((showdown: any) => {
        const converter = new showdown.Converter({ tables: true });
        this.html = converter.makeHtml(this.list.content);
      });
    }
  }
}
</script>

<style>
.body-content table {
  font-size: 14px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
.body-content table th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
}
.body-content table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}
</style>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
.detail {
  padding-top: 60px;
}
.front-container {
  width: 70%;
  max-width: 1200px;
  margin: 30px auto;
}
.front-title {
  @include clearfix;
  height: 60px;
  line-height: 60px;
  background: #fff;
  .title-left {
    float: left;
    padding-left: 30px;
  }
  .title-right {
    float: right;
    padding-right: 30px;
  }
}
.front-body {
  @include clearfix;
  min-height: 500px;
  margin-top: 30px;
  .body-title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
  }
  .body-intro {
    font-size: 12px;
    text-align: center;
    color: #22a8ee;
    .left-intro {
      display: inline-block;
    }
    .left-intro:first-child {
      margin-right: 30px;
    }
  }
  .body-content {
    padding: 30px;
  }
}
</style>