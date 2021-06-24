const mongoose = require('mongoose');
const User = require('user/models/user.model');
const perPage = config.PAGINATION_PERPAGE;

const HostRepository = {
    getAll: async(req) => {
        // console.log(req.body);
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false,

            });
            // if (req.body.role.length) {
            //     and_clauses.push({
            //         "role": { $in: req.body.role.map(mongoose.Types.ObjectId) }
            //     });
            // }
            if (req.body.query && req.body.query.role) {
                and_clauses.push({ role: mongoose.Types.ObjectId(req.body.query.role) })
            } else if (req.body.role.length > 0) {
                and_clauses.push({
                    "role": { $in: req.body.role.map(mongoose.Types.ObjectId) }
                });
            } else {

            }

            // console.log(24, req.body.query.role, req.body.role);
            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [
                        { 'first_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'last_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'email': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'phone': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "isActive": JSON.parse(req.body.query.Status)
                });
            }
            conditions['$and'] = and_clauses;

            var sortOperator = {
                "$sort": {}
            };
            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }

                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            console.log(66, JSON.stringify(conditions));
            var aggregate = User.aggregate([{
                    $lookup: {
                        from: 'roles',
                        localField: 'role',
                        foreignField: '_id',
                        as: 'roleDetails'
                    }
                },
                {
                    $unwind: '$roleDetails'
                },
                {
                    $match: conditions
                },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allUser = await User.aggregatePaginate(aggregate, options);
            return allUser;
        } catch (e) {
            console.log(84, e);
            throw (e);
        }
    },

    getById: async(id) => {
        try {
            let data = await User.findById(id).exec();
            return data;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async(params) => {
        try {
            let data = await User.findOne(params).exec();
            return data;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async(params) => {
        try {
            let data = await User.find(params).exec();
            return data;
        } catch (e) {
            throw (e);
        }
    },

    delete: async(id) => {
        try {
            let data = await User.findById(id);

            if (data) {
                let UserDelete = await User.remove({
                    _id: id
                }).exec();
                return UserDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },

    deleteByField: async(field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async(datas, id) => {
        try {
            let data = await User.findByIdAndUpdate(id, datas, {
                new: true,
                upsert: true
            }).exec();
            return data;
        } catch (e) {
            throw (e);
        }
    },

    getUserCount: async(params) => {
        try {
            let data = await User.countDocuments(params);
            return data;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async(field, fieldValue, data) => {
        //todo: update by field
    },

    save: async(datas) => {
        try {
            let data = await User.create(datas);
            if (!data) {
                return null;
            }
            return data;
        } catch (e) {
            throw e;
        }
    },

};

module.exports = HostRepository;