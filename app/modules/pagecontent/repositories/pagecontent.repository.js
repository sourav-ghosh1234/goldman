const PageContent = require('pagecontent/models/pagecontent.model');
const perPage = config.PAGINATION_PERPAGE;

class PageContentRepository {
    constructor() {}

    async getAll(req) {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({ 'title': { $regex: req.body.query.generalSearch, $options: 'i' } });
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

            var aggregate = PageContent.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allPageContent = await PageContent.aggregatePaginate(aggregate, options);
            return allPageContent;
        } catch (e) {
            throw (e);
        }
    }

    async getById(id) {
        try {
            return await PageContent.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await PageContent.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await PageContent.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await PageContent.findByIdAndUpdate(id, data, {
                    new: true,
                    upsert: true
                })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getDocumentCount() {
        try {
            return await PageContent.count({ "isDeleted": false, "status": "Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new PageContent(data);
            return await _save.save();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await PageContent.findById(id).lean().exec();
            return await PageContent.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    }
}

module.exports = new PageContentRepository();