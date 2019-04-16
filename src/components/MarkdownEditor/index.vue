<template>
  <div :style="{ width:width, height:height,zIndex:zIndex}" class="simplemde-container">
    <textarea :id="id"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import SimpleMDE from 'simplemde';
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'

@Component
export default class MarkdownEditer extends Vue {
  @Prop({ required: true }) private value!: string;
  @Prop({ default: 'markdown-editor-'+new Date(), required: false }) private id!: string;
  @Prop({ default: false }) private autofocus!: boolean;
  @Prop({ default: '' }) private placeholder!: string;
  @Prop({ default: '100%' }) private width!: string;
  @Prop({ default: '100%' }) private height!: string;
  @Prop({ default: 10 }) private zIndex!: number;
  @Prop({ default: '' }) private toolbar!: any;

  private simplemde: any = null;
  private hasChange: boolean = false;

  @Watch('value')
  private onValueChange(val: string) {
    if (val === this.simplemde.value() && !this.hasChange) return;
    this.simplemde.value(val);

  }

  private mounted(){
    
    this.simplemde = new SimpleMDE({
      element: document.getElementById(this.id),
      autoDownloadFontAwesome: false,
      autofocus: this.autofocus,
      toolbar: this.toolbar.length > 0 ? this.toolbar : undefined,
      spellChecker: false,
      insertTexts: {
        link: ['[', ']( )']
      },
      // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
      placeholder: this.placeholder
    })
    if (this.value) {
      this.simplemde.value(this.value)
    }

    this.simplemde.codemirror.on('change', () => {
      if (this.hasChange) {
        this.hasChange = true
      }
      this.$emit('input', this.simplemde.value())
    })
  }

  private destroyed(){
    this.simplemde.toTextArea()
    this.simplemde = null
  }


}

</script>
<style>
  .editor-toolbar{
    border-top-right-radius:0px;
  }

</style>


<style lang="scss" scoped>
  .simplemde-container>>>.CodeMirror {
    min-height: 150px;
    line-height: 20px;
  }
  .simplemde-container>>>.CodeMirror-scroll {
    min-height: 150px;
  }

  .simplemde-container>>>.CodeMirror-code {
    padding-bottom: 40px;
  }

  .simplemde-container>>>.editor-statusbar {
    display: none;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-link {
    color: #1890ff;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-string.cm-url {
    color: #2d3b4d;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
    padding: 0 2px;
    color: #E61E1E;
  }
  .simplemde-container >>> .editor-toolbar.fullscreen,
  .simplemde-container >>> .CodeMirror-fullscreen {
    z-index: 1003;
  }
</style>