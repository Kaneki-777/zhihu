<template>
	<Nav title="收藏列表" />
	<van-empty description="暂无收藏" v-if="storeList.length === 0" />
	<div v-else>
		<van-swipe-cell v-for="item in storeList" :key="item.id">
			<div class="con">
				<Item :data="{ ...item.news, images: [item.news.image], hint: '' }"></Item>
			</div>
			<template #right>
				<van-button square type="danger" text="删除" @click="removeHandle(item.id)" />
			</template>
		</van-swipe-cell>
	</div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Item from '@/components/Item.vue';
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import api from '@/api/index';
import { Toast } from "vant";
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Store",
	components: {
		Nav,
		Item
	},
	setup() {
		const store = useStore();
		let storeList = computed(() => {
			return store.state.storeList || []
		});
		onBeforeMount(() => {
			if (store.state.storeList === null) {
				store.dispatch("changeStoreListAsync");
			}
		})
		const removeHandle = async (id) => {
			let { code } = await api.storeRemove(id);
			if (+code !== 0) {
				Toast("删除失败~");
				return;
			}
			Toast("删除成功~");
			store.commit('removeStoreList', id);
		}
		return {
			storeList,
			removeHandle
		}
	}

}
</script>

<style lang="less" scoped>
.van-swipe-cell {
	.con {
		padding: 0 15px;
	}

	/deep/ .van-swipe-cell__right {
		.van-button {
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>