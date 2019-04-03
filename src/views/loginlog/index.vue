<template>
  <div class="app-container log">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="login_ip">
        <template slot-scope="scope">
          {{ scope.row.login_ip }}
        </template>
      </el-table-column>
			<el-table-column align="center" label="login_address">
        <template slot-scope="scope">
          {{ scope.row.login_ip }}
        </template>
      </el-table-column>
      <el-table-column label="login_user_type">
        <template slot-scope="scope">
          {{ scope.row.login_user_type }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="login_datetime" label="create_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.login_datetime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { getLog } from '@/api/log';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class logIndex extends Vue {
  	private list = [];
  	private listLoading = true;
		private listQuery = {};
	  
		private created() {
    	this.fetchData();
  	}

 		private fetchData() {
    	this.listLoading = true;
    	getLog(this.listQuery).then((response) => {
      	this.list = response.data;
				this.listLoading = false;
			});
		}		
		
  }
  
</script>

<style scoped lang="scss">
  // .log {
		
  // }
</style>