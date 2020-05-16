import axios from 'axios'
import {Loading} from "element-ui";

<<<<<<< HEAD
export function request(config)
{
  const instence =axios.create({
    baseURL:'新的接口加老师微信coderwhy002',
=======
export function request(config) {
  const instence=axios.create({
    baseURL:"/WebApi",
>>>>>>> 3022873... 初始化项目
    timeout:5000
  });
  let loading

  instence.interceptors.request.use(config =>{
    // 为请求的头部定义token
    const token=window.localStorage.getItem('token');
    if (token){
      config.headers['token']=token
    }
    loading=Loading.service({
      lock:true,
      text:"正在拼命加载中！",
      spinner:"el-icon-loading",
      background:"rgba(0,0,0,.7)"
    })
    return config
  },error => {
    loading.close()
  })
  instence.interceptors.response.use(res =>{
    loading.close()
    return res.data
  },error => {

  })

  return instence(config)
}
