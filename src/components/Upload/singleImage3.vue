<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="https://httpbin.org/post"
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
import { getToken } from "@/api/qiniu";

@Component
export default class SingleImageUpload extends Vue {
  @Prop({ default: "" })
  private value!: string;

  private tempUrl: string = "";
  private dataObj: any = { token: "", key: "" };

  private get imageUrl() {
    return this.value;
  }

  private emitInput(val: any) {
    this.$emit("input", val);
  }

  private rmImage() {
    this.emitInput("");
  }

  private handleImageSuccess() {
    this.emitInput(this.tempUrl);
  }

  private beforeUpload() {
    const _self = this;
    return new Promise((resolve, reject) => {
      getToken()
        .then((response: any) => {
          const key = response.data.qiniu_key;
          const token = response.data.qiniu_token;
          // _self._data.dataObj.token = token;
          // _self._data.dataObj.key = key;
          this.tempUrl = response.data.qiniu_url;
          resolve(true);
        })
        .catch( (err: any) => {
          console.log(err);
          reject(false);
        });
    });
  }
}
</script>
<style lang="scss" scoped>
</style>