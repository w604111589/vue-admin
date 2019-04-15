<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { privateDecrypt } from "crypto";

@Component
export default class EditorSlideUpload extends Vue {
  @Prop({ default: "#1890ff" })
  private color!: string;

  private dialogVisible: boolean = false;
  private listObj: any = {};
  private fileList: any[] = [];

  private checkAllSuccess() {
    return Object.keys(this.listObj).every(
      item => this.listObj[item].hasSuccess
    );
  }

  private handleSubmit() {
    const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
    if (!this.checkAllSuccess()) {
      this.$message(
        "请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！"
      );
      return;
    }
    this.$emit("successCBK", arr);
    this.listObj = {};
    this.fileList = [];
    this.dialogVisible = false;
  }

  private handleSuccess(response: any, file: any) {
    const uid = file.uid;
    const objKeyArr = Object.keys(this.listObj);
    for (let i = 0, len = objKeyArr.length; i < len; i++) {
      if (this.listObj[objKeyArr[i]].uid === uid) {
        this.listObj[objKeyArr[i]].url = response.files.file;
        this.listObj[objKeyArr[i]].hasSuccess = true;
        return;
      }
    }
  }

  private handleRemove(file: any) {
    const uid = file.uid;
    const objKeyArr = Object.keys(this.listObj);
    for (let i = 0, len = objKeyArr.length; i < len; i++) {
      if (this.listObj[objKeyArr[i]].uid === uid) {
        delete this.listObj[objKeyArr[i]];
        return;
      }
    }
  }

  private beforeUpload(file: any) {
    const _self = this;
    const _URL = window.URL;
    const fileName = file.uid;
    this.listObj[fileName] = {};
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = _URL.createObjectURL(file);
      img.onload = function() {
        _self.listObj[fileName] = {
          hasSuccess: false,
          uid: file.uid,
          width: (this as any).width,
          height: (this as any).height
        };
      };
      resolve(true);
    });
  }
}
</script>
<style lang="scss" scoped>

  .editor-slide-upload {
    margin-bottom: 20px;
    .el-upload--picture-card {
      width: 100%;
    }
  }
</style>