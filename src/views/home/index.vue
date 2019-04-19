<template>
  <div class="home globalbg">
    <div class="home-carousel">
      <div style="width: 100%;min-width: 360px">
        <Scroll/>
        <!-- <img src="../../assets/img/banner_bg.jpg" alt> -->

        <!-- <transition-group name="fadeIn" tag="ul">
          <div
            class="slide"
            v-for="(item,index) in imgs"
            v-show="index === curpage"
            :key="'a'+index"
          >
            <a :href="item.sourceUrl" target="_blank">
              <img :src="item.imgUrl" alt>
            </a>
          </div>
        </transition-group> -->
        
        <!-- <transition-group name="flip-list" tag="ul">
          <li v-for="curImg in currImgs" v-bind:key="curImg" class="list-item">
            <img :src="curImg" >
          </li>
        </transition-group>-->
      </div>
      <div></div>
    </div>
    <div class="home-ad">
      <div class="ad-info">公告</div>
      <div class="ad-info">【升级】XXX策略由1.0版本升级为2.0版本</div>
      <div class="ad-info">【升级】XXX策略由1.0版本升级为2.0版本</div>
      <div class="ad-info">【升级】XXX策略由1.0版本升级为2.0版本</div>
    </div>
    <div class="front-container">
      <div class="front-body">
        <div class="art-lists" v-for="(item, index) in lists" :key="index">
          <div class="art-list">
            <div>
              <img
                src="https://hotcoin-hk-static.oss-cn-hongkong.aliyuncs.com/hotcoin/upload/args/1384f115c55d4dc784e3c6ab88e97667WechatIMG101.jpeg"
                alt
              >
            </div>
            <div class="art-list-div">作者：{{item.author}}</div>
            <div class="art-list-div">
              发布时间：
              {{item.release_time}}
            </div>
            <div class="art-list-div">
              发布简介:
              {{item.abstract}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { fetchList } from "@/api/article";
import Scroll from "./scroll.vue";
@Component({
  components:{
    Scroll,
  },
})
export default class HomeIndex extends Vue {
  private search: string = "";
  private total: number = 0;
  private lists: any[] = [];
  private listQuery: any = { page: 1, limit: 20 };
  private listLoading: boolean = false;
  private imgs: any[] = [
    "https://img11.360buyimg.com/da/jfs/t4000/107/2234194410/85271/6c24d985/58a50cafNb60886c9.jpg",
    "https://img20.360buyimg.com/da/jfs/t3154/175/5917485830/129679/f123634c/5897e6a2N83837dd2.jpg",
    "https://img1.360buyimg.com/da/jfs/t3133/89/5984232745/66970/beaf615c/589ac9bcNe544a72e.jpg",
    "https://img20.360buyimg.com/da/jfs/t3157/165/6117849901/102894/88bf53b8/589d67b6Ne8986a9e.jpg"
  ];
  private currImgs: any[] = [];
  private index: number = 0;

  private mounted() {
    this.currImgs = [this.imgs[0]];
    // this.startChange();
  }

  private startChange() {
    const that = this;
    setInterval(() => {
      if (that.index < that.imgs.length - 1) {
        that.index++;
      } else {
        that.index = 0;
      }
      that.currImgs.splice(0, 1, that.imgs[that.index]);
    }, 20000);
  }

  private created() {
    this.getLists();
  }
  /**
   * @author wt
   * 获取文章列表
   */
  private getLists() {
    this.listLoading = true;
    fetchList(this.listQuery).then((response: any) => {
      this.lists = response.data.items;
      this.total = response.data.total;
      this.listLoading = false;
    });
  }
  private go(path: string, params?: any) {
    this.$router.push({ path, query: params });
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
.home {
  padding-top: 60px;
}
.home-carousel {
  text-align: center;
  height:300px;
}
.home-ad {
  @include clearfix;
  margin-top: -3px;
  height: 50px;
  line-height: 50px;
  background: #1f2d3d;
  color: #d7e0f5;
  .ad-info {
    float: left;
    margin-left: 30px;
  }
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
  .art-lists {
    float: left;
    font-size: 14px;
    .art-list {
      margin-left: 30px;
      margin-top: 30px;
      background-color: #f1f1f1;
      min-width: 360px;
      min-height: 200px;
      img {
        width: 100%;
        max-width: 360px;
        height: 200px;
      }
      .art-list-div {
        padding-left: 10px;
        height: 24px;
        line-height: 24px;
      }
    }
  }
}

.fadeIn-enter-active,.fadeIn-leave-active {
transition: all 1s ease;
}
.fadeIn-enter-active,.fadeIn-leave{
opacity: 1;
}
.fadeIn-enter,.fadeIn-leave-active {
opacity: 0;
}

// .flip-list-enter-active,
// .flip-list-leave-active {
//   transition: all 2s;
// }
// .flip-list-enter,
// .flip-list-leave-active {
//   opacity: 0;
// }
// .flip-list {
//   img {
//     width: 100%;
//   }
//   ul {
//     width: 100%;
//   }
// }
// ul, ol { list-style: none; }
// body, p, img, dl, dt, dd, ul, ol, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
</style>