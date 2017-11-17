<template>
	<div>
		<div class="myself">
			<div class="infobtn">个人中心</div>
		</div>
		<split></split>
		<div class="content">
			<div class="fx-item clearfix" >
				<div class="avatar"><img width="100%" height="100%" src="./avatar.gif" alt=""></div>
				<div class="user">
					<div class="title">我叫小萌</div>
					<div class="text">我是小萌我怕谁！哈哈哈哈！</div>
				</div>
			</div>
		</div>
		<div class="nav" ref="nav">
			<span v-for="(item,index) in tabs" :class="{'active':index == num}" @click="tab(index)" class="span-item">{{item}}</span>
		</div>
		<transition appear name="fade" mode="out-in">
            <div class="content1" v-if="num==0">
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./06user_02.gif" alt="">
            	</div>
            </div>
            <div class="content2" v-if="num==1">
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./1-150410150532W4.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./962bd40735fae6cdccebb4680db30f2442a70f5f.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./24133601-1-93X54.jpg" alt="">
            	</div>
            	
            </div>
            <div class="content3" v-if="num==2">
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./201701030925252418.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./benbenla-04c.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./benbenla-06c (1).jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./benbenla-06c.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./benbenla-07c.jpg" alt="">
            	</div>

            	<div class="imgbox">
            		<img width="100%" height="100%" src="./benbenla-08c.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./timgES9T0ALG.jpg" alt="">
            	</div>
            	<div class="imgbox">
            		<img width="100%" height="100%" src="./1374616818593.jpg" alt="">
            	</div>
            </div>
         </transition>
         <div class="split">
			<split></split>
		</div>
	</div>
</template>

<script type="text/javascript">
	import split from '@/components/split/split';
	export default {
		components:{
			split
		},
		data(){
			return {
				tabs:['照片（1）','关注（3）','粉丝（8）'],
				num:0
			};
		},
		methods:{
		    tab(index) {
            	this.num = index;
       		}
		}
	}
</script>

<style scoped>
	.myself{
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
	.content{
		width: 100%;
		height: 1.2rem;
		box-sizing: border-box;
	}
 	.content .fx-item{
 		height: 1.5rem;
		box-sizing: border-box;
		padding: 0.26rem 0.24rem 0.24rem 0.24rem;
		border-width:0 0 1px 0  ;
		-webkit-border-image: url(border.png) 2 0 stretch;
		 border-image: url(border.png) 2 0 stretch;
		 position: relative;
 	}
 	.content .fx-item .avatar{
 		width: 0.98rem;
 		height: 0.98rem;
 		overflow: hidden;
 		border-radius: 50%;
 		float: left;
 		margin-right:0.2rem;
 	}
 	.content .fx-item .avatar img{
 		width: 100%;
 		height: 100%;
 	}
 	.content .fx-item .user{
 		display: inline-block;
 	}
 	.content .fx-item .user .title{
 		line-height: 0.48rem;
 		font-size: 0.26rem;
 		color: #000;
 		font-weight: 600;
 	}
 	.content .fx-item .user .text{
 		line-height: 0.42rem;
 		font-size: 0.23rem;
 		color: #d0d0d0;
 	}
 	.nav{
		width: 100%;
		height: 0.72rem;
		box-sizing: border-box;
		position: relative;
		background: #fff;
		opacity: 0.5;
		display: flex;
		z-index: 1;
	}
	.fixed{
		position: fixed;
		left: 0;
		top: 3.98rem;
		z-index: 1;
	}
	.nav:after{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		border-top:1px solid rgba(7,17,27,0.1);
		transform:scaleY(0.5);
		-webkit-transform:scaleY(0.5);
	}
	.nav .span-item{
		flex: 1;
		border-bottom: 2px solid transparent;
		line-height: 0.72rem;
		text-align: center;
		color: #666;
		font-size: 0.27rem;
		cursor: pointer;
	}
	.nav .active{
		border-color: #0dc441;
		color: #0dc441;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all .5s
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	  transform: translate3d(-100%,0,0);
	}
	.content1,.content2,.content3{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.content1 .imgbox,.content2 .imgbox,.content3 .imgbox{
		width: 48%;
		overflow: hidden;
		margin-bottom: 0.1rem;
	}
	.content1 .imgbox img,
	.content2 .imgbox img,
	.content3 .imgbox img{
		display: block;
	}
	.split{
 		position: absolute;
 		bottom: 0rem;
 		left: 0;
 		width: 100%;
 		z-index: 2;
 	}
</style>