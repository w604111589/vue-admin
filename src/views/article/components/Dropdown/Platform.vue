<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      平台({{ platforms.length }})
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-border">
      <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
        <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class Platform extends Vue {

    @Prop({default: () => []})
    private value!: any[];

    private platformsOptions: any[] =  [
        { key: 'a-platform', name: 'a-platform' },
        { key: 'b-platform', name: 'b-platform' },
        { key: 'c-platform', name: 'c-platform' },
      ];

    private get platforms(){
      return this.value;
    }

    private set platforms(val: any[]) {
      this.$emit('input', val);
    }
  }
</script>

<style scoped lang="scss">
  .Platform {

  }
</style>