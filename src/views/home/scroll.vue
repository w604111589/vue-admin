<template>
  <div class="Background">
    <div class="bg">
      <transition
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <img v-bind:src="showImg" v-if="show">
      </transition>
    </div>
    <div class="screen">3213123</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Velocity from "velocity-animate";
@Component
export default class Scroll extends Vue {
  private imgs: any[] = [];
  private isAnimate: boolean = false;
  private showImg: string = "https://img11.360buyimg.com/da/jfs/t4000/107/2234194410/85271/6c24d985/58a50cafNb60886c9.jpg";
  private showIndex: number = 0;
  private show: boolean = true;

  private mounted() {

    this.$nextTick(function() {
      this.show = false;
      this.bg_data();

    });

  }

  private bg_data() {
    const that = this;
    that.imgs = [
      "https://img11.360buyimg.com/da/jfs/t4000/107/2234194410/85271/6c24d985/58a50cafNb60886c9.jpg",
      "https://img20.360buyimg.com/da/jfs/t3154/175/5917485830/129679/f123634c/5897e6a2N83837dd2.jpg",
      "https://img1.360buyimg.com/da/jfs/t3133/89/5984232745/66970/beaf615c/589ac9bcNe544a72e.jpg",
      "https://img20.360buyimg.com/da/jfs/t3157/165/6117849901/102894/88bf53b8/589d67b6Ne8986a9e.jpg",
    ];
    that.showImg = that.imgs[0];
  }

  private beforeEnter(name: any) {
    console.log('beforeEnter');
    name.style.opacity = 0;
    name.style.transform = "scale(1) rotate(0deg)";
  }

  private enter(name: any, done: any) {
    console.log('enter');
    const vm = this;
    Velocity(
      name,
      // { opacity: 1, scale: 1.2, rotateZ: "3deg" },
      { opacity: 0.5, scale: 1 },
      {
        duration: 3000,
        complete: () => {
          done();
          vm.show = false;
        },
      },
    );
  }

  private leave(name: any, done: any) {
    console.log('leave');
    const vm = this;
    Velocity(
      name,
      // { opacity: 0, scale: 1, rotateZ: "0deg" },
      { opacity: 0.5, scale: 1 },
      {
        duration: 3000,
        complete: () => {
          done();
          vm.showImg =
            vm.imgs[
              vm.showIndex === 3 ? (vm.showIndex = 0) : (vm.showIndex += 1)
            ];
          vm.show = true;
        },
      },
    );
  }
}
</script>

<style scoped lang="scss">
.scroll {
}
.bg{
  // position: fixed;
  // left: 0px;
  // top:0px;
  // background-color: rgb(180, 180, 180);
  height: 300px;
  width: 100%;
  min-width: 1000px;
  z-index: -100;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;
  img{
    display: inline-block;
    position: relative;
    width: 100%;
    height: 300px;
    vertical-align: middle;
  }
}

.screen{
  width: 100%;
  height: 100%;
  background-color: #444;
  z-index: -98;
  opacity: 0.8;
  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=10);
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>