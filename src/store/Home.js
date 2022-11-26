import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'
export default{
    namespaced:true,
    state:{
        categoryList:[],
        bannerList:[],
        floorList:[],
    },
    actions:{
        //home中的TypeNav三级联动选择
        async categoryList(context){
            let result  = await reqCategoryList();
            // console.log(result)
            if(result.code==200){
                context.commit("CATEGORYLIST",result.data)
            }else{
                console.log("连接失败")
            }
        },
        //home中的banner轮播图
        async getBannerList(context){
            let result = await reqGetBannerList();
            // console.log("Banner:"+result);
            if(result.code==200){
                context.commit("BANNERLIST",result.data)
            }else{
                console.log("连接失败")
            }
        },

        async getFloorList(context){
            let result = await reqGetFloorList();
            if(result.code==200){
                context.commit("FLOORLIST",result.data)
            }else{
                console.log("连接失败")
            }
        },
    },
    mutations:{
        //TypeNav
        CATEGORYLIST(state,value){
            state.categoryList = value
        },
        //Banner
        BANNERLIST(state,value){
            state.bannerList = value
        },
        //floor
        FLOORLIST(state,value){
            state.floorList = value
        }
    }
}