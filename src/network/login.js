import {request} from "./request";

export function login(username, password) {
  return request({
    url:"/Login/loginHandle",
    method:"post",
    data:{
      username,
      password
    }
  })
}

export function register(username, password) {
  return request({
    url:"/Login/regHandle",
    method: "post",
    data:{
      username,
      password
    }
  })
}
