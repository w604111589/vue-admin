<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      ref="imgUpload"
      class="image-uploader"
      drag
      :action="config.BaseUrlCustom+'upload'"
    >
      <i class="el-icon-upload"/>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
// import { getToken } from "@/api/qiniu";
import defaultconfig from '@/utils/config';

@Component
export default class SingleImageUpload extends Vue {
  @Prop({ default: "" })
  private value!: string;

  private tempUrl: string = "";
  private dataObj: any = { token: "", key: "" };

  private get imageUrl() {
    return this.value;
  }

  private config: any = defaultconfig;

  private emitInput(val: any) {
    this.$emit("input", val);
  }

  private rmImage() {
    this.emitInput("");
  }

  private handleImageSuccess(response: any, file: any, fileList: any) {
    // if (this.$refs.imgUpload) {
    //   (this.$refs.imgUpload as any).clearFiles();
    // }
    if (response.data.pathurl) {
      this.tempUrl = response.data.pathurl;
    } else {
      console.log('未知错误');
    }
    this.emitInput(this.tempUrl);
  }

  private beforeUpload() {
    const _self = this;
    console.log('beforeUpload');
    // return new Promise((resolve, reject) => {
    //   getToken()
    //     .then((response: any) => {
    //       // const key = response.data.qiniu_key;
    //       // const token = response.data.qiniu_token;
    //       // _self._data.dataObj.token = token;
    //       // _self._data.dataObj.key = key;
    //       // this.tempUrl = response.data.qiniu_url;
    //       this.tempUrl = response.data.pathurl;
    //       resolve(true);
    //     })
    //     .catch( (err: any) => {
    //       console.log(err);
    //       reject(false);
    //     });
    // });
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 35%;
    float: left;
    min-width:360px;
  }
  .image-preview {
    width: 200px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        max-height: 180px;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>