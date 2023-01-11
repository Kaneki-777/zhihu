import {
	createApp
} from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';

import Vant, {
	Lazyload
} from 'vant';
import './assets/reset.min.css';
import 'vant/lib/index.css';
import 'amfe-flexible';
// 处理最大宽度
import {
	handleMaxWidth
} from './assets/utils';
handleMaxWidth();
window.addEventListener('resize', handleMaxWidth);


const app = createApp(App);
app.use(store);
app.use(Vant);
app.use(Lazyload, {
	lazyComponent: true,
});
app.use(router);
app.mount('#app');