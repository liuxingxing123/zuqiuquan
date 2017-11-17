<template>
	<div class="swiper-box" ref="swiperBox">
			<swiper class="box-container" :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for="(item,idx) in listImg" :key="idx" @mouseenter.native="stopPlay" @mouseleave.native="play">
					<img :src="item.imgSrc" class="swiper-image" alt="swiper-image" >
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
</template>

<script type="text/javascript">
	import {swiper,swiperSlide} from 'vue-awesome-swiper';

	export default {
		data(){
			return {
				listImg:[
				{
					imgSrc:'src/components/swiper/1.jpg',
				},
				{
					imgSrc:'src/components/swiper/4.jpg',
				},
				{
					imgSrc:'src/components/swiper/5.jpg',
				}
				],
				swiperOption:{
					notNextTick:true,
					autoplay:3000,
					loop:true,
					autoplayDisableOnInteraction:false,
					direction:'horizontal',
					paginationType:'bullets',
					paginationClickable:true,
					pagination:'.swiper-pagination',
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					observeParents:true
				}
			};
		},
		components:{
			swiper,
			swiperSlide
		},
		computed:{
			mySwiper(){
				return this.$refs.mySwiper.swiper;
			}
		},
		methods:{
			stopPlay(){
				this.mySwiper.stopAutoplay();
			},
			play(){
				this.mySwiper.startAutoplay();
			}
		}
	}
</script>

<style scoped>
	.swiper-box{
		height:4rem;
		overflow: hidden;
		position: relative;
	}
	.swiper-box .swiper-container{
		height: 100%;
	}
	.swiper-box .swiper-image{
		width: 100%;
		height: 100%;
	}
</style>