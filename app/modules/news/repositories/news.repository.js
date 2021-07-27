const mongoose = require('mongoose');
const News = require('news/models/news.model');
const perPage = config.PAGINATION_PERPAGE;

const newsRepository = {

    getAll: async (req) => {
		try {
			
			var conditions = {};
			var and_clauses = [];
            and_clauses.push({"isDeleted": false});

			if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
				//and_clauses.push({"status": /req.body.query.generalSearch/i});
				and_clauses.push({
					$or: [
							{'title': {$regex: req.body.query.generalSearch,$options: 'i'}},
							{'content': {$regex: req.body.query.generalSearch,$options: 'i'}},
							{'author_name': {$regex: req.body.query.generalSearch,$options: 'i'}}
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
				sortOperator["$sort"]['__order'] = 1;
				sortOperator["$sort"]['_id'] = -1;
			}
		
			var aggregate = News.aggregate([
               { $match: conditions	},
                sortOperator
            ]);
		
			var options = {
				page: req.body.pagination.page,
				limit: req.body.pagination.perpage
			};
			let allNews = await News.aggregatePaginate(aggregate, options);
			return allNews;
		}
		catch (e) {
			throw (e);
		}
	},

    getAllData: async (param) => {
        try {
            var conditions = {};
            conditions['$and'] = param;
            console.log(param);
            let aggregate = await News.aggregate([
            { $match: conditions },
            {$sort: {_id: -1}}
            ]);

            if (_.isEmpty(aggregate)) {
                return null;
            }

            return aggregate;

        } catch (e) {
            throw (e);
        }
    },  

    getDetails: async (param) => {
        try {
            var conditions = {};
            conditions['$and'] = param;
            let aggregate = await News.aggregate([
            { $match: conditions }
            ]);

            if (_.isEmpty(aggregate)) {
                return null;
            }

            return aggregate[0];

        } catch (e) {
            throw (e);
        }
    },

    details: async (param) => {
        try {
            let aggregate = await News.aggregate([
            { $match: param }
            ]);

            if (_.isEmpty(aggregate)) {
                return null;
            }

            return aggregate[0];

        } catch (e) {
            throw (e);
        }
    },

    

    getById: async (id) => {
        try {
            let datas = await News.findById(id).lean().exec();
            if (!datas) {
                return null;
            }
            return datas;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        try {
            let datas = await News.findOne(params).exec();
            if (!datas) {
                return null;
            }
            return datas;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let datas = await News.find(params).exec();
            if (!datas) {
                return null;
            }
            return datas;

        } catch (e) {
            return e;
        }
    },

    getNewsCount: async (params) => {
        try {
            let datasCount = await News.countDocuments(params);
            if (!datasCount) {
                return null;
            }
            return datasCount;
        } catch (e) {
            return e;
        }

    },

    save: async (data) => {
        try {
            let datas = await News.create(data);
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let datas = await News.findById(id);
            if (datas) {
                let datasDelete = await News.deleteOne({ _id: id }).exec();
                if (!datasDelete) {
                    return null;
                }
                return datasDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },

    updateById: async (data, id) => {
        try {
            let datas = await News.findByIdAndUpdate(id, data, { new: true, upsert: true });
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

};

module.exports = newsRepository;