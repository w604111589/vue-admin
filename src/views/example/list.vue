<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.release_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <!-- <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          /> -->
                    <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            name="star"
          />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <router-link :to="'/components/edit/'+scope.row.id" class="link-type">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link v-if="scope.row.type==1" :to="'/components/medit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">EditM</el-button>
          </router-link>
          <router-link v-else :to="'/components/edit/'+scope.row.id" >
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Pagination from '@/components/Pagination/index.vue';
import { fetchList } from '@/api/article';

@Component({
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status: number) {
      const statusMap: any = {
        published: 'success',
        draft: 'info',
        deleted: 'danger',
      };
      return statusMap[status];
    }
  }
})
export default class ArticleList extends Vue {
  private list: any[] = [];
  private total: number = 0;
  private listLoading: boolean = true;
  private listQuery: any = { page: 1, limit: 20 };

  private created() {
    this.getList();
  }

  private getList() {
    this.listLoading = true;
    fetchList(this.listQuery).then((response: any) => {
      this.list = response.data.items;
      this.total = response.data.total;
      this.listLoading = false;
    });
  }

  private handleSizeChange(val: number) {
    this.listQuery.limit = val;
    this.getList();
  }

  private handleCurrentChange(val: number) {
    this.listQuery.limit = val;
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
