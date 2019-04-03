<template>
  <div class="app-container">
    <div class="table-title">
      <div class="table-title-div">
        {{$t('table.title')}}1:
        <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      </div>

      <div class="table-title-div">
        {{$t('table.title')}}2:
        <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      </div>

      <div class="table-title-div">
        <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加用户</el-button>
      </div>

    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="子用户名">
        <template slot-scope="scope">
          {{ scope.row.son_user_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="create_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="状态" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.state | stateFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗区域 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="540px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="子用户名" prop="title">
          <el-input v-model="temp.son_user_name"/>
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input v-model="temp.password"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.password" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <!-- <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button> -->
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" style="width:400px">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { getSonUser,createUser } from '@/api/table';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  filters: {
    statusFilter(status: string) {
      const statusMap: { [id: string]: string } = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      };
      return statusMap[status];
    },
    stateFilter(state: string) {
      const statusMap: any = [
        '正常',
        '锁定'
      ];

      
      return statusMap[state];
    },
  },
})
export default class robotTable extends Vue {
  private list = [];
  private listLoading = true;
  private listQuery = {};
  private dialogFormVisible = false;
  private dialogStatus = '';
  private textMap = {update: 'Edit',create: 'Create'};
  private rules= {};
  private temp = {        
        son_user_name: '',
        password: '',
        };
  private statusOptions= ['published', 'draft', 'deleted'];
  private dialogPvVisible = false;
  private pvData = [];
  

  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.listLoading = true;
    getSonUser(this.listQuery).then((response) => {
      this.list = response.data[0];
      this.listLoading = false;
    });
  }

  private  resetTemp() {
      this.temp = {
        son_user_name: '',
        password: '',
      }
  }
  
  private createData() {
    createUser(this.temp).then(()=>{
      this.dialogFormVisible = false;
      this.fetchData();
      this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
    })
  }

  private  handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        // console.log(this.$refs['dataForm']);
        this.$refs['dataForm'].clearValidate()
      })
  }
}
</script>

<style lang="scss" scoped>

.table-title {
  margin-bottom: 20px;
}
.table-title-div:first-child{
  margin-left:0;
}
.table-title-div{
  margin-left:30px;
  display: inline-block;
}
</style>
