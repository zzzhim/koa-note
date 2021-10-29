class Response {
  constructor() {}

  _status = {
    401: '权限不足',
    200: '操作成功',
    500: '网络异常',
    4001: '用户不存在',
  }

  /**
   * 
   * 
   * @description 接口返回成功-无异常
   * @param {number} code
   * @param {string} message
   * @param {any} data
   */
  success(code, data, message) {
    return {
      code,
      message: message || this._status[code],
      data,
    }
  }
  
  /**
   * 
   * 
   * @description 接口返回成功-需要使用后台message提示
   * @param {number} code
   * @param {string} message
   * @param {any} data
   */
  info(code, data, message) {
    return {
      code,
      message: message || this._status[code],
      data,
    }
  }

  /**
   * 
   * 
   * @description 参数错误-抛出警告
   * @param {number} code
   * @param {string} message
   * @param {any} data
   */
  warning(code, data, message) {
    if(message && Array.isArray(message.details)) {
      const str = message.details.map(item => item.message)

      return {
        code,
        message: str.join(','),
        data,
      }
    }else {
      return {
        code,
        message: message || this._status[code],
        data,
      }
    }
  }

  /**
   * 
   * 
   * @description 接口返回失败-服务器报错
   * @param {number} code
   * @param {string} message
   * @param {any} data
   */
  error(code, data, message) {
    return {
      code,
      message: message || this._status[code],
      data,
    }
  }
}

module.exports = new Response()