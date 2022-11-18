/*
该文件是整个姓名的入口
*/


// 引入Vue
import Vue from 'vue'
// 引入App组件，app管理所有组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false

//引入路由
import router from './router'
//引入vuex
import store from './store'

//全局组件
import TypeNav from '@/components/TypeNav'

//mock(阶段ajax请求，随机模拟数组)
import '@/mock/mockServe'

Vue.component(TypeNav.name,TypeNav)



//创建vue实例对象（vm)
new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册vuex
  store
}).$mount('#app')

