const mongoose = require('mongoose');
const color = require('color/models/color.model');
const perPage = config.PAGINATION_PERPAGE;

const ColorRepository = {

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
                        'name': {
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

            var aggregate = color.aggregate([
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
            let allcolors = await color.aggregatePaginate(aggregate, options);
            return allcolors;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let colors = await color.findById(id).lean().exec();
        try {
            if (!colors) {
                return null;
            }
            return colors;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let colors = await color.findOne(params).exec();
        try {
            if (!colors) {
                return null;
            }
            return colors;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        try {
            let colors = await color.find(params).sort({ '_id': -1 }).exec();
            if (!colors) {
                return null;
            }
            return colors;

        } catch (e) {
            return e;
        }
    },

    getColorCount: async (params) => {
        try {
            let colorsCount = await color.countDocuments(params);
            if (!colorsCount) {
                return null;
            }
            return colorsCount;
        } catch (e) {
            return e;
        }

    },

    save: async (data) => {
        try {
            let save = await color.create(data);
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
            let colors = await color.findById(id);
            if (colors) {
                let colorsDelete = await color.remove({
                    _id: id
                }).exec();
                if (!colorsDelete) {
                    return null;
                }
                return colorsDelete;
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
            let colors = await color.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            if (!colors) {
                return null;
            }
            return colors;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

};

module.exports = ColorRepository;