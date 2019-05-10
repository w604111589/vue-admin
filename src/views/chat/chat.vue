<template>
  <div class="chat">
    <div @click="show(true)" v-show="!flag" class="chat-button">
      <img src="../../assets/img/logo.png" alt>
    </div>
    <div class="chat-content">
      <div class="content" v-show="flag">
        <div class="title" @click="show(false)">
          <div class="left">天涯行(welcome)</div>
          <div class="right">
            <svg-icon name="reduce"></svg-icon>
          </div>
        </div>
        <div class="list" ref="chat">
          <div v-for="item in arr">
            <div v-if="item.sender == 'system'" class="con_mid">
              <span>{{item.content}}</span>
            </div>
            <div v-else-if="item.sender == userId" class="con_left">
              <svg-icon name="user"></svg-icon>
              <div class="triangle_border_left">
                <span></span>
              </div>
              <div class="msg-container">{{item.content}}</div>
            </div>
            <div v-else class="con_right">
              <div class="triangle_border_right">
                <span></span>
              </div>
              <div class="msg-container">{{item.content}}</div>
              <svg-icon name="user"></svg-icon>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea"
            @keyup.enter.native="send"
          ></el-input>
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
  private textarea = "";
  private userId = "0";
  private mounted() {
    this.onlyOne();
    this.initWebsocket();
  }

  private onlyOne() {
    this.userId = "wt" + Math.random() + new Date().getTime();
  }

  private show(bool: boolean) {
    this.flag = bool;
  }

  private send() {
    const data = {
      sender: this.userId,
      content: this.textarea
    };
    this.conn.send(JSON.stringify(data));
    this.clear();
  }

  private clear() {
    this.textarea = "";
  }

  private initWebsocket() {
    const url = "ws://62.234.14.42:8088/chat/ws";
    this.conn = new WebSocket(url);
    this.conn.onopen = (event: any) => {
      console.log("WebSocket:已连接");
    };
    this.conn.onmessage = (event: any) => {
      // this.arr.push(event.data);
      // console.log(event.data)
      const backData = JSON.parse(event.data);
      this.arr.push(backData);
      this.onResize();
      // console.log(backData)
    };
    this.conn.onerror = (event: any) => {
      console.log("WebSocket:发生错误");
    };
    this.conn.onclose = (event: any) => {
      console.log("WebSocket:已关闭");
    };
  }

  private onResize() {
    this.$nextTick(() => {
      const div = (this.$refs as any).chat;
      div.scrollTop = div.scrollHeight;
    });
  }
}
</script>

<style>
.chat .el-textarea__inner {
  border: none;
}
</style>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
.chat {
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 200;
  // border: 1px solid #ccc;
  // width:300px;
  // height: 400px;
  // background: #fff;
  .content {
    position: relative;
    width: 600px;
    height: 560px;
    .title {
      @include clearfix;
      background: #375679;
      padding-left: 10px;
      height: 50px;
      line-height: 50px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #fff;

      cursor: pointer;
      .left {
        float: left;
      }
      .right {
        float: right;
        margin-right: 15px;
      }
    }
    .list {
      background: #f4f7fa;
      width: 100%;
      padding-left: 20px;
      padding-top: 20px;
      height: 350px;
      font-size: 14px;
      overflow-y: scroll;
      .con_mid {
        width:100%;
        float: left;
        text-align: center;
        margin: 8px 0 0;
        span {
          display: inline-block;
          background: #c9ced3;
          padding: 5px 10px;
          border-radius: 5px;
        }
      }
      .con_left {
        width: 100%;
        margin-top: 10px;
        float: left;
        position: relative;
      }
      .con_right {
        width: 100%;
        margin-top: 10px;
        position: relative;
        text-align: right;
        float: right;
      }
      .msg-container {
        background: #fff;
        display: inline-block;
        border-radius: 6px;
        margin-left:15px;
        margin-right:15px;
        padding: 10px;
        max-width: 80%;
        min-width: 20px;
        min-height: 20px;
        vertical-align: middle;
        text-align: left;
        font-size: 13px;
        word-wrap: break-word;
        white-space: normal;
      }
    }
    .chat-input {
      width: 100%;
      height: 120px;
      background: #fff;
      border-top: 1px solid #ccc;
    }
  }
  .chat-button {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 1px solid #ccc;
    background: #1f2d3d;
    color: #fff;
    cursor: pointer;
    img {
      position: relative;
      top: 10px;
      left: 12px;
    }
  }
}
.triangle_border_left {
  width: 0;
  height: 0;
  border-width: 10px 10px 10px 0;
  border-style: solid;
  margin: 40px auto;
  display: inline-block;
  position: absolute;
  top: -35px;
  left: 20px;
  border-color: transparent #fff transparent #fff;
}

.triangle_border_right{
    width:0;
    height:0;
    border-width:10px 0 10px 10px;
    border-style:solid;
    margin:40px auto;
    position:absolute;
    display: inline-block;
    top:-36px;
    right:20px;
    border-color:transparent #fff transparent #fff;
  }
</style>