const mongoose = require('mongoose');
const Amenities = require('amenities/models/amenities.model');
const perPage = config.PAGINATION_PERPAGE;

const amenitiesRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [{
                        'title': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    },
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "status": req.body.query.Status
                });
            }
            conditions['$and'] = and_clauses;
            // console.log(JSON.stringify(conditions))

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
                sortOperator["$sort"]['_id'] = 1;
            }

            var aggregate = Amenities.aggregate([
                {
                    $match: conditions
                },
                sortOperator
            ]);
            // console.log("AGGR", aggregate)
            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allamenities = await Amenities.aggregatePaginate(aggregate, options);
            return allamenities;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let amenities = await Amenities.findById(id).lean().exec();
        try {
            if (!amenities) {
                return null;
            }
            return amenities;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let amenities = await Amenities.findOne(params).exec();
        try {
            if (!amenities) {
                return null;
            }
            return amenities;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        try {
            let amenities = await Amenities.find(params).sort({ '_id': -1 }).exec();
            if (!amenities) {
                return null;
            }
            return amenities;

        } catch (e) {
            return e;
        }
    },

    getAmenitiesCount: async (params) => {
        try {
            let amenitiesCount = await Amenities.countDocuments(params);
            if (!amenitiesCount) {
                return null;
            }
            return amenitiesCount;
        } catch (e) {
            return e;
        }

    },

    save: async (data) => {
        try {
            let save = await Amenities.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let amenities = await Amenities.findById(id);
            if (amenities) {
                let amenitiesDelete = await Amenities.remove({
                    _id: id
                }).exec();
                if (!amenitiesDelete) {
                    return null;
                }
                return amenitiesDelete;
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
            let amenities = await Amenities.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            if (!amenities) {
                return null;
            }
            return amenities;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

};

module.exports = amenitiesRepository;