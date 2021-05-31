const mongoose = require('mongoose');
const Propertytype = require('propertytype/models/propertytype.model');
const perPage = config.PAGINATION_PERPAGE;
var moment = require('moment');

const propertytypeRepository = {

    getAll: async(req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } },
                    ]
                });
            }

            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "status": req.body.query.Status
                });
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
            var aggregate = Propertytype.aggregate([

                { $match: conditions },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allPropertytype = await Propertytype.aggregatePaginate(aggregate, options);

            return allPropertytype;
        } catch (e) {
            throw (e);
        }
    },


    getAllWithoutPaginate: async (params) => {
        try {
            let propertytype = await Propertytype.aggregate([{
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
            if (!propertytype) {
                return null;
            }
            return propertytype;
        } catch (e) {
            throw (e);
        }
    },


    getAllBySearchField: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false,"status":"Active" });

            if (_.has(req.body, 'search_val')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.search_val, $options: 'i' } },
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            
            var allPropertytype = await Propertytype.aggregate([
                            { $match: conditions },
                            //sortOperator
                        ]);

           // console.log("allPropertytype>>", allPropertytype)

            return allPropertytype;
        } 
        catch (e) {
            throw (e);
        }
    },

    getById: async(id) => {
        try {
            let propertytype = await Propertytype.findById(id).lean().exec();
            if (!propertytype) {
                return null;
            }
            return propertytype;

        } catch (e) {
            return e;
        }
    },

    getByField: async(params) => {

        try {
            let propertytype = await Propertytype.findOne(params).exec();
            if (!propertytype) {
                return null;
            }
            return propertytype;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        try {
            let propertytype = await Propertytype.find(params).sort({ 'title': 1 }).exec();
            if (!propertytype) {
                return null;
            }
            return propertytype;

        } catch (e) {
            return e;
        }
    },


    delete: async(id) => {
        try {
            let propertytype = await Propertytype.findById(id);
            if (propertytype) {
                let propertytypeDelete = await Propertytype.remove({
                    _id: id
                }).exec();
                if (!propertytypeDelete) {
                    return null;
                }
                return propertytypeDelete;
            }
        } catch (e) {
            return e;
        }
    },

    deleteByField: async(field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async(data, id) => {
        try {
            let propertytype = await Propertytype.findByIdAndUpdate(id, data, { new: true });
            if (!propertytype) {
                return null;
            }
            return propertytype;
        } catch (e) {
            return e;
        }
    },

    updateByField: async(field, fieldValue, data) => {
        try {
            let propertytype = await Propertytype.findByIdAndUpdate(fieldValue, field, { new: true });
            if (!propertytype) {
                return null;
            }
            return propertytype;
        } catch (e) {
            return e;
        }
    },
    getPropertytypeCount: async(params) => {
        try {
            let propertytype = await Propertytype.countDocuments(params);
            if (!propertytype) {
                return null;
            }
            return propertytype;
        } catch (e) {
            throw (e);
        }
    },

    save: async(data) => {
        try {
            let propertytype = await Propertytype.create(data);

            if (!propertytype) {
                return null;
            }
            return propertytype;
        } catch (e) {
            return e;
        }
    },

    advisorByPropertytype: async(id) => {
        try{
            let aggregate = await Propertytype.aggregate([
                {
                    $lookup:{
                        'from':'users',
                        'localField':'_id',
                        'foreignField':'propertytype',
                        'as':'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {$match: {'_id': mongoose.Types.ObjectId(id), 'isDeleted': false, 'status':'Active'}},
                {
                    $group:{
                        '_id':'$_id',
                        'title':{$first:'$title'},
                        'image':{$first:'$image'},
                        'description':{$first:'$description'},
                        'isFeatured':{$first:'$isFeatured'},
                        'isDeleted':{$first:'$isDeleted'},
                        'status':{$first:'$status'},
                        'user_details':{$addToSet:'$user_details'}
                    }
                }
            ]);
            return aggregate;
        }catch(e){
            return e;
        }
    },

    getAllDetails:async(id)=>{
        try{
            let aggregate = await Propertytype.aggregate([
                                {
                                    $lookup:{
                                        'from':'users',
                                        'localField':'_id',
                                        'foreignField':'propertytype',
                                        'as':'user_details'
                                    }
                                },
                                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                                 {$match: {'_id': mongoose.Types.ObjectId(id), 'isDeleted': false, 'status':'Active'}},
                                {
                                    $lookup:{
                                        'from':'assignadvisors',
                                        'localField':'user_details._id',
                                        'foreignField':'advisor',
                                        'as':'user_details.advisordata'
                                    }
                                },
                                //{ $unwind: { path: '$user_details.advisordata', preserveNullAndEmptyArrays: false } },
                                {
                                    $group:{
                                        "_id":"$_id",
                                        "title":{$first:"$title"},
                                        "image":{$first:"$image"},
                                        "description": {$first:"$description"},
                                        "isFeatured": {$first:"$isFeatured"},
                                        "isDeleted": {$first:"$isDeleted"},
                                        "status": {$first:"$status"}, 
                                        "users":{$addToSet:"$user_details"}, 
                                    }
                                },
                            ]);

            return aggregate[0];
        }
        catch(e){
            return e;
        }
    },



};

module.exports = propertytypeRepository;