<template>
	<div class="myself">
		<div class="self-header">
			<div class="infobtn">个人中心</div>
		</div>
		<div class="register" @click="regiserBtn">
			注册
		</div>
		<div class="login" @click="loginBtn">
			登录
		</div>
		<div class="logout" >
			退出登录
		</div>
		<div class="login-page" v-show="login">
			<div class="login-header">
			<span class="back" @click="comebacklogin">&lt;</span>足球圈 一 登录</div>
			<div class="phone">
				<appinput :type="'text'" :ph="'手机号'"></appinput>
			</div>
			<div class="pwd">
				<appinput :type="'password'" :ph="'密码'"></appinput>
			</div>
			<p class="login-info">还没有账号？点击此处立即<span>注册</span></p>
				<button class="login-btn">提交</button>
		</div> 
		<div class="register-page" v-show="register">
			<div class="register-header">
			<span class="back" @click="comebackregister">&lt;</span>足球圈 一 注册</div>
			<div class="register-content">
				<div class="inputbox">
				<appinput :type="'text'" :ph="'手机号'"></appinput>
				</div>
				<div class="inputbox">
				<appinput :type="'password'" :ph="'密码'"></appinput>
				</div>
				<div class="inputbox">
				<appinput :type="'text'" :ph="'昵称'"></appinput>
				</div>
				<div class="inputbox">
				<button class="register-btn">提交</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import appinput from '@/components/input/input';
	export default {
		data(){
			return {
				login:false,
				register:false
			}
		},
		components:{
			appinput
		},
		methods:{
			loginBtn(){
				this.login = true;
			},
			regiserBtn(){
				this.register = true;
			},
			comebacklogin(){
				this.login = false;
			},
			comebackregister(){
				this.register = false;
			}
			
		}
	}
</script>

<style scoped>
	.myself{
		width: 100%;
		height: 100%;
	}
	.self-header{
		height: 0.88rem;
		line-height: 0.88rem;
		width: 100%;
		position: fixed;
		z-index: 5;
		top: 0;
		font-size: 0.34rem;
		text-align: center;
		color: #fff;
		background: #0cc440;
	}
	.login,.register,.logout{
		width: 5.8rem;
		height: 0.9rem;
		border-radius: 0.1rem;
		background: #0cc440;
		text-align: center;
		line-height: 0.9rem;
		font-size: 0.32rem;
		color: #fff;
		cursor: pointer;
		margin:  0 auto;
		margin-bottom: 0.2rem;
	}
	.register{
		margin-top: 2rem;
	}
	.login-page,.register-page{
		width: 100%;
		height: 13.28rem;
		position: absolute;
		z-index: 6;
		left: 0;
		top:0rem;
		background:#fff;
		backdrop-filter:blur(10px);
	}
	.register-page .register-header,.login-page .login-header{
		height: 0.88rem;
		line-height: 0.88rem;
		width: 100%;
		position: fixed;
		z-index: 7;
		top: 0;
		font-size: 0.34rem;
		text-align: center;
		color: #fff;
		background: #0cc440;
	}
	.register-page .register-header .back,.login-page .login-header .back{
		width: 0.4rem;
		height: 0.4rem;
		padding: 0.1rem;
		position:absolute;
		left: 0.2rem;
		color: #fff;
		font-size: 0.5rem;
		text-align: center;
		line-height: 0.34rem;
		border-radius: 50%;
		background: rgba(0,0,0,0.5);
		top: 50%;
		margin-top: -0.3rem;
	}
	.login-page .phone,.login-page .pwd{
		margin-left: 0.64rem;
		margin-top: 0.26rem;
	}
	.login-page .login-info{
		width: 100%;
		margin-left: 0.64rem;
		line-height: 1.28rem;
		color:#b5b5b5;
		font-size: 0.24rem;
	}
	.login-page .login-info span{
		color: #e2faec;
	}
	.login-page .login-btn,.register-page .register-btn{
		width: 6rem;
		height: 0.94rem;
		border-radius: 0.1rem;
		background: #0cc440;
		text-align: center;
		color: #fff;
		letter-spacing: 0.1rem;
		line-height: 0.94rem;
		font-size: 0.34rem;
		margin-left: 0.64rem;
		outline: none;
		border: none;
	}
	.register-page .register-btn{
		margin-left: 0;
	}
	.register-page .register-content{
		width: 100%;
		box-sizing: border-box;
		padding-left: 0.64rem;
	}
	.register-page .register-content .inputbox{
		margin-top: 0.24rem;
	}
	.register-page .register-content .inputbox:last-child{
		margin-top: 0.6rem;
	}
</style>