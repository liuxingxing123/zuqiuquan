<template>
	<div>
		<div class="fx-header">
			<div class="infobtn">发现</div>
		</div>
		<div class="search">
			<label>
				<span class="nickname">
					<input type="text" placeholder="请输入昵称">
				</span>
				<span class="search-btn">
					搜索
				</span>
			</label>
		</div>
		<split></split>
		<div class="content">
			<div class="fx-item clearfix" v-for="(item,idx) in fxlist" :key="idx">
				<div class="avatar"><img width="100%" height="100%" :src="item.avatar" alt=""></div>
				<div class="user">
					<div class="title">{{item.title}}</div>
					<div class="text">{{item.text}}</div>
				</div>
				<div class="attention"  @click="changeattention">
					关注
				</div>
			</div>
		</div>
		<div class="split">
			<split></split>
		</div>
	</div>
</template>

<script type="text/javascript">
	import split from '@/components/split/split';
	let COUNT = 0;
	export default {
		data(){
			return {
				hasattention:false,
				fxlist:[
					{
						avatar:'src/components/faxian/avatar.gif',
						title:'我叫小萌',
						text:'我是小萌我怕谁！哈哈哈哈！',
						attention:true
					},
					{
						avatar:'src/components/faxian/avatar.gif',
						title:'我叫小萌',
						text:'我是小萌我怕谁！哈哈哈哈！',
						attention:false
					},
					{
						avatar:'src/components/faxian/avatar.gif',
						title:'我叫小萌',
						text:'我是小萌我怕谁！哈哈哈哈！',
						attention:false
					},
					{
						avatar:'src/components/faxian/avatar.gif',
						title:'我叫小萌',
						text:'我是小萌我怕谁！哈哈哈哈！',
						attention:true
					},
					{
						avatar:'src/components/faxian/avatar.gif',
						title:'我叫小萌',
						text:'我是小萌我怕谁！哈哈哈哈！',
						attention:false
					},
				]
			};
		},
		methods:{
			changeattention(event){
				let DOM = event.target;
				if(COUNT%2===0){
					DOM.style.background="#08c43a";
				}else{
					DOM.style.background="#e6e6e6";
				}
				COUNT++;
			}
		},
		components:{
			split
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	
	.fx-header{
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
	.search{
		width: 100%;
		height: 0.8rem;
		padding: 0.12rem 0.12rem;
		box-sizing: border-box;
		border-width:0 0 1px 0  ;
		-webkit-border-image: url(border.png) 2 0 stretch;
		 border-image: url(border.png) 2 0 stretch;
	}

	.search label{
		overflow: hidden;
	}
	.search label .nickname{
		float: left;
		margin-right: 0.16rem;
	}
	.search label .nickname input{
		width: 5.8rem;
		height: 0.46rem;
		line-height: 0.46rem;
		padding-left: 0.16rem;
		color: #c7c7c7;
		font-size: 0.26rem;
		outline: none;
		border-radius: 0.08rem;
		position: relative;
		border: 1px solid #aaa;
	}
	.search label .search-btn{
		height: 0.48rem;
		display: inline-block;
		width: 1rem;
		text-align: center;
		line-height: 0.48rem;
		color: #fff;
		font-size: 0.26rem;
		background: #0cc440;
		border-radius: 0.04rem;
		cursor: pointer;
	}
	.content{
		position: absolute;
		left: 0;
		top: 0.9rem;
		width: 100%;
		bottom: 0.1rem;
		overflow: auto;
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
 	.content .fx-item .attention{
		position: absolute;
		right: 0.24rem;
		top: 0.3rem;
		width: 0.9rem;
		height: 0.4rem;
		text-align: center;
		line-height: 0.4rem;
		border-radius: 4px;
		background: #e6e6e6;
		color: #fff;
		cursor: pointer;
		font-size: 0.24rem;
 	}
 	.split{
 		position: absolute;
 		bottom: 0rem;
 		left: 0;
 		width: 100%;
 		z-index: 2;
 	}
 	

	/* .search label .nickname input{
		  border-width: 1px 1px ;
		  -webkit-border-image: url(border.png) 2 0 stretch;
		  border-image: url(border.png) 2 0 stretch;
		} */

/* 	.search label .nickname input:before{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		height: 1px;
		background: #aaa;
		transform:scaleY(0.5);
		-webkit-transform:scaleY(0.5);
		-webkit-transform-origin: left bottom;
	    	transform-origin: left bottom;
	} 
	.search label .nickname input:before{
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	width:100%;
	height: 1px;
	background: #aaa;
	transform:scaleY(0.5);
	-webkit-transform:scaleY(0.5);
	-webkit-transform-origin: left top;
	    	transform-origin: left top;
	} 
	 	.search label .nickname input:after{
	content:"";
	display:block;
	position:absolute;
	right:0;
	bottom:0;
	height:100%;
	width: 1px;
	background: #aaa;
	transform:scaleX(0.5);
	-webkit-transform:scaleX(0.5);
	-webkit-transform-origin: left bottom;
	    	transform-origin: left bottom;
	} 
	 .search label .nickname input:after{
		content:"";
		display:block;
		position:absolute;
		right:0;
		bottom:0;
		height:100%;
		width: 1px;
		background: #aaa;
		transform:scaleX(0.5);
		-webkit-transform:scaleX(0.5);
		-webkit-transform-origin: right bottom;
	    	transform-origin: right bottom;
	} 
	 */	

</style>