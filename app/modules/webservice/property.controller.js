const propertyRepo = require('property/repositories/property.repository');

class newsController {
    constructor() { }

    async propertyList(req, res) {
        try {
            let listData = await propertyRepo.getAllProperty(req);

            if (!_.isEmpty(listData.data)) {
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
    }
}

module.exports = new newsController();