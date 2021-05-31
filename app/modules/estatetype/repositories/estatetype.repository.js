const mongoose = require('mongoose');
const Estatetype = require('estatetype/models/estatetype.model');
const perPage = config.PAGINATION_PERPAGE;
var moment = require('moment');

const estatetypeRepository = {

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
            var aggregate = Estatetype.aggregate([

                { $match: conditions },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allEstatetype = await Estatetype.aggregatePaginate(aggregate, options);

            return allEstatetype;
        } catch (e) {
            throw (e);
        }
    },


    getAllWithoutPaginate: async (params) => {
        try {
            let estatetype = await Estatetype.aggregate([{
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
            if (!estatetype) {
                return null;
            }
            return estatetype;
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

            
            var allEstatetype = await Estatetype.aggregate([
                            { $match: conditions },
                            //sortOperator
                        ]);

           // console.log("allEstatetype>>", allEstatetype)

            return allEstatetype;
        } 
        catch (e) {
            throw (e);
        }
    },

    getById: async(id) => {
        try {
            let estatetype = await Estatetype.findById(id).lean().exec();
            if (!estatetype) {
                return null;
            }
            return estatetype;

        } catch (e) {
            return e;
        }
    },

    getByField: async(params) => {

        try {
            let estatetype = await Estatetype.findOne(params).exec();
            if (!estatetype) {
                return null;
            }
            return estatetype;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        try {
            let estatetype = await Estatetype.find(params).sort({ 'title': 1 }).exec();
            if (!estatetype) {
                return null;
            }
            return estatetype;

        } catch (e) {
            return e;
        }
    },


    delete: async(id) => {
        try {
            let estatetype = await Estatetype.findById(id);
            if (estatetype) {
                let estatetypeDelete = await Estatetype.remove({
                    _id: id
                }).exec();
                if (!estatetypeDelete) {
                    return null;
                }
                return estatetypeDelete;
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
            let estatetype = await Estatetype.findByIdAndUpdate(id, data, { new: true });
            if (!estatetype) {
                return null;
            }
            return estatetype;
        } catch (e) {
            return e;
        }
    },

    updateByField: async(field, fieldValue, data) => {
        try {
            let estatetype = await Estatetype.findByIdAndUpdate(fieldValue, field, { new: true });
            if (!estatetype) {
                return null;
            }
            return estatetype;
        } catch (e) {
            return e;
        }
    },
    getEstatetypeCount: async(params) => {
        try {
            let estatetype = await Estatetype.countDocuments(params);
            if (!estatetype) {
                return null;
            }
            return estatetype;
        } catch (e) {
            throw (e);
        }
    },

    save: async(data) => {
        try {
            let estatetype = await Estatetype.create(data);

            if (!estatetype) {
                return null;
            }
            return estatetype;
        } catch (e) {
            return e;
        }
    },

    advisorByEstatetype: async(id) => {
        try{
            let aggregate = await Estatetype.aggregate([
                {
                    $lookup:{
                        'from':'users',
                        'localField':'_id',
                        'foreignField':'estatetype',
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
            let aggregate = await Estatetype.aggregate([
                                {
                                    $lookup:{
                                        'from':'users',
                                        'localField':'_id',
                                        'foreignField':'estatetype',
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

module.exports = estatetypeRepository;