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
}

module.exports = new Article()