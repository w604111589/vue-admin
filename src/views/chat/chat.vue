<template>
  <div class="chat">
    <div @click="show(true)" v-show="!flag" class="chat-button">chat</div>
    <div class="chat-content">
      <div class="content" v-show="flag">
        <div class="del"  @click="show(false)">X</div>
        <div class="list">
          <div v-for="item in arr"  >{{item}}</div>
        </div>

      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Chat extends Vue {
  private conn: any;
  private arr: string[] = [];
  private flag = false;
  private mounted() {
    this.initWebsocket();
  }

  private show(bool:boolean) {
    this.flag = bool
  }

  private initWebsocket() {
    const url = "ws://localhost:9001/chat/ws";
    this.conn = new WebSocket(url);
    this.conn.onopen = (event: any) => {
      console.log("WebSocket:已连接");
    };
    this.conn.onmessage = (event: any) => {
      this.arr.push(event.data)
      // console.log(event.data)
      // const backData = JSON.parse(event.data);
      // console.log(backData)
    };
    this.conn.onerror = (event: any) => {
      console.log("WebSocket:发生错误");
    };
    this.conn.onclose = (event: any) => {
      console.log("WebSocket:已关闭");
    };
  }


}
</script>

<style scoped lang="scss">

.chat {
  position: fixed;
  left:10px;
  bottom:10px;
  // border: 1px solid #ccc;
  // width:300px;
  // height: 400px;
  // background: #fff;
  .content {
    position: relative;
    width:200px;
    height:300px;
    .del {
      background:#ccc;
      text-align: right;
      padding-right:10px;
      cursor: pointer;
    }
    .list{
      width:100%;
      padding-top:20px;
      height:280px;
      overflow-y: scroll;
      }
  }
  .chat-button{
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 30px;
    border:1px solid #ccc;
    background: #fff;
    cursor: pointer;
  }
}
</style>