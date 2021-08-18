const staticTextRepo = require('staticText/repositories/staticText.repository');

class staticTextController {
	constructor() { }

	async getAllStaticText(req, res) {
		try {

			let getContent = await staticTextRepo.getAllByField();
			if (!_.isEmpty(getContent)) {
				return { status: 200, data: getContent, message: 'Menu fetched successfully.' }
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

module.exports = new staticTextController();