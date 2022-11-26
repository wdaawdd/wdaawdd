//对api接口进行统一管理
//引入二次封装的axios
import requests from "./request";
//
import mockRequests from './mockAjax'



//三级联动接口
//http://gmall-h5-api.atguigu.cn get请求  无参数
export const reqCategoryList = ()=>requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    });


//获取轮播图接口
export const reqGetBannerList = ()=>mockRequests.get('/banner');

//获取floor接口
export const reqGetFloorList = ()=>mockRequests.get('/floor');

//获取search接口 /api/list post 带参
//请求时params至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({
    url:"/list",
    method:'post',
    data:params
})
