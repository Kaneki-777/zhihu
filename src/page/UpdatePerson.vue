<template>
	<Nav />
	<div class="form-box">
		<van-cell-group inset>
			<van-field v-model="name" label="用户名" label-width="60px" />

			<van-field label="用户头像" label-width="60px">
				<template #input>
					<van-uploader v-model="pic" max-count="1" />
				</template>
			</van-field>
		</van-cell-group>

		<div style="margin: 20px 40px">
			<van-button
									:loading="loading"
									loading-text="处理中..."
									round
									block
									type="primary"
									@click="submit">
				修改信息
			</van-button>
		</div>
	</div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { Toast } from "vant";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import api from '@/api/index';
import { useRouter, useRoute } from 'vue-router';

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "UpdatePerson",
	components: { Nav },
	setup() {
		const store = useStore();
		const router = useRouter();
		let { name } = store.state.info;
		let state = reactive({
			name,
			pic: [],
			loading: false,
		});
		const submit = async () => {
			console.log('123');
			if (state.loading) return;
			state.loading = true;
			let { name, pic } = state,
				reg = /^[\w\u4e00-\u9fa5]+$/;
			// 格式校验
			if (!reg.test(name)) {
				Toast("用户名输入错误");
				return;
			}
			if (pic.length === 0) {
				Toast("必须上传一张图片");
				return;
			}
			console.log(pic[0]);
			// 提交数据给服务器
			let { code, data } = await api.userUpdate(name, pic[0].file);
			if (+code !== 0) {
				Toast("修改失败，请稍后再试");
				return;
			}
			Toast("修改成功");
			store.commit('changeInfo', data);
			router.replace("/person");

			state.loading = false;
		};



		return {
			...toRefs(state),
			submit
		}
	}
}
</script>


<style lang="less" scoped>
.form-box {
	margin-top: 30px;
}
</style>