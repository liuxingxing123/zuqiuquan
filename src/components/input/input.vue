<template>
	<div class="input">
		<input :type="type" :placeholder="ph"  >
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {

			}
		},
		props:{
			type:{
				type:String
			},
			ph:{
				type:String
			}
		}
	}
</script>

<style scoped>
	.input {
		width: 6rem;
		height: 0.9rem;
		box-sizing: border-box;
		position: relative;
	}
	.input input{
		outline: none;
		width: 100%;
		height: 100%;
		line-height: 0.9rem;
		color: #b5b5b5;
		font-size: 0.26rem;
		border: none;
	}
	.input:after{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		border-top:1px solid #7f7f7f;
		transform:scaleY(0.5);
		-webkit-transform:scaleY(0.5);
	}
</style>