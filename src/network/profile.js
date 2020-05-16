import {request} from "./request";

export function getUserInfo(token) {
  return request({
    url:"/Index/getUserInfo",
    header:{token}
  })
}

export function editInfo(userInfo,token) {
  return request({
    url:"/Index/updateUserInfo",
    header: {token},
    data:{
      name:userInfo.name,
      phone:userInfo.phone,
      email:userInfo.email,
      nickName:userInfo.nickName,
      avatarUrl:userInfo.imageUrl
    },
    method:"post"
  })
}
