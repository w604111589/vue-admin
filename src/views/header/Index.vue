<template>
  <div class="header" v-if="show">
	  <div class="header-title">
			<div class="web-name">
				<div class="left div-one">
					<img src="../../assets/img/logo.png" alt="" >
					<span>{{$t('header.plat_name')}}</span>
				</div>
				<div class="left div-two">
					<ul class="header-ul ">
						<!-- <li> 
							<router-link to="/" @click="changeCategory('Home')" >首页</router-link>
						</li>
						<li> <router-link to="/exchange" @click="changeCategory('exchange')" >交易所</router-link> </li>
						<li> <router-link to="/robot"  @click="changeCategory('robot')">机器人</router-link> </li> -->
						<li> 
							<span @click="changeCategory('home','/')" :class="menuType == 'home'? 'header-style':''" >{{$t('route.dashboard')}}</span>
						</li>
						<li> <span @click="changeCategory('exchange','/form')" :class="menuType == 'exchange'? 'header-style':''" >{{$t('header.exchange')}}</span> </li>
						<li> <span  @click="changeCategory('robot','/robot')" :class="menuType == 'robot'? 'header-style':''">{{$t('header.robot')}}</span> </li>
					</ul>
				</div>
				<div class="right">
					<ul class="header-ul">
						<li><img src="../../assets/img/user_img.png" width="26" height="26" class="header-ul-img"> {{name}} </li>
						<li>
							<el-dropdown trigger="click" @command= "changeLanguage">
  							<span class="el-dropdown-link">
    							{{langName}}<i class="el-icon-arrow-down el-icon--right"></i>
  							</span>
  							<el-dropdown-menu slot="dropdown">
    							<el-dropdown-item :disabled="language==='zh'" command="zh"> 简体中文</el-dropdown-item>
									<el-dropdown-item :disabled="language==='en'" command="en"> English </el-dropdown-item>
									
  							</el-dropdown-menu>
							</el-dropdown>
						</li>
								
						<li @click="logout">{{$t('header.loginout')}}</li>
					</ul>
				</div>
			</div>
		</div>

  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import  util from '@/utils/session';
import { UserModule } from '@/store/modules/user';
import Session from '@/utils/session';
@Component
export default class HeaderIndex extends Vue {

	// private show: boolean = true;
	private menuType = 'home';
	private language = Session.get('language') || 'zh';
	private langName = "简体中文";
	created() {
		if(this.language){
			this.getlangName(this.language);
		}
	}

	private getlangName(val: string){
		let lang: string;
		switch (val){
			case 'zh':
				lang = "简体中文";
				break;
			case 'en':
				lang = "English"	;
				break;
			default:
				lang = "简体中文";
		}
		this.langName = lang;
	}

	get name() {
		return UserModule.name;
	}
	
	//计算属性（等同与computed）
	get show(): boolean{
		const currentRoute = this.$route.path
		if(currentRoute == "/login" || currentRoute == "/register" ){
			return false;
		}
		return true;
		
	}

	private changeCategory(str: string, path: string): void{
		util.set('category',str)
		this.menuType = str;
		this.go(path)
	}
	private go(path: string, params?: any) {
    if(params) {
      this.$router.push({
        path: path,
        query: {
          activeName: params
        }
      });
    } else {
      this.$router.push({ path: path });
    }
	}
	private logout() {
    UserModule.FedLogOut().then(() => {
      this.go("/login");
      // location.reload();  // 为了重新实例化vue-router对象 避免bug
    });
	}
	
	private changeLanguage(val: string){
		this.$i18n.locale = val;
		this.language = val;
		this.getlangName(val);
		Session.set('language',val);
	}
}
</script>

<style scoped lang="scss">
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.header-title {
		position: fixed;
		background: #1f2d3d;
		height:60px;
		width:100%;
		text-align: left;
		z-index: 100;
	}
	.web-name .div-one img{
		position: relative;
		top:12px;
		width:32px;
		height:32px;
	}
	.web-name .div-one span{
		position: relative;
		top:3px;
		margin-left:8px;
		font-size:16px;
		color:#fff;
	}
	.div-one{
		margin-left: 30px;
	}
	.div-two{
		margin-left: 40px;
	}
	.header-ul{
		list-style: none;
		margin-top: 0px;
	}
	.header-ul li{
		float: left;
    margin: 0 15px;
    cursor: pointer;
    color: #D7E0F5;
		font-size: 14px;
		height:60px;
		line-height:60px;
	}
	.header-ul li:hover{
		color:#22A8EE
	}
	a{
		color:#D7E0F5;
	}
	a:hover{
		color:#22A8EE;
	}
	.index-content{
		width:150px;
	}
	.index-content div{
		height: 40px;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
	}
	.index-content div:hover{
		background: #F2F5FA;
		color:#22A8EE;
	}
	.el-dropdown{
		color:#22A8EE;
	}
	.header-ul-img{
		position: relative;
		top:8px;
		margin-right:5px;
	}
	.header-style{
		color:#22A8EE;
	}
</style>