const mongoose = require('mongoose');
const StaticText = require('staticText/models/staticText.model');
const perPage = config.PAGINATION_PERPAGE;

const staticTextRepository = {

    getAll: async (req) => {
        //console.log("REPO",req.body);
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

            var aggregate = StaticText.aggregate([{
                    $match: conditions
                },
                sortOperator
            ]);
            // console.log("AGGR", aggregate)
            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allStaticText = await StaticText.aggregatePaginate(aggregate, options);
            // console.log("AGGR",allCms)
            return allStaticText;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let staticText = await StaticText.findById(id).lean().exec();
        try {
            if (!staticText) {
                return null;
            }
            return staticText;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let staticText = await StaticText.findOne(params).lean().exec();
        try {
            if (!staticText) {
                return null;
            }
            return staticText;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        let staticText = await StaticText.find(params).exec();
        try {
            if (!staticText) {
                return null;
            }
            return staticText;

        } catch (e) {
            return e;
        }
    },



    save: async (data) => {
        try {
            let staticText = await StaticText.create(data);
            if (!staticText) {
                return null;
            }
            return staticText;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let staticText = await StaticText.findById(id);
            if (staticText) {
                let staticTextDelete = await CareerJob.remove({
                    _id: id
                }).exec();
                if (!staticTextDelete) {
                    return null;
                }
                return staticTextDelete;
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
            let staticText = await StaticText.findByIdAndUpdate(id, data, {
                new: true
            }).exec();
            if (!staticText) {
                return null;
            }
            return staticText;
        } catch (e) {
            console.log('erererererer 159', e.message);
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },
};

module.exports = staticTextRepository;