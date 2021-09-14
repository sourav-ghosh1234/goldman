const propertyRepo = require('property/repositories/property.repository');
const propertyContentRepo = require('property_content/repositories/property_content.repository');
const mongoose = require('mongoose');

class newsController {
    constructor() { }

    async getContentEdit(req, res) {
        try {
          let propertyContent = await propertyContentRepo.getByField({});
          if (propertyContent) {
            return { status: 200, data: propertyContent, message: 'Text fetched successfully.' }
          } else {
            return {  status: 201, data: [], message: 'There are no data at this moment.' }
          }
        } catch (error) {
          return res.status(500).send({ message: error.message });
        }
      }

    async propertyList(req, res) {
        try {
            let listData = await propertyRepo.getAllProperty(req);

            if (!_.isEmpty(listData)) {
                return {
                    status: 200,
                    data: listData.data,
                    pageCount: listData.pageCount,
                    totalCount: listData.totalCount,
                    message: 'Property fetched successfully.'
                }
            } else {
                return { status: 201, data: [], message: 'No Record Found!' }
            }
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    async propertyDetails(req, res) {
        try {
            let property_id = mongoose.Types.ObjectId(req.params.id);

            if (property_id == null || property_id == '') {
                return { status: 201, data: {}, message: 'Missing property id!' }
            }

            let PropertyData = await propertyRepo.getPropertyDetails({ _id:  mongoose.Types.ObjectId(property_id) });

            if (!_.isEmpty(PropertyData)) {
                return {
                    status: 200,
                    data: PropertyData,
                    message: 'Property details fetched successfully.'
                }
            } else {
                return { status: 201, data: {}, message: 'No Record Found!' }
            }
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

module.exports = new newsController();