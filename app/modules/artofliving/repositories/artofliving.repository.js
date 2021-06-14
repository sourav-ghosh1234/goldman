const mongoose = require('mongoose');
const ArtOfLiving = require('artofliving/models/artofliving.model');
const perPage = config.PAGINATION_PERPAGE;

const cmsRepository = {

    getAll: async(req) => {

        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'slug': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'desc': { $regex: req.body.query.generalSearch, $options: 'i' } }
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
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }

                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            var aggregate = ArtOfLiving.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allArtOfLiving = await ArtOfLiving.aggregatePaginate(aggregate, options);

            return allArtOfLiving;
        } catch (e) {
            throw (e);
        }
    },

    getById: async(id) => {
        let cms = await ArtOfLiving.findById(id).exec();
        try {
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getByField: async(params) => {
        let cms = await ArtOfLiving.findOne(params).exec();
        try {
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        let user = await ArtOfLiving.find(params).exec();
        try {
            if (!user) {
                return null;
            }
            return user;

        } catch (e) {
            return e;
        }
    },

    getCmsCount: async(params) => {
        try {
            let cmsCount = await ArtOfLiving.countDocuments(params);
            if (!cmsCount) {
                return null;
            }
            return cmsCount;
        } catch (e) {
            return e;
        }
    },

    delete: async(id) => {
        try {
            let cms = await ArtOfLiving.findById(id);
            if (cms) {
                let cmsDelete = await ArtOfLiving.remove({ _id: id }).exec();
                if (!cmsDelete) {
                    return null;
                }
                return cmsDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async(data, id) => {
        try {
            let cms = await ArtOfLiving.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!cms) {
                return null;
            }
            return cms;
        } catch (e) {
            return e;
        }
    },

};

module.exports = cmsRepository;