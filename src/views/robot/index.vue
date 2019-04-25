<template>
  <div class="app-container">
    <div class="table-title">
      <div class="table-title-div">
        <el-button type="primary" icon="el-icon-edit" @click="handleLabel('create')">添加标签</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="label_name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status| statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="create_time">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="oper" label="oper">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleLabel('edit',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗区域 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="540px">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="标签名" prop="title">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="状态" prop="title">
          <el-select v-model="temp.status + ''" placeholder="please select label status">
            <el-option label="是" value="1"/>
            <el-option label="否" value="0"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <!-- <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button> -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
          style="width:400px"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLabel , createLabel , updateLabel } from "@/api/log";
import elDragSelect from "@/components/DragSelect/index.vue";

@Component({
  components: {
    elDragSelect
  },
  filters: {
    statusFilter(status: number) {
      const statusMap: string[] = ["禁用", "启用"];
      return statusMap[status];
    }
  }
})
export default class Table extends Vue {
  private list = null;
  private listLoading = false;
  private listQuery = {page: 1 , limit: 10};
  private temp = {
    name: "",
    status: 1
  };

  private dialogFormVisible = false;
  private dialogStatus = "";
  private textMap = { update: "Edit", create: "Create" };
  private rules = {};
  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.listLoading = true;
    getLabel(this.listQuery).then(response => {
      this.list = response.data.items;
      this.listLoading = false;
    });
  }

  private handleLabel(type: string, data?: any) {
    if (type === "edit") {
      console.log(data);
      this.temp = data;
    } else {
      this.resetTemp();
    }
    this.dialogStatus = type;
    this.dialogFormVisible = true;
  }

  private createData() {
    createLabel(this.temp).then(() => {
      this.dialogFormVisible = false;
      this.fetchData();
      this.$notify({
        title: "成功",
        message: "创建成功",
        type: "success",
        duration: 2000
      });
    });
  }

  private updateData() {
    updateLabel(this.temp).then(() => {
      this.dialogFormVisible = false;
      this.fetchData();
      this.$notify({
        title: "成功",
        message: "创建成功",
        type: "success",
        duration: 2000
      });
    });
  }

  private resetTemp() {
    this.temp = {
      name: "",
      status: 1
    };
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  margin-bottom: 20px;
}
.table-title-div:first-child {
  margin-left: 0;
}
.table-title-div {
  margin-left: 30px;
  display: inline-block;
}
</style>
