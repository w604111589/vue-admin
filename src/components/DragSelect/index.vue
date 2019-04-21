<template>
    <el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" multiple v-on="$listeners">
    <slot/>
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import Sortable from "sortablejs";

@Component
export default class dragSelect extends Vue {
  @Prop({ required: true })
  private value!: any[];

  private sortable: any;

  private get selectVal() {
    return [...this.value];
  }
  private set selectVal(val) {
    this.$emit("input", [...val]);
  }

  private mounted() {
    this.setSort();
  }

  private setSort() {
    const el = (this.$refs.dragSelect as any).$el.querySelectorAll(
      ".el-select__tags > span"
    )[0];
    this.sortable = Sortable.create(el, {
      ghostClass: "sortable-ghost", // Class name for the drop placeholder,
      setData: function(dataTransfer: any) {
        dataTransfer.setData("Text", "");
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      },
      onEnd: (evt: any) => {
        const targetRow = this.value.splice(evt.oldIndex, 1)[0];
        this.value.splice(evt.newIndex, 0, targetRow);
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.drag-select >>> .sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}

.drag-select >>> .el-tag{
  cursor: pointer;
}
</style>