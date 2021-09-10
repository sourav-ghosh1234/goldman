const Country = require('country/models/country.model');
const perPage = config.PAGINATION_PERPAGE;

class CountryRepository {
    constructor() {}

	async getAll(req) {
		try {
			var conditions = {};
			var and_clauses = [];
			and_clauses.push({ "isDeleted": false });
	
			if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
				and_clauses.push({ 'country_name': { $regex: req.body.query.generalSearch, $options: 'i' } });
			}
			if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
				and_clauses.push({ "status": req.body.query.Status });
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
	
			var aggregate =  Country.aggregate([
								{ $match: conditions },
								sortOperator
							]);
	
			var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
			let allCountry = await Country.aggregatePaginate(aggregate, options);
			return allCountry;
		}
		catch (e) {
			throw (e);
		}
	}
    
    
    
    async getAllCountry(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await Country.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }
   
    async getById(id) {
        try {
            return await Country.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await Country.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await Country.find(_params).sort({'country_name':1}).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await Country.findByIdAndUpdate(id, data, {
                    new: true,
                    upsert: true
                })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getCountryCount() {
        try {
            return await Country.count({"isDeleted": false,"status":"Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new Country(data);
            return await _save.save();
        } catch (error) {
            return error;
        }
    }

    async getActiveCountry(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await Country.find(_params).sort({"country_name":1}).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await Country.findById(id).lean().exec();
            return await Country.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    }
}

module.exports = new CountryRepository();