const serviceContentRepo = require('services_content/repositories/services_content.repository');

class serviceContentController {
  constructor() { }


  async getContent(req, res) {
    try {
      let content = await serviceContentRepo.getByField({});
      if (content) {
        return {
          status: 200,
          data: content,
          message: 'Text fetched successfully.'
        }
      } else {
        return {
          status: 201,
          data: [],
          message: 'There are no data at this moment.'
        }
      }
    } catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  }

}

module.exports = new serviceContentController();