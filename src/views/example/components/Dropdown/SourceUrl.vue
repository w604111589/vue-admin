<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      外链
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding no-border" style="width:400px">
      <el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_uri">
        <el-input v-model="source_uri" placeholder="请输入内容">
          <template slot="prepend">填写url</template>
        </el-input>
      </el-form-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class SourceUrl extends Vue {
  @Prop({ default: '' })
  private value!: string;

  private get source_uri() {
    return this.value;
  }

  private set source_uri(val: string) {
    this.$emit('input', val);
  }
}
</script>

<style scoped lang="scss">
  
</style>