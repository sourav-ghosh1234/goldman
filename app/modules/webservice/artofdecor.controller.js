const artofdecorRepo = require('artofdecor/repositories/artofdecor.repository');

class artOfDecorController {
  constructor() { }
  

  async getContentEdit(req, res) {
    try {
      let artofdecorStaticText = await artofdecorRepo.getByField({});
      if (artofdecorStaticText) {
        return {
          status: 200,
          data: artofdecorStaticText,
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

module.exports = new artOfDecorController();