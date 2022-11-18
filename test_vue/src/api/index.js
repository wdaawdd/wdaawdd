//对api接口进行统一管理
import requests from "./request";


//三级联动接口
//http://gmall-h5-api.atguigu.cn get请求  无参数
export const reqCategoryList = ()=>requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    });


    // 试下跨域那里你把代理去掉，baseURL把'/api'前面加上接口地址
