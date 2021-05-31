const mongoose = require('mongoose');
const Country = require('country/models/country.model');
const perPage = config.PAGINATION_PERPAGE;

const countryRepository = {
	getAll: async (req) => {
		try {
			var conditions = {};
			var and_clauses = [];
	
			and_clauses.push({"isDeleted": false});
			if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
				//and_clauses.push({"status": /req.body.query.generalSearch/i});
				and_clauses.push({
					$or: [
					      {'title': {$regex: req.body.query.generalSearch,$options: 'i'}}
					]
				});
			}
			if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
				and_clauses.push({"status": req.body.query.Status});
			}
			conditions['$and'] = and_clauses;
			var sortOperator = {"$sort": {}};
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
			var aggregate = Country.aggregate([
							{$match: conditions},
							sortOperator
						]);
	
			var options = {
				page: req.body.pagination.page,
				limit: req.body.pagination.perpage
			};
			let allCountry = await Country.aggregatePaginate(aggregate, options);
			return allCountry;
		}
		catch (e) {
			throw (e);
		}
	},

	getAllCategories: async (req) => {
		try {
			var conditions = {};
			var and_clauses = [];
		
			and_clauses.push({"status": 'Active',"isDeleted": false });
			if (_.isObject(req.params) && _.has(req.params, 'keyword')) {
				and_clauses.push({
					$or: [
						{ 'title': { $regex: req.params.keyword, $options: 'i' } }
					]
				});
			}
			conditions['$and'] = and_clauses;
			
			var result = await Country.aggregate([
							{$match: conditions},
							//{$sort : { price : 1 }}
							{$sort : { title : 1 }}
						]);
			
			//console.log("result>>",result);
			
			return result;
		}
		catch (e) {
			throw (e);
		}
	},

    getCountryCount: async (params) => {
        try {

            let country = await Country.countDocuments(params);
            return country;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let country = await Country.findById(id).exec();
            return country;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let country = await Country.findOne(params).exec();
            return country;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let country = await Country.find(params).exec();
            return country;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let country = await Country.findById(id);
            if (country) {
                let countryDelete = await Country.remove({
                    _id: id
                }).exec();
                return countryDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },

    updateById: async (data, id) => {
        try {
            let country = await Country.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return country;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let country = await Country.create(data);
            if (!country) {
                return null;
            }
            return country;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let country = await Country.find(params).exec();
            return country;
        } catch (e) {
            throw (e);
        }
    }
};

module.exports = countryRepository;