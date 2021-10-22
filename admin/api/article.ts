
import request from "../utils/request"

/**
 * 
 * @description 登录
 */
export const articleList = (params: any): any => {
  return request({
    url: "/article/list",
    method: "post",
    data: params,
  })
}
