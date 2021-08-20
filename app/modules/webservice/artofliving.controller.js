const artoflivingRepo = require('artofliving/repositories/artofliving.repository');
const countryEstateRepo = require('artofliving/repositories/country_estate.repository');
const yachtingWorldRepo = require('artofliving/repositories/yachting_world.repository');

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

  async getCountryEstates(req, res) {
    try {
      let artoflivingYachtingWorld = await yachtingWorldRepo.getByField({});
      let artoflivingYachtingWorldBoatCharter = await yachtingWorldRepo.getAllBoatCharterByField({
        'status': 'Active',isDeleted:false
    });
    artoflivingYachtingWorld.boat_charter_service = artoflivingYachtingWorldBoatCharter 
      if (artoflivingYachtingWorld) {
        return {
          status: 200,
          data: artoflivingYachtingWorld,
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