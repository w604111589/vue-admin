<template>
  <div id="app">
    <Header/>
    <div>
      <router-view/>
    </div>


  </div>
</template>

<script lang="ts">

  import Header from "@/views/header/Index.vue";
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    components: {
      Header,
    },
  })
  export default class App extends Vue {}
</script>
