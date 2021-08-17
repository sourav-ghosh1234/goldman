const homecontentRepo = require('homecontent/repositories/homecontent.repository');

class homeContentController {
  constructor() { }


  async getContent(req, res) {
    try {
      console.log("eoeoeoeoeo");  
      let homeContentData = await homecontentRepo.getByField({});
      if (homeContentData) {
        return {
          status: 200,
          data: homeContentData,
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

module.exports = new homeContentController();