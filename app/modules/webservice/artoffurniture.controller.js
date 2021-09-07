const artOfFurnitureRepo = require('artoffurniture/repositories/artoffurniture.repository');
const furnitureCategoryRepo = require('furniture_category/repositories/furniture_category.repository');


class newsController {
	constructor() { }

	async getArtFurnitureList(req, res) {
		try {
            if (_.isObject(req.body) && _.has(req.body, 'slug')) {

                let catInfo = await furnitureCategoryRepo.getByField({slug:req.body.slug.trim()})
                if(!_.isEmpty(catInfo)){
                    req.body.category_id=  catInfo._id;

                    let listData = await artOfFurnitureRepo.getAllArtFurniture(req);

                    if (!_.isEmpty(listData)) {
                        return { status: 200, 
                            data: listData.data,
                            pageCount: listData.pageCount,
                            totalCount: listData.totalCount,
                            message: 'Art Of Furniture fetched successfully.' }
                    }	else {
                        return { status: 201, data: [], message: 'There are no data at this moment.' }
                    }
                }else{
                    return { status: 201, data: [], message: 'Slug is invalid!' }  
                }
			}else{
                return { status: 201, data: [], message: 'Category slug is required!' }  
            }
		}
		catch (error) {
			return res.status(500).send({ message: error.message });
		}
	}

}

module.exports = new newsController();