<template>
  <div class="header" v-if="show">
    <div class="header-title">
      <div class="web-name">
        <div class="left div-one">
          <img src="../../assets/img/logo.png" alt>
          <span>{{$t('header.plat_name')}}</span>
        </div>
        <div class="left div-two">
          <ul class="header-ul">
            <li>
              <span
                @click="changeCategory('home','/')"
                :class="menuType == 'home'? 'header-style':''"
              >{{$t('route.dashboard')}}</span>
            </li>
            <li>
              <span
                @click="changeCategory('store','/store')"
                :class="menuType == 'store'? 'header-style':''"
              >商城</span>
            </li>

            <li>
              <span
                @click="changeCategory('exchange','/form')"
                :class="menuType == 'exchange'? 'header-style':''"
              >{{$t('header.exchange')}}</span>
            </li>
            <li>
              <span
                @click="changeCategory('console','/components/list')"
                :class="menuType == 'console'? 'header-style':''"
              >{{$t('header.robot')}}</span>
            </li>

            <li>
              <span
                @click="changeCategory('course','/course')"
                :class="menuType == 'course'? 'header-style':''"
              >文档</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <ul class="header-ul">
            <li v-show="token">
              <!-- <img src="../../assets/img/user_img.png" width="26" height="26" class="header-ul-img"> -->
              <img :src="avatar" width="26" height="26" class="header-ul-img">
              {{name}}
            </li>
            <li>
              <el-dropdown trigger="click" @command="changeLanguage">
                <span class="el-dropdown-link">
                  {{langName}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :disabled="language==='zh'" command="zh">简体中文</el-dropdown-item>
                  <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>

            <li @click="logout" v-show="token">{{$t('header.loginout')}}</li>
            <li @click="go('/login')" v-show="!token">登陆</li>
            <li style="margin-left:0px;margin-right:0px;" v-show="!token">|</li>
            <li @click="go('/register')" v-show="!token">注册</li>
            <!-- <li><span @click="go('/login')">登陆</span> | <span @click="go('/register')">注册</span></li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import util from '@/utils/session';
import { UserModule } from '@/store/modules/user';
import Session from '@/utils/session';
import { getToken } from '@/utils/auth';

@Component
export default class HeaderIndex extends Vue {
  private menuType = 'home';
  private language = Session.get('language') || 'zh';
  private langName = '简体中文';
  private created() {
    if (this.language) {
      this.getlangName(this.language);
    }
  }

  private mounted(){
    const token = getToken();
    if(token){
     UserModule.setToken(token) ;
      // UserModule.token = token;
    }
  }

  private getlangName(val: string) {
    let lang: string;
    switch (val) {
      case 'zh':
        lang = '简体中文';
        break;
      case 'en':
        lang = 'English';
        break;
      default:
        lang = '简体中文';
    }
    this.langName = lang;
  }

  private get name() {
    return UserModule.name;
  }

  private get avatar() {
    return UserModule.avatar;
  }

  private get token() {
    return UserModule.token;
  }


  // 计算属性（等同与computed）
  private get show(): boolean {
    const currentRoute = this.$route.path;
    // if (currentRoute === '/login' || currentRoute === '/register') {
    //   return false;
    // }
    return true;
  }

  private changeCategory(str: string, path: string): void {
    util.set('category', str);
    this.menuType = str;
    this.go(path);
  }
  private go(path: string, params?: any) {
    if (params) {
      this.$router.push({
        path,
        query: {
          activeName: params,
        },
      });
    } else {
      this.$router.push({ path });
    }
  }
  private logout() {
    UserModule.FedLogOut().then(() => {
      this.go('/login');
      // location.reload();  // 为了重新实例化vue-router对象 避免bug
    });
  }

  private changeLanguage(val: string) {
    this.$i18n.locale = val;
    this.language = val;
    this.getlangName(val);
    Session.set('language', val);
  }
}
</script>

<style scoped lang="scss">
.left {
  float: left;
}
.right {
  float: right;
}
.header-title {
  position: fixed;
  background: #1f2d3d;
  height: 60px;
  width: 100%;
  text-align: left;
  z-index: 5;
}
.web-name .div-one img {
  position: relative;
  top: 12px;
  width: 32px;
  height: 32px;
}
.web-name .div-one span {
  position: relative;
  top: 3px;
  margin-left: 8px;
  font-size: 16px;
  color: #fff;
}
.div-one {
  margin-left: 30px;
}
.div-two {
  margin-left: 40px;
}
.header-ul {
  list-style: none;
  margin-top: 0px;
}
.header-ul li {
  float: left;
  margin: 0 15px;
  cursor: pointer;
  color: #d7e0f5;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
}
.header-ul li:hover {
  color: #22a8ee;
}
a {
  color: #d7e0f5;
}
a:hover {
  color: #22a8ee;
}
.index-content {
  width: 150px;
}
.index-content div {
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.index-content div:hover {
  background: #f2f5fa;
  color: #22a8ee;
}
.el-dropdown {
  color: #22a8ee;
}
.header-ul-img {
  position: relative;
  top: 8px;
  margin-right: 5px;
}
.header-style {
  color: #22a8ee;
}
</style>