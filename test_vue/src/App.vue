<template>
  <div>
   <indexHeader></indexHeader>
   <router-view></router-view>
   <!-- footer组件在Home Search组件中显示 -->
   <indexFooter v-show="$route.meta.showComponent"></indexFooter>
  </div>
</template>

<script>
import indexHeader from "./components/Header/index.vue"
import indexFooter from "./components/Footer/index.vue"

export default {
  name:"app",
  components:{
    indexHeader,
    indexFooter
  },
  //放在app中只用发一次请求，提高性能
  mounted() {
    // ...mapActions('categoryList')
    //加模块化的命名！！！！！
    this.$store.dispatch("TypeNav/categoryList");
  },
}
</script>

<style>

</style>
``