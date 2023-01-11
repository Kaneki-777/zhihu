<template>
	<!-- 头部 -->

	<Head :time="today"></Head>
	<!-- 轮播图 -->
	<section class="banner-box">
		<van-swipe v-if="bannerList.length > 0" lazy-render autoplay="3000">
			<van-swipe-item v-for="item in  bannerList" :key="item.id">
				<router-link :to="`/detail/${item.id}`" class="content">
					<img :src="item.image" alt="">
					<div class="mark">
						<h3 class="title">{{ item.title }}</h3>
						<span class="tip">{{ item.hint }}</span>
					</div>
				</router-link>
			</van-swipe-item>
		</van-swipe>
	</section>
	<!-- 新闻列表 -->
	<van-skeleton title :row="5" v-if="newsList.length === 0" />
	<div v-else>
		<section class="news-box" v-for="(item, index) in newsList" :key="index">
			<van-divider content-position="left" v-if="index !== 0">
				{{ formaTime(item.date, '{1}月{2}日') }}
			</van-divider>
			<div class="content">
				<Item v-for="item2 in item.stories" :key="item2.id" :data="item2" />
			</div>
		</section>
	</div>
	<div v-show="newsList.length !== 0" class="lazy-more" ref="loadMore">
		<van-loading size="12px">精彩加载中...</van-loading>
	</div>
</template>

<script>
import Head from '@/components/Head.vue';
import Item from '@/components/Item.vue';
import { reactive, toRefs, onBeforeMount, ref, onMounted } from 'vue';
import api from '@/api/index';
import { formaTime } from '@/assets/utils'
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Home",
	components: { Head, Item },
	setup() {
		let state = reactive({
			today: '',
			newsList: [],
			bannerList: []
		})
		// 第一次加载获取数据
		onBeforeMount(async () => {
			let { date, stories, top_stories } = await api.queryNewsLatest();
			state.today = date;
			state.newsList.push(Object.freeze({
				date, stories
			}));
			state.bannerList = Object.freeze(top_stories);
		});
		// 第一次渲染完，加载更多数据
		let loadMore = ref(null);
		onMounted(() => {
			let ob = new IntersectionObserver(async (change) => {
				let item = change[0];
				if (item.isIntersecting) {
					let result = await api.queryNewsLatest(state.newsList[state.newsList.length - 1]['date']);
					state.newsList.push(Object.freeze(result))
				}
			});
			ob.observe(loadMore.value);
		});
		return {
			...toRefs(state),
			formaTime,
			loadMore
		}
	}
}
</script>

<style lang="less" scoped>
.banner-box {
	height: 375px;
	box-sizing: border-box;
	background: #d5d5d5;

	.van-swipe {
		height: 100%;
		background: #fff;

		.content {
			position: relative;
			display: block;
			height: 100%;
			color: #fff;

			img {
				display: block;
				width: 100%;
				height: 100%;
			}

			.mark {
				position: absolute;
				bottom: 0;
				left: 0;
				box-sizing: border-box;
				padding: 10px 20px;
				width: 100%;
				height: 110px;
				background: rgba(0, 0, 0, 0.3);
				background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));

				.title {
					padding-top: 10px;
					max-height: 50px;
					font-size: 20px;
					line-height: 25px;
					overflow: hidden;
				}

				.tip {
					font-size: 12px;
					line-height: 20px;
				}

			}
		}

		/deep/ .van-swipe__indicators {
			left: auto;
			right: 15px;
			transform: none;

			.van-swipe__indicator--active {
				width: 15px;
				border-radius: 3px;
				background: #fff;
			}
		}
	}

}

.van-skeleton {
	padding: 30px 15px;
}

.news-box {
	padding: 0 15px;

	.van-divider {
		margin: 5px 0;
		font-size: 12px;

		&::before {
			display: none;
		}
	}
}

.lazy-more {
	display: flex;
	justify-content: center;
	padding: 10px;
	background: #f4f4f4;
}
</style>