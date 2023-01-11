<template>
	<van-skeleton title avatar :row="5" v-if="newsInfo === null" />
	<div class="content" v-else v-html="newsInfo.body">
	</div>
	<div class="nav-box">
		<van-icon name="arrow-left" @click="handle"></van-icon>
		<van-icon name="comment-o" :badge="comments"></van-icon>
		<van-icon name="good-job-o" :badge="popularity"></van-icon>
		<van-icon name="star-o" color="#1989fa"></van-icon>
		<van-icon name="share-o" color="#cccccc"></van-icon>
	</div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { reactive, toRefs, onBeforeMount, onBeforeUnmount, onUpdated } from 'vue';
import api from '@/api/index';
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Detail",
	setup() {
		const router = useRouter(),
			route = useRoute();
		let state = reactive({
			comments: 0,
			popularity: 0,
			newsInfo: null
		});
		onBeforeMount(async () => {
			let id = route.params.id;
			let result = await api.queryNewsInfo(id);
			state.newsInfo = result;
			// 动态创建CSS
			let link = document.createElement("link");
			link.id = "link";
			link.rel = "stylesheet";
			link.href = state.newsInfo.css[0];
			document.head.append(link);

			let { popularity, comments } = await api.queryNewsStory(id);
			state.comments = comments;
			state.popularity = popularity;
		})
		onUpdated(() => {
			let imgPlaceHolder = document.querySelector(".img-place-holder");
			if (imgPlaceHolder) {
				if (imgPlaceHolder.innerHTML.trim() === "") {
					imgPlaceHolder.innerHTML += `<img src="${state.newsInfo.image}" alt="">`
				}
			}
		});
		onBeforeUnmount(() => {
			let link = document.getElementById("link");
			if (!link) return;
			document.head.removeChild(link);
		});
		const handle = () => {
			router.back()
		};
		return {
			handle,
			...toRefs(state)
		}
	}
}
</script>

<style lang="less" scoped>
.content {
	background: #fff;
	padding-bottom: 50px;
	margin: 0;

	/deep/ .img-place-holder {
		overflow: hidden;
		height: 375px;

		img {
			display: block;
			margin: 0;
			width: 100%;
			min-height: 100%;
		}
	}
}

.van-skeleton {

	padding: 30px 10px;
}

.nav-box {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	height: 50px;
	width: 100%;
	background: #f4f4f4;
	padding: 0 15px;

	.van-icon:nth-child(1) {
		position: relative;

		&::after {
			position: absolute;
			top: -10%;
			right: -15px;
			width: 1px;
			content: '';
			height: 120%;
			background: #d5d5d5;
		}
	}

	/deep/ .van-badge {
		background-color: transparent;
		border: none;
		color: black;
		right: -5px;
	}
}
</style>