<template>
  <div class="home globalbg">
    <div class="front-container">
      <div class="front-title">
        <div class="title-left">文档列表</div>
        <div class="title-right">
          <el-input v-model="listQuery.search" placeholder="搜索(按ENTER键发送)" @keyup.enter.native="getList()"></el-input>
        </div>
      </div>
      <div class="front-body" v-loading="listLoading">
        <div class="art-lists" v-for="(item, index) in lists" :key="index"  >
          <div class="art-list" @click="go('/course/detail',{id:item.id})">
            <div> <img :src="item.image_uri" alt=""> </div>
            <div class="art-list-div"> 作者：{{item.author}}</div>
            <div class="art-list-div">发布时间：
              {{item.release_time}}
            </div>
            <div class="art-list-div">发布简介:
              {{item.abstract}}
            </div>
          </div>
        </div>
      </div>
      <div class="hc-pagination">
        <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { fetchList } from "@/api/article";
import Pagination from '@/components/Pagination/index.vue';
@Component({
  components: {
    Pagination,
  },
})
export default class FrontArticleIndex extends Vue {
  // private search: string = "";
  private total: number = 0;
  private lists: any[] = [];
  private listQuery: any = { page: 1, limit: 10, search: '', };
  private listLoading: boolean = false;

  private created() {
    this.getList();
  }

  private getList() {
    this.listLoading = true;
    fetchList(this.listQuery).then((response: any) => {
      this.lists = response.data.items;
      this.total = response.data.total;
      this.listLoading = false;
    });
  }
  private go(path: string, params?: any) {
    this.$router.push({path, query: params});
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
.home {
  padding-top: 60px;
  padding-bottom: 30px;
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
    font-weight:bold;
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
  padding-bottom: 30px;
  .art-lists {
    float: left;
    font-size:14px;
    .art-list {
      margin-left: 30px;
      margin-top: 30px;
      background: #f1f5f9;
      min-width: 200px;
      max-width: 360px;
      img{
        width:100%;
        max-width:360px;
        max-height:200px;
        height:200px;

      };
      .art-list-div {
        padding-left:10px;
        height:24px;
        line-height:24px;
      }
    }
  }
}
</style>