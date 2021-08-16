const mongoose = require('mongoose');
const SaleContent = require('real_estate/models/sale_real_estate_content.model');
const RentContent = require('real_estate/models/rent_real_estate_content.model');
const perPage = config.PAGINATION_PERPAGE;

const RealEstateRepository = {

    getAllSaleContent: async (req) => {
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
            if (_.isObject(req.body.query) && _.has(req.body.query, 'City')) {
                and_clauses.push({ "cityId": mongoose.Types.ObjectId(req.body.query.City) });
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
                sortOperator["$sort"]['_id'] = 1;
            }

            var aggregate = SaleContent.aggregate([
                { $match: conditions},
                {
                    $lookup: {
                        from: 'cities',
                        localField: 'cityId',
                        foreignField: '_id',
                        as: 'cityDetails'
                    }
                },
                sortOperator
            ]);
            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allsalecontents = await SaleContent.aggregatePaginate(aggregate, options);
            return allsalecontents;
        } catch (e) {
            throw (e);
        }
    },
    getSaleContentById: async(id) => {
        let result = await SaleContent.findById(id).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getsaleContent: async(params) => {
        let result = await SaleContent.findOne(params).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    updateSaleContentById: async(data, id) => {
        try {
            let result = await SaleContent.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

    saveSaleContent: async (data) => {
        try {
            let save = await SaleContent.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },


    getAllRentContent: async (req) => {
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
            if (_.isObject(req.body.query) && _.has(req.body.query, 'City')) {
                and_clauses.push({ "cityId": mongoose.Types.ObjectId(req.body.query.City) });
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
                sortOperator["$sort"]['_id'] = 1;
            }

            var aggregate = RentContent.aggregate([
                { $match: conditions},
                {
                    $lookup: {
                        from: 'cities',
                        localField: 'cityId',
                        foreignField: '_id',
                        as: 'cityDetails'
                    }
                },
                sortOperator
            ]);
            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allrentcontents = await RentContent.aggregatePaginate(aggregate, options);
            return allrentcontents;
        } catch (e) {
            throw (e);
        }
    },
    getRentContentById: async(id) => {
        let result = await RentContent.findById(id).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getrentContent: async(params) => {
        let result = await RentContent.findOne(params).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    updateRentContentById: async(data, id) => {
        try {
            let result = await RentContent.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

    saveRentContent: async (data) => {
        try {
            let save = await RentContent.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },


};

module.exports = RealEstateRepository;