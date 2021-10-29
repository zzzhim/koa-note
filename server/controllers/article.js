const { ArticleModel } = require("../model/article")
const response = require("../utils/response")

class Article {
  /**
   * 
   * @description 添加文章
   */
  async add({ title, tags, content }) {
    try {
      if(typeof title !== "string" || !title.length) {
        return response.error(
          500,
          {},
          '标题不能为空',
        )
      }

      if(typeof tags !== "string" || !tags.length) {
        return response.error(
          500,
          {},
          '标签不能为空',
        )
      }

      if(typeof content !== "string" || !content.length) {
        return response.error(
          500,
          {},
          '文章内容不能为空',
        )
      }

      const article = await ArticleModel.create({
        title,
        tags,
        content,
      })

      return response.success(200)
    } catch (error) {
      console.log(error)

      return response.error(500)
    }
  }

  /**
   * 
   * @description 更新文章
   */
  async update({ id, title, tags, content }) {
    try {
      const article = await ArticleModel.update(
        {
          title,
          tags,
          content,
          updateTime: new Date(),
        },
        {
          where: {
            id,
          }
        }
      )

      return response.success(200)
    } catch (error) {
      console.log(error)

      return response.error(500)
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

      return response.success(
        200,
        {
          count: count,
          list: rows,
        }
      )
    } catch (error) {
      console.log(error)

      return response.error(500)
    }
  }

  /**
   * 
   * @description 删除文章
   */
  async del({ id }) {
    try {
      if(!id) {
        return response.error(
          500,
          {},
          'id不能为空',
        )
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

      return response.success(200)
    } catch (error) {
      console.log(error)

      return response.error(500)
    }
  }

  /**
   * 
   * @description 文章详情
   */
  async details({ id }) {
    try {
      const data = await ArticleModel.findOne({
        attributes: [
          'id',
          'title',
          'tags',
          'content',
        ],
        where: {
          isDelete: '0',
          id,
        }
      })

      if(data) {
        return response.success(
          200,
          {
            article: data,
          },
        )
      }

      return response.info(
        200,
        {
          article: {},
        },
        '该条数据不存在'
      )
    } catch (error) {
      console.log(error)

      return response.error(500)
    }
  }
}

module.exports = new Article()