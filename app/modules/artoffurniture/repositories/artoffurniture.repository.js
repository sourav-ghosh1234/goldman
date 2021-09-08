const ArtOfFurniture = require('artoffurniture/models/artoffurniture.model');
const perPage = config.PAGINATION_PERPAGE;
const mongoose = require('mongoose');

class ArtOfFurnitureRepository {
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
                        { 'categoryDetails.name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        {'description':{ $regex: req.body.query.generalSearch, $options: 'i' }}
                    ]
                });
			}

			if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
				and_clauses.push({ "status": req.body.query.Status });
			}

            
            if (_.isObject(req.body.query) && _.has(req.body.query, 'category_id')) {
				and_clauses.push({ "category":  mongoose.Types.ObjectId(req.body.query.category_id) });
			}

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
	
			var aggregate =  ArtOfFurniture.aggregate([
                {
                    $lookup: {
                        from: "furniture_categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryDetails",
                    },
                },
                { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
				{ $match: conditions },
				sortOperator
				]);
	
			var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
			let allArt = await ArtOfFurniture.aggregatePaginate(aggregate, options);
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
            return await ArtOfFurniture.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }
   
    async getById(id) {
        try {
            return await ArtOfFurniture.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await ArtOfFurniture.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await ArtOfFurniture.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await ArtOfFurniture.findByIdAndUpdate(id, data, {
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
            return await ArtOfFurniture.count({"isDeleted": false,"status":"Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new ArtOfFurniture(data);
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
            return await ArtOfFurniture.find(_params).sort({"title":1}).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await ArtOfFurniture.findById(id).lean().exec();
            return await ArtOfFurniture.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    }


    async getAllArtOfFurniture(req){
        try {
			var conditions = {};
			var and_clauses = [];
			and_clauses.push({ "isDeleted": false,'status':'Active' });
	
            
            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
				and_clauses.push({ "category":  mongoose.Types.ObjectId(req.body.category_id) });
			}

            console.log(and_clauses,req.body)

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
	
			var aggregate =  ArtOfFurniture.aggregate([
                {
                    $lookup: {
                        from: "furniture_categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryDetails",
                    },
                },
                { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
				{ $match: conditions },
				sortOperator
				]);
	
			var options = { page: req.body.page, limit: req.body.limit };
			let allArt = await ArtOfFurniture.aggregatePaginate(aggregate, options);
			return allArt;
		}
		catch (e) {
			throw (e);
		}
    }


    async getArtOfFurnitureDetails(param){
        try {
			var conditions = {};
			var and_clauses = [];
			and_clauses.push({ "isDeleted": false,'status':'Active' });
	
            and_clauses.push(param);

            console.log(and_clauses,'and_clauses')

			conditions['$and'] = and_clauses;


			var aggregate = await ArtOfFurniture.aggregate([
				{ $match: conditions },
                {
                    $lookup: {
                        from: "furniture_categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryDetails",
                    },
                },
                { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
				]);
			return aggregate;
		}
		catch (e) {
			throw (e);
		}
    }
}

module.exports = new ArtOfFurnitureRepository();