<template>
  <article-detail :is-edit="true"/>
</template>

<script lang="ts">

import { Component, Vue} from 'vue-property-decorator';
import ArticleDetail from './components/ArticleDetail.vue';

@Component({
  name: 'EditForm',
  components:{ ArticleDetail }
})
export default class EditForm extends Vue {

}

</script>
<style lang="scss" scoped>

</style>

