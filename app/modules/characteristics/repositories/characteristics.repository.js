const mongoose = require('mongoose');
const Characteristics = require('characteristics/models/characteristics.model');
const perPage = config.PAGINATION_PERPAGE;

const CharacteristicsRepository = {

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

            var aggregate = Characteristics.aggregate([
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
            let allCharacteristics = await Characteristics.aggregatePaginate(aggregate, options);
            return allCharacteristics;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let characteristics = await Characteristics.findById(id).lean().exec();
        try {
            if (!characteristics) {
                return null;
            }
            return characteristics;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let characteristics = await Characteristics.findOne(params).exec();
        try {
            if (!characteristics) {
                return null;
            }
            return characteristics;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        try {
            let characteristics = await Characteristics.find(params).sort({ '_id': -1 }).exec();
            if (!characteristics) {
                return null;
            }
            return characteristics;

        } catch (e) {
            return e;
        }
    },

    getCharacteristicsCount: async (params) => {
        try {
            let CharacteristicsCount = await Characteristics.countDocuments(params);
            if (!CharacteristicsCount) {
                return null;
            }
            return CharacteristicsCount;
        } catch (e) {
            return e;
        }

    },

    save: async (data) => {
        try {
            let save = await Characteristics.create(data);
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
            let characteristics = await Characteristics.findById(id);
            if (characteristics) {
                let CharacteristicsDelete = await Characteristics.remove({
                    _id: id
                }).exec();
                if (!CharacteristicsDelete) {
                    return null;
                }
                return CharacteristicsDelete;
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
            let characteristics = await Characteristics.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            if (!characteristics) {
                return null;
            }
            return characteristics;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

};

module.exports = CharacteristicsRepository;