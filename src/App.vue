<template>
  <div id="app">
    <Header/>
    <div>
      <router-view/>
    </div>
    <Chat/>
  </div>
</template>

<script lang="ts">

  import Header from '@/views/header/Index.vue';
  import Chat from '@/views/chat/chat.vue';
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    components: {
      Header,
      Chat,
    },
  })
  export default class App extends Vue {}
</script>
