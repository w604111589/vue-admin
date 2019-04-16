<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class SvgIcon extends Vue {

    @Prop({required: true})
    private iconClass!: string;

    @Prop({default: ''})
    private className!: string;

    private get iconName() {
      return `#icon-${this.iconClass}`;
    }

    private get svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    }
  }
</script>

<style scoped lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>