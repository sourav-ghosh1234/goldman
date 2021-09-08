const art_furnitureRepo = require('art_furniture/repositories/art_furniture.repository');

class art_FurnitureController {
  constructor() { }


  async getContent(req, res) {
    try {
      let art_furnitureStaticText = await art_furnitureRepo.getByField({});
      if (art_furnitureStaticText) {
        return {
          status: 200,
          data: art_furnitureStaticText,
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
module.exports = new art_FurnitureController();