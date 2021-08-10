const menuRepo = require('menu/repositories/menu.repository');

class menuController {
	constructor() { }

	async getAllMenus(req, res) {
		try {

			let menuContent = await menuRepo.getAllByField(req.params.menu_type);
			if (!_.isEmpty(menuContent)) {
				return { status: 200, data: menuContent, message: 'Menu fetched successfully.' }
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

module.exports = new menuController();