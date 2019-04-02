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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗区域 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"/>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
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
  },
})
export default class ComplexTable extends Vue {
  private list = null;
  private listLoading = true;
  private listQuery = {};
  private dialogFormVisible = false;
  private dialogStatus = '';
  private textMap = {update: 'Edit',create: 'Create'};
  private rules= {};
  private temp = {        
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
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
      console.log(response)
      this.list = response.data;
      this.listLoading = false;
    });
  }

  private  resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
  }
  
  private createData() {
    createUser(this.temp).then(()=>{
      this.dialogFormVisible = false
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
