<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      mode="vertical"
    >
      <sidebar-item v-for="route in getRoutes()" :key="route.path" :item="route" :base-path="route.path" :collapse="collapse"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';
import util from '@/utils/session';
@Component({
  components: {
    SidebarItem,
  },
})
export default class SideBar extends Vue {
  @Prop({ default: false }) private collapse!: boolean;

  get sidebar() {
    return AppModule.sidebar;
  }

  @Watch('$route')
  private getRoutes() {
    const routes = (this.$router as any).options.routes;
    let category = util.get('category');

    if (!category) {
      util.set('category', 'home');
      category = 'home';
    }
    let newRoutes = [];
    for (let val in routes ) {
      if ( routes[val].meta && routes[val].meta.category && routes[val].meta.category === category) {
        newRoutes.push(routes[val]);
      }
    }
    return newRoutes;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>

<style lang="scss">
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;

  .el-scrollbar__view {
    height: 100%;
  }
}

.el-scrollbar__bar {
  &.is-vertical {
    right: 0px;
  }

  &.is-horizontal {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
