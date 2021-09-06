const cityRepo = require('city/repositories/city.repository');
const countryRepo = require('country/repositories/country.repository');
const propertyTypeRepo = require('propertytype/repositories/propertytype.repository');

class masterController {
    constructor() { }

    async cityData(req, res) {
        try {

            let cityInfo = await cityRepo.getAllCity({ status: "Active" });

            if (!_.isEmpty(cityInfo)) {
                return { status: 200, data: cityInfo, message: 'City fetched successfully.' }
            }
            else {
                return { status: 201, data: [], message: 'There are no data at this moment.' }
            }
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };


    async countryData(req, res) {
        try {

            let countryInfo = await countryRepo.getAllByField({ status: "Active" });

            if (!_.isEmpty(countryInfo)) {
                return { status: 200, data: countryInfo, message: 'Country fetched successfully.' }
            }
            else {
                return { status: 201, data: [], message: 'There are no data at this moment.' }
            }
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    async propertyTypeData(req, res) {
        try {

            let Info = await propertyTypeRepo.getAllByField({ status: "Active", isDeleted: false });

            if (!_.isEmpty(Info)) {
                return { status: 200, data: Info, message: 'Property Type fetched successfully.' }
            }
            else {
                return { status: 201, data: [], message: 'There are no data at this moment.' }
            }
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

}

module.exports = new masterController();