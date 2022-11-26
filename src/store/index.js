import Vue from 'vue';
import Vuex from 'vuex';
import Home from './Home'
import Search from './Search'

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        Home,
        Search
    }
});