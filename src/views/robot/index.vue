<template>
  <div class="app-container">

    <el-drag-select v-model="value" style="width:320px;margin-bottom:20px;" multiple placeholder="请选择">
      <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value" />
    </el-drag-select>

    <!-- <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">{{ item }}</el-tag>
    </div> -->
    <!-- <DragSelect v-model="label" /> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="label_name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status"  align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status| statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="create_time" >
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { getLabel } from '@/api/log';
import elDragSelect from '@/components/DragSelect/index.vue';

@Component({
  components:{
    elDragSelect
  },
  filters: {
    statusFilter(status: number) {
      const statusMap: string[] = ['禁用','启用'];
      return statusMap[status];
    },
  },
})
export default class Table extends Vue {
  private list = null;
  private listLoading = false;
  private listQuery = {};
  private value = ['java','php','vue'];
  private options: any[]= [
    {value: 'java', label: 'java'},
    {value: 'php', label: 'php'},
    {value: 'vue', label: 'vue'},
    {value: 'golang', label: 'golang'},
    {value: 'python', label: 'python'},
  ];

  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.listLoading = true;
    getLabel(this.listQuery).then((response) => {
      this.list = response.data.items;
      this.listLoading = false;
    });
  }
}
</script>
