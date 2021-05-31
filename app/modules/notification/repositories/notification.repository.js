const mongoose = require('mongoose');
const NotificationModel = require('notification/models/notification.model');
const perPage = config.PAGINATION_PERPAGE;

const notificationRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });

            if(_.isObject(req.body) && _.has(req.body, 'type')){
                and_clauses.push({ "group" : req.body.type});
            }

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'content': { $regex: req.body.query.generalSearch, $options: 'i' } },
                    ]
                });
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
			sortOperator["$sort"]['_id'] = 1;
		}
		
            var aggregate =  NotificationModel.aggregate([
                { $match: conditions },
                sortOperator
            ]);
            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let alldatas = await NotificationModel.aggregatePaginate(aggregate, options);
            return alldatas;
        } catch (e) {
            throw (e);
        }
    },

    getAllWithoutPaginate: async (params) => {
        try {
            let notifications = await NotificationModel.aggregate([{
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'roleDetails'
                }
            },
            {
                $match: params
            }
            ]);
            if (!notifications) {
                return null;
            }
            return notifications;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let datas = await NotificationModel.findById(id).lean().exec();
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
            let datas = await NotificationModel.findOne(params).exec();
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
            let datas = await NotificationModel.find(params).exec();
            if (!datas) {
                return null;
            }
            return datas;

        } catch (e) {
            return e;
        }
    },

    getdatasCount: async (params) => {
        try {
            let datasCount = await NotificationModel.countDocuments(params);
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
            let datas = await NotificationModel.create(data);
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
            let datas = await NotificationModel.findById(id);
            if (datas) {
                let datasDelete = await NotificationModel.deleteOne({ _id: id }).exec();
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
            let datas = await NotificationModel.findByIdAndUpdate(id, data, { new: true, upsert: true });
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

module.exports = notificationRepository;