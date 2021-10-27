
import request from "../utils/request"

/**
 * 
 * @description 添加文章
 */
export const articleAdd = (params: any): any => {
  return request({
    url: "/article/add",
    method: "post",
    data: params,
  })
}
