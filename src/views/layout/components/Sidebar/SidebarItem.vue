<template>
  <div v-if="(!item.meta || !item.meta.hidden) " :class="['menu-wrapper', collapse ? 'simple-mode' : 'full-mode', {'first-level': !isNest}]">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.meta.noShowingChildren)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon" />
          <svg-icon v-else-if="item.meta && item.meta.icon" :name="item.meta.icon" />
          <!-- <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
          <span v-else-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span> -->

          <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
          <span v-else-if="item.meta && item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span> 
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>
      <template>
        <div v-for="child in item.children" :key="child.path" >
          <div v-if="!child.hidden">
            <sidebar-item 
              v-if=" child.children&&child.children.length>0"
              :is-nest="true"
              :item="child"
              :key="child.path"
              :base-path="resolvePath(child.path)"
              :collapse="collapse"
              class="nest-menu"/>
            <app-link v-else :to="resolvePath(child.path)" :key="child.name">
              <el-menu-item :index="resolvePath(child.path)">
                 <template slot="title">
                  <svg-icon v-if="child.meta && child.meta.icon" :name="child.meta.icon" />
                  <span v-if="child.meta && child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
                </template>
              </el-menu-item>
            </app-link>
          </div>

        </div>
  
      </template>

 
    </el-submenu>

  </div>
</template>

<script lang="ts">
import path from 'path';
import { Route } from 'vue-router';
import { isExternal } from '@/utils/validate';
import { Component, Vue, Prop } from 'vue-property-decorator';
import AppLink from './Link.vue';
@Component({
  name: 'SidebarItem',
  components: {
    AppLink,
  },
})
export default class SidebarItem extends Vue {
  @Prop({ required: true }) private item!: Route;
  @Prop({ default: false }) private isNest!: boolean;
  @Prop({ default: false }) private collapse!: boolean;
  @Prop({ default: '' }) private basePath!: string;

  private onlyOneChild: Route | null = null;

  private hasOneShowingChild(children: Route[], parent: Route) {
    let showingChildren: Route[] = [];
    if (children) {
      showingChildren = children.filter((item: Route) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
    }

    if (showingChildren.length === 1) {
      return true;
    } else if (showingChildren.length === 0) {
      this.onlyOneChild = { ...parent, path: '', meta: { noShowingChildren: true } };
      return true;
    }

    this.onlyOneChild = null;
    return false;
  }
  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    return path.resolve(this.basePath, routePath);
  }

  private generateTitle(title: string){
    const hasKey = this.$te('route.' + title)

    if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle = this.$t('route.' + title)
      return translatedTitle
    }
    return title
  } 
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding-left: 10px !important;
      position: relative;

      .el-tooltip {
        padding: 0 10px !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding-left: 10px !important;

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>
