<template>
  <div class="app-container message">
	<el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="message_id">
        <template slot-scope="scope">
          {{ scope.row.message_id }}
        </template>
      </el-table-column>
			<el-table-column align="center" label="content">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="state">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="login_datetime" label="create_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
		<div class="hc-pagination">
    	<el-pagination
          :current-page.sync="pages.pageNum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="pages.total"
          layout="prev, pager, next, jumper">
    	</el-pagination>
		</div>

  </div>
</template>

<script lang="ts">
  import { getMessage } from '@/api/log';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class messageIndex extends Vue {
    private list = [];
    private listLoading = true;
    private listQuery = {};
    private pages = {pageSize: 10,pageNum: 1,total: 0};

    private created() {
      this.fetchData();
    }

     private fetchData() {
      this.listLoading = true;
      getMessage(this.listQuery).then((response) => {
        this.list = response.data;
        this.listLoading = false;
      });
    }
    // 当分页变动时调用的函数
    private handleSizeChange(val: any) {
          this.fetchData();
    }

     private handleCurrentChange(val: any) {
          this.fetchData();
    }
  }
</script>

<style scoped lang="scss">
	.hc-pagination{
		margin-top:20px;
		text-align: center; 
	}
</style>