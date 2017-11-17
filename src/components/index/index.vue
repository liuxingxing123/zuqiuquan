<template>
	<div class="index" ref='wrapper'>
	<div class="index-wrapper">
		<swiper></swiper>
		<div class="nav" ref="nav">
			<span v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)" class="span-item">{{item}}</span>
		</div>
		<transition appear name="fade" mode="out-in">
            <div class="content1" v-if="num==0">
            	<div class="contentone">
	            	<div class="content1-item" v-for="(item,idx) in indexImg1" :key="idx">
	            			<img width="100%"  :src="item.imgSrc" alt="">
	            		<span class="text">{{item.text}}</span>
	            	</div>
            	</div>
            </div>
         </transition>
         <transition appear name="fade" mode="out-in">
            <div class="content2" v-if="num==1">
            	<div class="contenttwo clearfix">
            	<div class="content2-item" v-for="(item,idx) in listImg2" :key="idx">
	            			<img width="100%" :src="item.imgSrc" alt="">
	            		<span class="text">{{item.text}}</span>
	            </div>
	            </div>
            </div>
             </transition>
             <transition appear name="fade" mode="out-in">
            <div class="content3" v-if="num==2">
				<div class="content3-item" v-for="(item,idx) in listImg3" :key="idx">
	            		<img width="158" height="158" :src="item" alt="">
	            </div>
            </div>
     		 </transition>
     	</div>
	</div>
</template>

<script>
	import swiper from '@/components/swiper/swiper';
	import BScroll from 'better-scroll';

	export default {
		data(){
			return {
				tabs:['足球现场','足球生活','足球美女'],
				num:0,
				scrollY:0,
				indexImg1:[
					{
						imgSrc:'src/components/index/03index_0_02.gif',
						text:'小丸子啊小丸子'
					},
					{
						imgSrc:'src/components/index/03index_0_05.gif',
						text:'萌萌哒啊小丸子啊萌萌哒啊小丸子'
					},
					{
						imgSrc:'src/components/index/03index_0_09.gif',
						text:'小丸子啊小丸子'
					},
					{
						imgSrc:'src/components/index/03index_0_10.gif',
						text:'小丸子啊萌萌哒小丸子啊萌萌哒'
					},
					{
						imgSrc:'src/components/index/03index_0_05.gif',
						text:'萌萌哒啊小丸子啊萌萌哒啊小丸子'
					},
					{
						imgSrc:'src/components/index/03index_0_02.gif',
						text:'小丸子啊小丸子'
					},
					{
						imgSrc:'src/components/index/03index_0_09.gif',
						text:'小丸子啊小丸子'
					},
					{
						imgSrc:'src/components/index/03index_0_10.gif',
						text:'小丸子啊萌萌哒小丸子啊萌萌哒'
					},
					{
						imgSrc:'src/components/index/03index_0_05.gif',
						text:'萌萌哒啊小丸子啊萌萌哒啊小丸子'
					}
				],
				listImg2:[
					{
						imgSrc:'src/components/index/03index_2_02.gif',
						text:'徐云龙争顶'
					},
					{
						imgSrc:'src/components/index/03index_2_04.gif',
						text:'马季奇向裁判示意对手拉扯武磊进球后腿抽筋'
					},
					{
						imgSrc:'src/components/index/03index_2_04.gif',
						text:'马季奇向裁判示意对手拉扯武磊进球后腿抽筋'
					},
					{
						imgSrc:'src/components/index/03index_2_02.gif',
						text:'徐云龙争顶'
					},
					{
						imgSrc:'src/components/index/03index_2_04.gif',
						text:'马季奇向裁判示意对手拉扯武磊进球后腿抽筋'
					},
					{
						imgSrc:'src/components/index/03index_2_02.gif',
						text:'徐云龙争顶'
					},
					{
						imgSrc:'src/components/index/03index_2_02.gif',
						text:'徐云龙争顶'
					},
					{
						imgSrc:'src/components/index/03index_2_04.gif',
						text:'马季奇向裁判示意对手拉扯武磊进球后腿抽筋'
					},
					{
						imgSrc:'src/components/index/03index_2_02.gif',
						text:'徐云龙争顶'
					},
					{
						imgSrc:'src/components/index/03index_2_02.gif',
						text:'徐云龙争顶'
					}
				],
				listImg3:[
					'src/components/index/zq1.jpg',
					'src/components/index/zq2.jpg',
					'src/components/index/zq3.jpg',
					'src/components/index/zq4.jpg',
					'src/components/index/zq5.jpg',
					'src/components/index/zq6.jpg',
					'src/components/index/zq7.jpg',
					'src/components/index/zq8.jpg',
					'src/components/index/zq9.jpg',
					'src/components/index/zq1.jpg',
					'src/components/index/zq2.jpg',
					'src/components/index/zq3.jpg'
				]
			};
		},
		components:{
			swiper
		},
		computed:{
			
		},
		mounted() {
			 this.$nextTick(() => { 
			 	this.scroll = new BScroll(this.$refs.wrapper, {click:true,probeType:3}) ;
				this.scroll.on("scroll",(pos) => {
					this.scrollY = Math.floor(Math.abs(pos.y));
					if(this.scrollY>=174){
						this.$refs.nav.style.position='fixed';
						this.$refs.nav.style.left="0";
						this.$refs.nav.style.top=this.scrollY+"px";
					}else{
						this.$refs.nav.style.position='static';
					}
				});
			 })
		},
		methods:{
		    tab(index) {
            	this.num = index;
       		}
		}
	}
</script>

<style scoped>
	.index{
		position: absolute;
		left: 0;
		height: 11.6rem;
		width: 100%;
		overflow: hidden;
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
	}
	.contentone{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.contenttwo{
		width: 100%;
		column-count:2;
		column-gap:0.2rem;
	}
	.content2{
		margin-top: 0.12rem;
	}
	.contenttwo .content2-item{
		position: relative;
		overflow: hidden;
		margin-bottom: 0.12rem;
	}
	.content1 .content1-item{
		width: 48%;
		position: relative;
		overflow: hidden;
		margin-top: 0.12rem;
	}
	.content1 .content1-item:after,.content2 .content2-item:after{
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
	.content1 .content1-item .text{
		display: block;
		box-sizing: border-box;
		padding:0 0.2rem;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 0.6rem;
		position: relative;
		font-size: 0.26rem;
		color: #333;
	}
	.content2 .content2-item .text{
		padding: 0 0.2rem;
		display: block;
		box-sizing: border-box;
		width: 100%;
		color: #333;
		font-size: 0.26rem;
		position: relative;
		line-height: 0.42rem;
	}
	.content1 .content1-item .text:before,
	.content2 .content2-item .text:before{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		height:100%;
		border-left:1px solid rgba(7,17,27,0.1);
		transform:scaleX(0.5);
		-webkit-transform:scaleX(0.5);
	}
	.content1 .content1-item .text:after,
	.content2 .content2-item .text:after{
		content:"";
		display:block;
		position:absolute;
		right:0;
		bottom:0;
		height:100%;
		border-right:1px solid rgba(7,17,27,0.1);
		transform:scaleX(0.5);
		-webkit-transform:scaleX(0.5);
	}
	.content3{
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		position: relative;
		padding: 0.1rem;
		box-sizing: border-box;
	}
	.content3 .content3-item{
		width: 48%;
		overflow: hidden;
		margin-bottom: 0.12rem;
	}
</style>