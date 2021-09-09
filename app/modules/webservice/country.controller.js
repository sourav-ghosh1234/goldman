const cityRepo = require('city/repositories/city.repository');
const countryRepo = require('country/repositories/country.repository');

class CountryCityController {
	constructor() { }

    async getCountryList(req, res) {
		try {
			let countryList = await countryRepo.getAllByField({ 'isDeleted': false, 'status': 'Active' });
			if (!_.isEmpty(countryList)) {
				return { status: 200, data: countryList, message: 'Country list fetched successfully.' }
			}
			else {
				return { status: 201, data: [], message: 'There are no data at this moment.' }
			}
		}
		catch (error) {
			return res.status(500).send({ message: error.message });
		}
	}

    async getCityByCountry(req, res) {
		try {
			let cityList = await cityRepo.getAllByField({ 'countryId': req.params.countryId, 'isDeleted': false, 'status': 'Active' });
			if (!_.isEmpty(cityList)) {
				return { status: 200, data: cityList, message: 'City list fetched successfully.' }
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

module.exports = new CountryCityController();