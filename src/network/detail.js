import {request} from "./request";

export function detail(id) {
  return request({
    url:'/Public/getOneGoods&id='+id,
  })
}
export function getCommentList(goods_id) {
  return request({
    url:"/Index/getCommentList/goods_id/" + goods_id + '/type/1',
  })
}

export function addComment(goods_id, content, pid) {
  return request({
    url:"/Index/addComment",
    method:"post",
    data:{
      goods_id,
      type:1,
      content,
      pid
    }
  })
}
// export function recommend() {
//   return request({
//     url: '/recommend'
//   })
// }

export class Goods
{
  constructor(itemInfo)
  {
    this.title=itemInfo.title;
    this.desc=itemInfo.content;
    this.newPrice=itemInfo.buy_price;
    this.oldPrice=itemInfo.sell_price;
    this.discount=itemInfo.discount*10+'折';
    this.discountColor='red';
    this.realPrice=itemInfo.inv_count
  }
}

export class shop {
  constructor(shopInfo)
  {
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.score=shopInfo.score
    this.goodsCount=shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info,rule)
  {
    this.image=info.images ? info.images[0] : ''
    this.infos=info.set
    this.sizes=rule.tables
  }
}
