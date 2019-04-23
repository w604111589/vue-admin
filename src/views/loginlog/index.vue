<template>
  <div class="app-container log">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="username">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column align="center" label="login_ip">
        <template slot-scope="scope">{{ scope.row.login_ip }}</template>
      </el-table-column>
      <el-table-column align="center" label="login_address">
        <template slot-scope="scope">{{ scope.row.login_address }}</template>
      </el-table-column>

      <el-table-column label="status">
        <template slot-scope="scope">{{ scope.row.login_status |statusFilter }}</template>
      </el-table-column>
      <el-table-column label="status_reason">
        <template slot-scope="scope">{{ scope.row.login_reason }}</template>
      </el-table-column>
      <el-table-column align="center"  label="login_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script lang="ts">
import { getLog } from '@/api/log';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Pagination from '@/components/Pagination/index.vue';

@Component({
  filters: {
    statusFilter(status: number) {
      const statusMap: any = ["登陆失败", "登陆成功"];
      return statusMap[status];
    },
  },
  components: {
    Pagination,
  },

})
export default class logIndex extends Vue {

  private list = [];
  private total: number = 1;
  private listLoading: boolean = true;
  private listQuery: any = { page: 1, limit: 20 };

  private created() {
    this.fetchData();
  }

  private fetchData(params?: any) {
    if (params) {
      this.listQuery = params;
    }
    this.listLoading = true;
    getLog(this.listQuery).then( (response: any) => {
      this.list = response.data.items;
      this.total = response.data.total;
      this.listLoading = false;
    });
  }
}
</script>

<style scoped lang="scss">
// .log {

// }
</style>