<template>
	<Nav title="收藏列表" />

	<input type="text" v-model="pass">
	<van-button
							size="small"
							type="primary"
							@click="sendcode">
		提交
	</van-button>
</template>

<script>
import Nav from "@/components/Nav.vue"
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Store",
	components: {
		Nav
	},
	data() {
		return {
			pass: ''
		}
	},
	methods: {
		async sendcode() {
			console.log(this.pass);

		}
	}
}
</script>