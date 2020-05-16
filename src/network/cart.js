import {request} from "./request";

export function addCart(goods) {
  return request({
    url:"/Index/addCart",
    method:"post",
    data:{
      goods_id:goods.id,
      goods_title:goods.title,
      goods_price:goods.price,
      goods_discount:goods.discount,
      goods_count:goods.count
    }
  })
}

export function getCartList() {
  return request({
    url: "/Index/getCartList",
    header:{token:window.localStorage.getItem('token')}
  })
}

export function deleteCart(cart_id) {
  return request({
    url:"/Index/deleteCart/cart_id/"+cart_id.toString(),
    header: {token:window.localStorage.getItem('token')},
    method: "get"
  })
}

export function getCartListById(cart_id) {
  return request({
    url:"/Index/getCartListById/cart_id/" + cart_id.toString(),
    method:"get"
  })
}
