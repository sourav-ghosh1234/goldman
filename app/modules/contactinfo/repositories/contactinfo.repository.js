const Contactinfo = require('contactinfo/models/contactinfo.model');
const perPage = config.PAGINATION_PERPAGE;


const ContactinfoRepository = {
    getAll: async (req) => {
        
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [{
                        'contactinfo_value': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    }, ]
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

            var aggregate = Contactinfo.aggregate([{
                    $match: conditions
                },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allContactinfo = await Contactinfo.aggregatePaginate(aggregate, options);
            return allContactinfo;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let contactinfos = await Contactinfo.findById(id).exec();
            return contactinfos;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let contactinfos = await Contactinfo.findOne(params).lean().exec();
            return contactinfos;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let contactinfos = await Contactinfo.find(params).exec();
            return contactinfos;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let contactinfos = await Contactinfo.findById(id);
            if (contactinfos) {
                let contactinfoDelete = await Contactinfo.remove({
                    _id: id
                }).exec();
                return contactinfoDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async (data, id) => {
        try {
            let contactinfo = await Contactinfo.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return contactinfo;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    getAllContactinfo: async () => {
        try {
            return await Contactinfo.find().exec();
        } catch (error) {
            return error;
        }
    },

    save: async (data) => {
        try {
            let contactinfo = await Contactinfo.create(data);
            if (!contactinfo) {
                return null;
            }
            return contactinfo;
        } catch (e) {
            throw e;
        }
    },

};

module.exports = ContactinfoRepository;