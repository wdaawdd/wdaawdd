//对于axios进行二次封装
import axios from "axios";


//
const requests = axios.create({
    baseURL:"/mock",
    timeout:5000,
})


//请求拦截
requests.interceptors.request.use((config)=>{
    return config
});


//响应拦截
requests.interceptors.response.use((res)=>{
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'))
});

//对外暴露
export default requests;

