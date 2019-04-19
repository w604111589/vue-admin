<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>{{ !comment_disabled?'评论已打开':'评论已关闭' }}
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding">
      <el-dropdown-item>
        <el-radio-group v-model="comment_disabled" style="padding: 10px;">
          <el-radio :label="1">关闭评论</el-radio>
          <el-radio :label="0">打开评论</el-radio>
        </el-radio-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class Comment extends Vue {

    @Prop({default: 0})
    private value!: number;

    private get comment_disabled() {
      return this.value;
    }

    private set comment_disabled(val: number) {
      this.$emit('input', val);
    }
  }
</script>

<style scoped lang="scss">
  .Comment {

  }
</style>