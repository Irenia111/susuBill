import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Money from '@/views/Money.vue'
import Subject from '../views/Subject.vue'
import Statistics from '../views/Statistics.vue'
import SubjectEdit from '../views/SubjectEdit.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'},
    /*
    由于active-class选择样式时根据路由中的路径去匹配，然后显示，

    例如在my页面中，路由为localhost:8080/#/my ，那么to="/”和to="/my"都可以匹配到，所有都会激活选中样式

    之后在link处加入exact属性

     */
    {
        path:'/home',
        name: 'home',
        component: Home
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        //component: () => import(/* webpackChunkName: "about" */ '../views/Money.vue')
    },
    {
        path: '/money',
        name: 'Money',
        component: Money
    },
    {
        path: '/subject',
        name: 'Subject',
        component: Subject
    },
    {
        path: '/subjectedit',
        name: 'SubjectEdit',
        component: SubjectEdit
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics
    },

]

const router = new VueRouter({
    routes
})

export default router
