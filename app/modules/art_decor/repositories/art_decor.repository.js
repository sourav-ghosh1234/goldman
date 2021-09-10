const ArtOfDecor = require('art_decor/models/art_decor.model');
const perPage = config.PAGINATION_PERPAGE;
const mongoose = require('mongoose');

class artOfDecorRepository {
    constructor() {}

	async getAll(req) {
		try {
			var conditions = {};
			var and_clauses = [];
			and_clauses.push({ "isDeleted": false });
	
			if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
				and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'company_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        {'description':{ $regex: req.body.query.generalSearch, $options: 'i' }}
                    ]
                });
			}

			if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
				and_clauses.push({ "status": req.body.query.Status });
			}

            
            // if (_.isObject(req.body.query) && _.has(req.body.query, 'category_id')) {
			// 	and_clauses.push({ "category":  mongoose.Types.ObjectId(req.body.query.category_id) });
			// }

			conditions['$and'] = and_clauses;
	
			var sortOperator = { "$sort": {} };
			if (_.has(req.body, 'sort')) {
				var sortField = req.body.sort.field;
				if (req.body.sort.sort == 'desc') {
					var sortOrder = -1;
				}
				else if (req.body.sort.sort == 'asc') {
					var sortOrder = 1;
				}
				sortOperator["$sort"][sortField] = sortOrder;
			}
			else {
				sortOperator["$sort"]['_id'] = -1;
			}
	
			var aggregate =  ArtOfDecor.aggregate([
                // {
                //     $lookup: {
                //         from: "furniture_categories",
                //         localField: "category",
                //         foreignField: "_id",
                //         as: "categoryDetails",
                //     },
                // },
                // { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "colors",
                        localField: "colour",
                        foreignField: "_id",
                        as: "colourDetails",
                    },
                },
                { $unwind: { path: "$colourDetails", preserveNullAndEmptyArrays: true } },
                {
                    $group:{
                        '_id':'$_id',
                        'image':{$first:'$image'},
                        'title':{$first:'$title'},
                        'price':{$first:'$price'},
                        'status':{$first:'$status'},
                        'isDeleted':{$first:'$isDeleted'},
                        'company_name':{$first:'$company_name'},
                        'category_name':{$first:'$categoryDetails.name'},
                        'colour':{$addToSet:'$colourDetails.name'},
                    }
                },
				{ $match: conditions },
				sortOperator
				]);
	
			var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
			let allArt = await ArtOfDecor.aggregatePaginate(aggregate, options);
			return allArt;
		}
		catch (e) {
			throw (e);
		}
	}
    
    
    
    async getAllArt(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await ArtOfDecor.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }
   
    async getById(id) {
        try {
            return await ArtOfDecor.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await ArtOfDecor.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await ArtOfDecor.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await ArtOfDecor.findByIdAndUpdate(id, data, {
                    new: true,
                    upsert: true
                })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getArtCount() {
        try {
            return await ArtOfDecor.count({"isDeleted": false,"status":"Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new ArtOfDecor(data);
            return await _save.save();
        } catch (error) {
            return error;
        }
    }

    async getActiveArt(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await ArtOfDecor.find(_params).sort({"title":1}).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await ArtOfDecor.findById(id).lean().exec();
            return await ArtOfDecor.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getArtOfDecorList(req){
        try {
			var conditions = {};
			var and_clauses = [];
			and_clauses.push({ "isDeleted": false,'status':'Active' });
	
			var aggregate =  ArtOfDecor.aggregate([
                {
                    $lookup: {
                        from: "colors",
                        localField: "colour",
                        foreignField: "_id",
                        as: "colourDetails",
                    },
                },
                { $unwind: { path: "$colourDetails", preserveNullAndEmptyArrays: true } },
                {
                    $group:{
                        '_id':'$_id',
                        'title': {$first:'$title'},
                        'company_name': {$first:'$company_name'},
                        'price': {$first:'$price'},
                        'dimensions': {$first:'$dimensions'},
                        'colour': {$addToSet:'$colourDetails.name'},
                        'description': {$first:'$description'},
                        'slug': {$first:'$slug'},
                        'image': {$first:'$image'},
                        'imageGallery': {$first:'$imageGallery'},
                        'status': {$first:'$status'},
                        'isDeleted': {$first:'$isDeleted'},
                        'translate': {$first:'$translate'}
                    }
                },  
				{ $match: conditions }
				]);
	
			var options = { page: req.body.page, limit: req.body.limit };
			let allArt = await ArtOfDecor.aggregatePaginate(aggregate, options);
			return allArt;
		}
		catch (e) {
			throw (e);
		}
    }


    async getArtOfDecorDetails(param){
        try {
			var conditions = {};
			var and_clauses = [];
			and_clauses.push({ "isDeleted": false,'status':'Active' });
	
            and_clauses.push(param);

			conditions['$and'] = and_clauses;


			var aggregate = await ArtOfDecor.aggregate([
				{ $match: conditions },
                {
                    $lookup: {
                        from: "colors",
                        localField: "colour",
                        foreignField: "_id",
                        as: "colourDetails",
                    },
                },
                { $unwind: { path: "$colourDetails", preserveNullAndEmptyArrays: true } },
                {
                    $group:{
                        '_id':'$_id',
                        'title': {$first:'$title'},
                        'company_name': {$first:'$company_name'},
                        'price': {$first:'$price'},
                        'dimensions': {$first:'$dimensions'},
                        'colour': {$addToSet:'$colourDetails.name'},
                        'description': {$first:'$description'},
                        'slug': {$first:'$slug'},
                        'image': {$first:'$image'},
                        'imageGallery': {$first:'$imageGallery'},
                        'status': {$first:'$status'},
                        'isDeleted': {$first:'$isDeleted'},
                        'translate': {$first:'$translate'}
                    }
                },
				]);
			return aggregate;
		}
		catch (e) {
			throw (e);
		}
    }
}

module.exports = new artOfDecorRepository();