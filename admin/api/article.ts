
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

/**
 * 
 * @description 更新文章
 */
export const articleUpdate = (params: any): any => {
  return request({
    url: "/article/update",
    method: "post",
    data: params,
  })
}

/**
 * 
 * @description 文章列表
 */
export const articleList = (params: any): any => {
  return request({
    url: "/article/list",
    method: "get",
    params,
  })
}

/**
 * 
 * @description 删除文章
 */
export const articleDel = (params: any): any => {
  return request({
    url: "/article/del",
    method: "post",
    data: params,
  })
}


/**
 * 
 * @description 文章详情
 */
export const articleDetails = (params: any): any => {
  return request({
    url: "/article/details",
    method: "get",
    params,
  })
}
