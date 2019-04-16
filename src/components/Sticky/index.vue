<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div
      :class="className"
      :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Sticky extends Vue {
  // @Prop({ default: 0 })
  // private stickyTop!: number;

  @Prop({ default: 1 })
  private zIndex!: number;

  @Prop({ default: '' })
  private className!: string;

  private active: boolean = false;
  private position: string = '';
  private width: any = '';
  private height: any = '';
  private isSticky: boolean = false;

  private stickyTop: number = 0;

  private mounted() {
    this.height = this.$el.getBoundingClientRect().height;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleReize);
  }

  private activated() {
    this.handleScroll();
  }

  private sticky() {
    if (this.active) {
      return;
    }
    this.position = 'fixed';
    this.active = true;
    this.width = this.width + 'px';
    // 60为总头部的高
    this.stickyTop = (this.stickyTop + 60);
    this.isSticky = true;
  }

  private reset() {
    if (!this.active) {
      return;
    }
    this.position = '';
    this.width = 'auto';
    this.active = false;
    this.stickyTop = 0;
    this.isSticky = false;
  }

  private handleScroll() {
    this.width = this.$el.getBoundingClientRect().width;
    const offsetTop = this.$el.getBoundingClientRect().top;
    if (offsetTop < (this.stickyTop)) {
      this.sticky();
      return;
    }
    this.reset();
  }

  private handleReize() {
    if (this.isSticky) {
      this.width = this.$el.getBoundingClientRect().width + 'px';
    }
  }
}
</script>
<style lang="scss" scoped>
</style>