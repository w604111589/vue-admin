<template>
  <article-detail :is-edit="false"/>
</template>

<script lang="ts">

import { Component, Vue} from 'vue-property-decorator';
import ArticleDetail from './components/ArticleDetail.vue'

@Component({
  components:{
    ArticleDetail
  }
})
export default class CreateForm extends Vue {
  private mounted(){
    console.log(31231);
  }
}

</script>
<style lang="scss" scoped>

</style>
