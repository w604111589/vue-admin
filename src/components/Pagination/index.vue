<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { scrollTo } from '@/utils/scrollTo';

@Component
export default class Pagination extends Vue {
  @Prop({required: true}) private total!: number;
  @Prop({required: true}) private page!: number;
  @Prop({required: true}) private limit!: number;
  @Prop({default: () => [10, 20, 30, 50]}) private pageSizes!: number[];
  @Prop({default: 'total, sizes, prev, pager, next, jumper'}) private layout!: string;
  @Prop({default: true}) private background!: boolean;
  @Prop({default: true}) private autoScroll!: boolean;
  @Prop({default: false}) private hidden!: boolean;

  private get currentPage() {
    return this.page;
  }
  private set currentPage(val) {
    this.page = val;
  }

  private get pageSize() {
    return this.limit;
  }

  private set pageSize(val){
    this.limit = val;
  }


  private handleSizeChange(val: number) {
    this.$emit('pagination', { page: this.currentPage, limit: val });
    if (this.autoScroll) {
      scrollTo(0, 800);
    }
  }

  private handleCurrentChange(val: number) {
    this.$emit('pagination', { page: val, limit: this.pageSize });
    if (this.autoScroll) {
      scrollTo(0, 800);
    }
  }

}

</script>
<style lang="scss" scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }
  .pagination-container.hidden {
    display: none;
  }
</style>