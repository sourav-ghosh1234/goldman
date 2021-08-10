const artoflivingRepo = require('artofliving/repositories/artofliving.repository');

class artOfLivingController {
  constructor() { }


  async getContent(req, res) {
    try {
      let artoflivingStaticText = await artoflivingRepo.getByField({});
      if (artoflivingStaticText) {
        return {
          status: 200,
          data: artoflivingStaticText,
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

module.exports = new artOfLivingController();