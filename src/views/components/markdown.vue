<template>
  <div class="Markdown components-container">
    <code>Markdown is based on
      <a href="https://github.com/sparksuite/simplemde-markdown-editor" target="_blank">simplemde-markdown-editor</a> ，Simply encapsulated in Vue.
      <a target="_blank" href="https://juejin.im/post/593121aa0ce4630057f70d35#heading-15">
        相关文章 </a>
    </code>
    <div class="editor-container">
      <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :z-index="20"/>
      <!-- <div style="width:50%;float:left;">
        
      </div>
      <div style="width:50%;float:left;min-height:370px;border-top:1px solid #ddd;border-bottom:1px solid #ddd;border-right:1px solid #ddd;z-index:20px;">
        <div style="height:49px;border-bottom:1px solid #ccc;text-align:center;line-height:50px;">markdown 实时显示内容</div>
        <div v-html="html" style="padding:20px" />
      </div> -->
 
    </div>
    
    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="markdown2Html">To HTML</el-button>
    <div v-html="html"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import MarkdownEditor from '@/components/MarkdownEditor/index.vue';
import Showdown from 'showdown';

@Component({
  components:{
    MarkdownEditor,
  }
})
export default class Markdown extends Vue {
  private content: string ="";
  private html: string ="";

  private markdown2Html() {
    // import('showdown').then((showdown: any) => {
    //   const converter = new showdown.Converter()
    //   this.html = converter.makeHtml(this.content)
    // })
  }

  @Watch('content')
  private realTimeShowContent(){
    import('showdown').then((showdown: any) => {
      const converter = new showdown.Converter()
      this.html = converter.makeHtml(this.content)
    })
  }
}

</script>
<style lang="scss" scoped>
  .components-container {
    margin: 30px 50px;
    position: relative;
  }
</style>