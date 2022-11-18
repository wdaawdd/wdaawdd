import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'


export default new VueRouter({
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                showComponent:true,
                showTypeNav:true,
            },
        },
        {
            path:"/login",
            component:Login,
            meta:{showComponent:false},
        },
        {
            path:"/register",
            component:Register,
            meta:{showComponent:false},
        },
        {
            name:"search",
            path:"/search/:keyword?",
            // 问号使params可以传参也可以不传
            component:Search,
            //设置是否展示该组件
            meta:{
                showComponent:true,
                showTypeNav:false
            }
        },
        //访问；‘/’定向到首页
        {
            path:'*',
            redirect:"/home"
        }
    ]
})