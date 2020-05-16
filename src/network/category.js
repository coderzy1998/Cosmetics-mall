import {request} from "./request";

export function getCategory() {
  return request({
    url:'/Public/getGoodsCategoryList'
  })
}

export function getCategoryGoods(category_id) {
  return request({
    url: "/Public/getGoodsList",
    data:{
      category_id
    },
    method:"post"
  })
}
// export function getSubCategory(maitKey) {
//   return request({
//     url: 'subcategory',
//     params:{
//       maitKey
//     }
//   })
// }

// export function getCategoryDetail(miniWallkey, type) {
//   return request({
//     url:'/subcategory/detail',
//     params: {
//       miniWallkey,
//       type
//     }
//   })
// }
