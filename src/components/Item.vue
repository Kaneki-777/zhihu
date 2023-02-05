<template>
	<div class="news-item">
		<router-link :to="`/detail/${data.id}`">
			<div class="img-box">
				<img v-if="data.images && data.images.length > 0" v-lazy="data.images[0]" alt="">
			</div>
			<h4 class="title">{{ data.title }}</h4>
			<p class="desc">{{ data.hint }}</p>
		</router-link>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Item",
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		console.log(props);
	}

}
</script>

<style lang="less" scope>
.news-item {
	box-sizing: border-box;
	position: relative;
	padding: 15px 0;
	height: 95px;
	overflow: hidden;

	a {
		display: block;
	}

	.img-box {
		position: absolute;
		top: 15px;
		right: 0;
		width: 65px;
		height: 65px;
		background: #d5d5d5;

		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.title {
		max-height: 50px;
		line-height: 25px;
		overflow: hidden;
		font-size: 16px;
		color: #000;
		margin-right: 75px;
	}

	.desc {
		line-height: 15px;
		font-size: 12px;
		color: #999;
		margin-right: 75px;
	}
}
</style>