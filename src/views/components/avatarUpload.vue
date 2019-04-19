<template>
  <div class="components-container">
    <!-- <code>
      This is based on
      <a
        class="link-type"
        href="//github.com/dai-siki/vue-image-crop-upload"
      >vue-image-crop-upload</a>
      .
      {{ $t('components.imageUploadTips') }}
    </code> -->

    <pan-thumb :image="image"/>

    <el-button
      type="primary"
      icon="upload"
      style="position: absolute;bottom: 15px;margin-left: 40px;"
      @click="imagecropperShow=true"
    >Change Avatar</el-button>

    <image-cropper
      v-show="imagecropperShow"
      :width="300"
      :height="300"
      :key="imagecropperKey"
      :url="config.BaseUrlCustom+'upload'"
      
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ImageCropper from "@/components/ImageCropper/index.vue";
import PanThumb from "@/components/PanThumb/index.vue";
import defaultconfig from '@/utils/config';

@Component({
  components: {
    ImageCropper,
    PanThumb,
  },
})
export default class AvatarUpload extends Vue {
  private imagecropperShow: boolean = false;

  private imagecropperKey: number = 0;

  private image: string =
    "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191";

  private cropSuccess(resData: any) {
    this.imagecropperShow = false;
    this.imagecropperKey = this.imagecropperKey + 1;
    // this.image = resData.files.avatar;
    this.image = resData;
  }

  private config: any = defaultconfig;


  private close() {
    this.imagecropperShow = false;
  }
}
</script>
<style lang="scss" scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>