<template>
	<div>
		<div class="app-header clearfix" >
			<div class="header-left">
				<div class="infobtn" @click="changeFlag"></div>
				<div class="hot">热点</div>
			</div>
			<div class="header-right">
				<div class="attention">关注</div>
			</div>
		</div>
		<div class="app-content">
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<div class="app-footer">
			<ul>
				<li  class="footitem">
					<router-link to="index">
					<i class="iconfont icon icon-shouye"></i>
					<span class="text">首页</span>
					</router-link>
				</li>
				<li  class="footitem">
					<router-link to="faxian">
					<i class="iconfont icon icon-iconfont-faxianfaxian"></i>
					<span class="text">发现</span>
					</router-link>
				</li>
				<li  class="footitem">
					<router-link to="myself">
					<i class="iconfont icon icon-wd"></i>
					<span class="text">我的</span>
					</router-link>
				</li>
				<li  class="footitem">
					<router-link to="logout">
					<i class="iconfont icon icon-tuichu"></i>
					<span class="text">退出</span>
					</router-link>
				</li>
			</ul>
		</div>
		<transition name="fly">
			<div class="info" v-show="flag">
				<div class="userbox">
					<img width="100%" height="100%" src="./assets/24133601-1-93X54.jpg" alt="">
				</div>
				<div class="username">萌萌哒小妖精</div>
				<p class="usersay">这家伙很懒,什么也没有留下</p>
				<div class="zqstatus">
					<span>足球现场</span>
					<span>足球生活</span>
					<span>足球美女</span>
				</div>
			</div>
		</transition>	
		<div class="opacity" @click="notShow" v-show="flag"></div>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll';

	export default {
		data(){
			return {
				flag:false
			};
		},
		creted(){
			this.contentScroll = new BScroll(this.$refs.content,{
				click:true,
				probeType:3
			}); 
		},
		methods:{
			changeFlag(){
				this.flag = true;
			},
			notShow(){
				this.flag = false;
			}
		}
	}
</script>

<style scoped>
	.app-header{
		width:100%;
		height: 0.88rem;
		background:#0dc441;
		position:fixed;
		left: 0;
		top: 0;
	}
	.info{
		width: 55%;
		height: 100%;
		background: #225b32;
		opacity: 0.8;
		position: absolute;
		z-index: 100;
		left: 0;
		top: 0;
	}
	.info .userbox{
		margin: 0.5rem auto 0.24rem;
		width: 1.64rem;
		height: 1.64rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.info .userbox img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.info .username{
		width: 100%;
		height: 0.62rem;
		line-height: 0.62rem;
		background: rgba(28,112,52,0.8);
		text-align: center;
		color: #fff;
		font-size: 0.24rem;
	}
	.info  .usersay{
		width: 100%;
		box-sizing: border-box;
		padding: 0.18rem 0.58rem;
		line-height: 0.5rem;
		font-size: 0.2rem;
		color: #9bb99d;
		position: relative;
	}
	.info  .usersay:after{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		border-top:1px solid #628f6e;
		transform:scaleY(0.5);
		-webkit-transform:scaleY(0.5);
	}
	.info  .zqstatus span{
		display: block;
		width: 100%;
		text-align: center;
		line-height: 0.62rem;
		font-size: 0.24rem;
		color: #fff;
		position: relative;
	}
	.info  .zqstatus span:after{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		border-top:1px solid #628f6e;
		transform:scaleY(0.5);
		-webkit-transform:scaleY(0.5);
	}
	.opacity{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.fly-enter-active,.fly-leave-active{
		transition: all 1s;
	}
	.fly-enter,.fly-leave-to{
		transform: translate3d(-100%,0,0);
		opacity: 0;
	}
	.app-header .header-left{
		width: 50%;
		position: relative;
		overflow: hidden;
		float: left;
		height: 100%;
	}
	.app-header .header-left .infobtn{
		position: absolute;
		left: 0.3rem;
		top: 50%;
		height: 0.3rem;
		padding: 0.1rem;
		width: 0.3rem;
		margin-top: -0.25rem;
		border-radius: 0.1rem;
		background: url(assets/anniu.png) no-repeat;
		background-size: 100% 100%;
	}
	.app-header .header-left .hot{
		display: inline-block;
		width: 1.8rem;
		height:0.48rem;
		line-height: 0.48rem;
		position: absolute;
		top: 50%;
		margin-top: -0.24rem;
		right: -0.2rem;
		text-align: center;
		font-size: 0.26rem;
		color: #fff;
		background: #64d985;
		border-radius: 0.24rem;
	}
	.app-header .header-right{
		width: 50%;
		position: relative;
		overflow: hidden;
		float: right;
		height: 100%;
	}
	.app-header .header-right .attention{
		display: inline-block;
		width: 1.8rem;
		height:0.48rem;
		line-height: 0.48rem;
		position: absolute;
		top: 50%;
		margin-top: -0.24rem;
		left: -0.2rem;
		text-align: center;
		font-size: 0.26rem;
		color: #a3e9b7;
		background: #3dd067;
		border-radius: 0.24rem;
	}
	.app-content{
		position: absolute;
		top: 0.88rem;
		bottom: 0.88rem;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.app-footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		height:0.88rem;
		box-sizing: border-box;
		background:#fff;
	}
	.app-footer ul{
		display: flex;
		height: 100%;
	}
	.app-footer ul .footitem{
		flex: 1;
		text-align: center;
	}
	.app-footer ul .footitem a{
		display: block;
		width: 100%;
		height: 100%;
	}
	.app-footer ul .footitem .icon{
		display: inline-block;
		font-size: 0.34rem;
		width: 100%;
		height: 0.34rem;
		line-height: 0.34rem;
		color: #d6d6d6;
		margin-top: 0.1rem;
	}
	.app-footer ul .footitem .text{
		display: inline-block;
		width: 100%;
		height: 0.24rem;
		line-height: 0.24rem;
		margin-top: 0.1rem;
		font-size: 0.24rem;
		text-align:center;
	}
	.app-footer ul .footitem .active{
		color: #0dc441!important;
	}
	.app-footer ul .footitem .active .icon{
		color: #0dc441!important;
	}
</style>