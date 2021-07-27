const mongoose = require('mongoose');
const Menu = require('menu/models/menu.model');
const perPage = config.PAGINATION_PERPAGE;

const menuRepository = {

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
                    "menu_type": req.body.query.Status
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

            var aggregate = Menu.aggregate([
                {
                    $lookup:
                        {
                            from: 'menus',
                            localField: 'parent_id',
                            foreignField: '_id',
                            as: 'parentdetails'
                        }
                },
                {
                    $unwind: {
                        path: "$parentdetails",
                        preserveNullAndEmptyArrays: true
                    }
                },
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
            let allMenus = await Menu.aggregatePaginate(aggregate, options);
            // console.log("AGGR",allMenus)
            return allMenus;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let menu = await Menu.findById(id).lean().exec();
        try {
            if (!menu) {
                return null;
            }
            return menu;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let menu = await Menu.findOne(params).exec();
        try {
            if (!menu) {
                return null;
            }
            return menu;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false,
                "status": 'Active',
                "parent_id": null
            });

            if (params != '') {
                and_clauses.push({
                    "menu_type": params
                });
            }
            conditions['$and'] = and_clauses;
            // console.log(JSON.stringify(conditions))

            var sortOperator = {
                "$sort": {}
            };
            sortOperator["$sort"]['menu_order'] = 1;

            var aggregate = await Menu.aggregate([
                {
                    $lookup:
                        {
                            from: 'menus',
                            localField: '_id',
                            foreignField: 'parent_id',
                            as: 'child_details'
                        }
                },
                {
                    $unwind: {
                        path: "$child_details",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match: conditions
                },
                {
                    "$group": {
                        "_id": "$_id",
                        "title": { "$first": "$title" },
                        "translate": { "$first": "$translate" },
                        "menu_order": { "$first": "$menu_order" },
                        "child_details": { "$addToSet": "$child_details" }

                    }
                },

                {
                    $unwind: {
                        path: "$child_details",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    "$group": {
                        "_id": "$_id",
                        "title": { "$first": "$title" },
                        "translate": { "$first": "$translate" },
                        "menu_order": { "$first": "$menu_order" },
                        "child_details": { "$addToSet": "$child_details" }

                    }
                },
                sortOperator,

            ]);
            // console.log("AGGR", aggregate)

            // console.log("AGGR",allMenus)
            // let all_menu = await Menu.find().populate('menus').exec();
            // console.log(all_menu);
            return aggregate;
        } catch (e) {
            throw (e);
        }
    },

    getAllMenus: async (params) => {

    },

    getMenuCount: async (params) => {
        try {
            let menuCount = await Menu.countDocuments(params);
            if (!menuCount) {
                return null;
            }
            return menuCount;
        } catch (e) {
            return e;
        }

    },

    delete: async (id) => {
        try {
            let menu = await Menu.findById(id);
            if (menu) {
                let menuDelete = await Menu.remove({
                    _id: id
                }).exec();
                if (!menuDelete) {
                    return null;
                }
                return menuDelete;
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
            let menu = await Menu.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            if (!cms) {
                return null;
            }
            return cms;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

};

module.exports = menuRepository;