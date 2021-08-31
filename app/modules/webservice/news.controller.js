const newsRepo = require('news/repositories/news.repository');

class newsController {
	constructor() { }

	async getAll(req, res) {
		try {

			let getContent = await newsRepo.getAllByField({status:'Active',isDeleted:false});
			if (!_.isEmpty(getContent)) {
				return { status: 200, data: getContent, message: 'News fetched successfully.' }
			}
			else {
				return { status: 201, data: [], message: 'There are no data at this moment.' }
			}
		}
		catch (error) {
			return res.status(500).send({ message: error.message });
		}
	}


    async detail(req, res) {
		try {
            let newsId = req.params.id;
			let getContent = await newsRepo.getById(newsId);
			if (!_.isEmpty(getContent)) {
				return { status: 200, data: getContent, message: 'News fetched successfully.' }
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

module.exports = new newsController();