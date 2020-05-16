import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Home =()=>import('../views/home/Home');
const Cart =()=>import('../views/cart/Cart');
const Category =()=>import('../views/category/Category');
const Profile =()=>import('../views/profile/Profile');
const Detail=()=>import('views/detail/Detail');
const Login=()=>import('../views/login/Login');
const EditInfo=()=>import('../views/editInfo/EditInfo');
const Search=()=>import('../views/search/Search');
const Order=()=>import('../views/order/Order');

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path:'/detail/:id',
    component:Detail
  },
  {
    path:"/login",
    component:Login
  },
  {
    path:"/editInfo",
    component:EditInfo
  },
  {
    path:"/search",
    component:Search
  },
  {
    path:"/order",
    component:Order
  }
];
const router=new Router({
  routes,
  mode:'history'
});
export default router
