const mongoose = require('mongoose');
const YachtingWorld = require('artofliving/models/yachting_world.model');
const YachtingBoatCharterWorld = require('artofliving/models/yachting_world_boat_charter.model');
const perPage = config.PAGINATION_PERPAGE;

const YachtingWorldRepository = {

    getById: async(id) => {
        let result = await YachtingWorld.findById(id).exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getByField: async(params) => {
        let result = await YachtingWorld.findOne(params).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        let result = await YachtingWorld.find(params).exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    delete: async(id) => {
        try {
            let result = await YachtingWorld.findById(id);
            if (result) {
                let resultDelete = await YachtingWorld.remove({ _id: id }).exec();
                if (!resultDelete) {
                    return null;
                }
                return resultDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async(data, id) => {
        try {
            let result = await YachtingWorld.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

    getAllBoatCharter: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [{
                        'heading': {
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

            var aggregate = YachtingBoatCharterWorld.aggregate([
                {
                    $match: conditions
                },
                sortOperator
            ]);
            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allData = await YachtingBoatCharterWorld.aggregatePaginate(aggregate, options);
            return allData;
        } catch (e) {
            throw (e);
        }
    },
    getBoatCharterById: async(id) => {
        let result = await YachtingBoatCharterWorld.findById(id).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getBoatCharterByField: async(params) => {
        let result = await YachtingBoatCharterWorld.findOne(params).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getAllBoatCharterByField: async(params) => {
        let result = await YachtingBoatCharterWorld.find(params).exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },
    savetBoatCharter: async (data) => {
        try {
            let save = await YachtingBoatCharterWorld.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },
    
    deleteBoatCharter: async(id) => {
        try {
            let result = await YachtingBoatCharterWorld.findById(id);
            if (result) {
                let resultDelete = await YachtingBoatCharterWorld.remove({ _id: id }).exec();
                if (!resultDelete) {
                    return null;
                }
                return resultDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateBoatCharterById: async(data, id) => {
        try {
            let result = await YachtingBoatCharterWorld.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

};

module.exports = YachtingWorldRepository;