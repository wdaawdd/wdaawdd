import {reqCategoryList} from '@/api'
export default{
    namespaced:true,
    state:{
        categoryList:[]
    },
    actions:{
        //?context
        async categoryList(context){
            let result  = await reqCategoryList();
            // console.log(result)
            if(result.code==200){
                context.commit("CATEGORYLIST",result.data)
            }else{
                console.log("连接失败")
            }
        }
    },
    mutations:{
        CATEGORYLIST(state,value){
            state.categoryList = value
        }
    }
}