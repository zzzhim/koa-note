const { ArticleModel } = require("../model/article")

class Article {
  /**
   * 
   * @description 添加文章
   */
  async add({ title, tags, content }) {
    try {
      const article = await ArticleModel.create({
        title,
        tags,
        content,
      })

      return {
        code: 200,
        message: "保存成功",
        data: {}
      }
    } catch (error) {
      console.log(error)

      return {
        code: 500,
        message: "保存失败",
        data: {}
      }
    }
  }

  /**
   * 
   * @description 查询文章
   * @param {number} pageSize 10
   * @param {number} pageNo 1
   */
  async list({ pageSize = 10, pageNo = 1 }) {
    try {
      const { count = 0, rows = [] } = await ArticleModel.findAndCountAll({
        attributes: [
          'id',
          'title',
          'tags',
          'content',
          'createTime',
          'updateTime',
        ],
        where: {
          isDelete: '0',
        },
        limit: parseInt(pageSize),
        offset: parseInt(pageSize * (pageNo - 1)),
      })

      return {
        code: 200,
        message: '操作成功',
        data: {
          count: count,
          list: rows,
        }
      }
    } catch (error) {
      console.log(error)

      return {
        code: 500,
        message: "操作失败",
        data: {}
      }
    }
  }

  /**
   * 
   * @description 删除文章
   */
  async del({ id }) {
    try {
      if(!id) {
        return {
          code: 500,
          message: 'id不能为空',
          data: {}
        }
      }

      const data = await ArticleModel.update(
        {
          isDelete: '1',
        },
        {
          where: {
            id,
          }
        }
      )

      return {
        code: 200,
        message: '操作成功',
        data: {}
      }
    } catch (error) {
      console.log(error)

      return {
        code: 500,
        message: "操作失败",
        data: {}
      }
    }
  }

  /**
   * 
   * @description 文章详情
   */
  async details({ id }) {
    try {
      
    } catch (error) {
      console.log(error)

      return {
        code: 500,
        message: "操作失败",
        data: {}
      }
    }
  }

  
}

module.exports = new Article()