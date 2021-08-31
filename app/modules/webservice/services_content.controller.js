const serviceContentRepo = require('services_content/repositories/services_content.repository');
const propertiesPrivateRepo = require('services_content/repositories/properties_private.repository');
const investmentRealtyRepo = require('services_content/repositories/investment_realty.repository');
const lifeAnnuitiesRepo = require('services_content/repositories/life_annuities.repository');

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

  async getPropertiesPrivate(req, res) {
    try {
      let propertiesPrivate = await propertiesPrivateRepo.getByField({});
      if (propertiesPrivate) {
        return {
          status: 200,
          data: propertiesPrivate,
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


  async getInvestmentRealty(req, res) {
    try {
      let investmentRealty = await investmentRealtyRepo.getByField({});
      if (investmentRealty) {
        return {
          status: 200,
          data: investmentRealty,
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