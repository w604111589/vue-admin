<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import editorImage from "./components/editorImage.vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
// import tinymce from "./tinymce.min.js";

@Component({
  components: {
    editorImage
  }
})
export default class Tinymce extends Vue {
  @Prop({ default:() => { return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '') }})
  private id!: string;

  @Prop({ default: "" })
  private value!: string;

  @Prop({ default: ()=>{return []}, required: false })
  private toolbar!: any;

  @Prop({ default: "file edit insert view format table" })
  private menubar!: string;

  @Prop({ default: 360 })
  private height!: number;

  private hasChange: boolean = false;
  private hasInit: boolean = false;
  private tinymceId: string = this.id;
  private fullscreen: boolean = false;
  private languageTypeList: any = {
    en: "en",
    zh: "zh_CN"
  };

  // private get tinymceId(){
  //   return this.id;
  // }

  private get language() {
    return this.languageTypeList[this.$store.getters.language];
  }

  @Watch("value")
  private getValue(val: string) {
    if (!this.hasChange && this.hasInit) {
      this.$nextTick(() =>
        (window as any).tinymce.get(this.tinymceId).setContent(val || "")
      );
    }
  }

  @Watch("language")
  private getLanguage() {
    this.destroyTinymce();
    this.$nextTick(() => this.initTinymce());
  }

  // private activated() {
  //   this.initTinymce();
  // }

  private mounted(){
    this.initTinymce();
  }

  // private deactivated() {
  //   this.destroyTinymce();
  // }

  private destroyed() {
    this.destroyTinymce();
  }

  private initTinymce() {
    const _this = this;
    // console.log((window as any).tinymce);
    // console.log(this.tinymceId);
    // console.log(this.toolbar.length > 0 ? this.toolbar : toolbar);
    // console.log(this.menubar);
    // console.log(plugins);
    (window as any).tinymce.init({
      language: this.language,
      selector: `#${this.tinymceId}`,
      height: this.height,
      body_class: "panel-body ",
      object_resizing: false,
      toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
      menubar: this.menubar,
      plugins: plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: "clean",
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: "square",
      advlist_number_styles: "default",
      imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
      default_link_target: "_blank",
      link_title: false,
      nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      // init_instance_callback: (editor: any) => {
      //   console.log(editor);
      //   if (_this.value) {
      //     editor.setContent(_this.value);
      //   }
      //   _this.hasInit = true;
      //   editor.on("NodeChange Change KeyUp SetContent", () => {
      //     this.hasChange = true;
      //     this.$emit("input", editor.getContent());
      //   });
      // },
      // setup(editor: any) {
      //   editor.on("FullscreenStateChanged", (e: any) => {
      //     _this.fullscreen = e.state;
      //   });
      // }
    });
  }

  private destroyTinymce() {
    if ((window as any).tinymce.get(this.tinymceId)) {
      (window as any).tinymce.get(this.tinymceId).destroy();
    }
  }

  private setContent(value: any) {
    (window as any).tinymce.get(this.tinymceId).setContent(value);
  }

  private getContent(value: any) {
    (window as any).tinymce.get(this.tinymceId).getContent();
  }
  private imageSuccessCBK(arr: any) {
    const _this = this;
    arr.forEach((v: any) => {
      (window as any).tinymce
        .get(_this.tinymceId)
        .insertContent(`<img class="wscnph" src="${v.url}" >`);
    });
  }
}
</script>
<style lang="scss" scoped>

.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  // visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>