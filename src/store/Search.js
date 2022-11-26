import {reqGetSearchInfo} from '@/api'

export default{
    namespaced:true,
    state:{
        searchList:{}
    },

    actions:{
        async getSearchList(context,params={}){
            let result = await reqGetSearchInfo(params);
            console.log(result)
            if(result.code==200){
                context.commit("GETSEARCHLIST",result.data)
            }else{
                console.log("连接失败")
            }
        }
    },
    
    mutations:{
        GETSEARCHLIST(state,value){
            state.searchList = value
        }
    },
    //简化数据
    getters:{
        //考虑网络问题，给一个空数组
        goodsList(state){
            return state.searchList.goodsList||[];
        },
        attrsList(state){
            return state.searchList.attrsList||[]
        },
        trademarkList(state){
            return state.searchList.trademarkList||[]
        }

    }
}