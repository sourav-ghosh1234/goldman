const artofdecorContentRepo = require('artofdecor/repositories/artofdecor.repository');
const artOfDecorRepo = require('art_decor/repositories/art_decor.repository');
const mongoose = require('mongoose');

class artOfDecorController {
  constructor() { }
  

  async getContentEdit(req, res) {
    try {
      let artofdecorStaticText = await artofdecorContentRepo.getByField({});
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

  async getArtdecorList(req, res) {
		try {
      req.body.page = parseInt(req.body.page) || 1;
      req.body.limit = parseInt(req.body.limit) || config.PAGINATION_PERPAGE;

      let decoderList = await artOfDecorRepo.getArtOfDecorList(req);
      if (!_.isEmpty(decoderList)) {
          return { status: 200, data: decoderList.data, pageCount: decoderList.pageCount, totalCount: decoderList.totalCount, message: 'Records fetched successfully.' }
      }	else {
          return { status: 201, data: [], message: 'There are no data at this moment.' }
      }
		}
		catch (error) {
			return res.status(500).send({ message: error.message });
		}
	};

  async getArtdecorDetails(req, res) {
		try {
      let decoder = await artOfDecorRepo.getArtOfDecorDetails({'_id': mongoose.Types.ObjectId(req.params.id)});
      if (!_.isEmpty(decoder)) {
          return { status: 200, data: decoder[0], message: 'Records fetched successfully.' }
      }	else {
          return { status: 201, data: [], message: 'There are no data at this moment.' }
      }
		}
		catch (error) {
			return res.status(500).send({ message: error.message });
		}
	};


 
}

module.exports = new artOfDecorController();