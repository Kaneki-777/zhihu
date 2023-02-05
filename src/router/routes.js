import Home from '@/page/Home.vue';
const routes = [{
	path: '/',
	component: Home
},
{
	path: '/detail/:id',
	component: () => import( /* webpackChunkName:"other" */ '@/page/Detail.vue')
},
{
	path: '/login',
	component: () => import( /* webpackChunkName:"other" */ '@/page/Login.vue')
},
{
	path: '/person',
	component: () => import( /* webpackChunkName:"other" */ '@/page/Person.vue')
},
{
	path: '/store',
	component: () => import( /* webpackChunkName:"other" */ '@/page/Store.vue')
},
{
	path: '/updateperson',
	component: () => import( /* webpackChunkName:"other" */ '@/page/UpdatePerson.vue')
},
{
	path: '/:pathMatch(.*)*',
	redirect: '/'
}
];
export default routes;