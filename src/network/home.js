import {request} from "./request";
import axios from 'axios'
export function getHomeMultidata()
{
  return request({
    url:'/Public/getPostsList'
  })
}
export function getHomeRecommends() {
  return axios({
    url:"http://152.136.185.210:8000/api/n3/home/multidata",
    timeout:5000
  })
}
export function getHomeGoods()
{
  return request({
    url: '/Public/getGoodsList',
  })
}

export function getSearchGoods(title) {
  return request({
    url:"/Public/getGoodsList",
    method:"post",
    data:{
      title
    }
  })
}
