<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->

    <div class="chart-div">
      <div class="dashboard-text">cpu信息：</div>
      <line-marker width="500" height="500px" :list="list" :data="data" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
import LineMarker from '@/components/Charts/lineMarker.vue';
import { fetchCpuList, fetchCpuData} from '@/api/server';

@Component({
  components: {
    LineMarker,
  }
})
export default class Dashboard extends Vue {

  private query: any = {};

  private list: any[] = [];
  private data: any = {};
  private timer: any;
  private get name() {
    return UserModule.name;
  }

  private get roles() {
    return UserModule.role;
  }

  private mounted() {
    this.fetchList();
    this.fetchData();
    const that = this;
    this.timer = setInterval( () => {
      that.fetchData();
      }, 10000);
  }

  // 获取cpu全量的信息
  private fetchList() {
    fetchCpuList( this.query).then( (response: any) => {
      this.list = response.data;
    });
  }

  // 获取cpu增量的信息
  private fetchData() {
    fetchCpuData( this.query).then( (response: any) => {
      this.data = response.data;
    });
  }

  private beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
