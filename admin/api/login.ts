
import request from "../utils/request"

/**
 * 
 * @description 登录
 */
export const login = (params: any): any => {
  return request({
    url: "/login",
    method: "post",
    data: params,
  })
}
