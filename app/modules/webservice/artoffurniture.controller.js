const artOfFurnitureRepo = require('artoffurniture/repositories/artoffurniture.repository');
const furnitureCategoryRepo = require('furniture_category/repositories/furniture_category.repository');
const mongoose = require('mongoose');


class newsController {
	constructor() { }

	async getArtFurnitureList(req, res) {
		try {
            if (_.isObject(req.body) && _.has(req.body, 'slug')) {

                let catInfo = await furnitureCategoryRepo.getByField({slug:req.body.slug.trim()})
                if(!_.isEmpty(catInfo)){
                    req.body.category_id=  catInfo._id;

                    let listData = await artOfFurnitureRepo.getAllArtOfFurniture(req);

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
	};


    async getArtFurnitureDetails(req,res){
        try{
            let art_furniture_id = mongoose.Types.ObjectId(req.params.id);

            if (art_furniture_id == null || art_furniture_id == '') {
                return { status: 201, data: {}, message: 'Missing art of furniture id!' }
            }

            let artData = await artOfFurnitureRepo.getArtOfFurnitureDetails({_id:art_furniture_id});

            if (!_.isEmpty(artData)) {
                return {
                    status: 200,
                    data: artData,
                    message: 'Art Of Furniture fetched successfully.'
                }
            } else {
                return { status: 201, data: {}, message: 'No Record Found!' }
            }

        }catch (error) {
			return res.status(500).send({ message: error.message });
		}
    }

}

module.exports = new newsController();