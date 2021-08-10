const languageRepo = require('language/repositories/language.repository');

class languageController {
	constructor() { }
    async getLanguages(req, res) {
		try {
			let list = await languageRepo.getAllByField({ 'isDeleted': false, 'status': 'Active' });
			if (!_.isEmpty(list)) {
				return { status: 200, data: list, message: 'List fetched successfully.' }
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

module.exports = new languageController();