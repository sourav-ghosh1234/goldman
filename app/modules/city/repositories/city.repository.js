const City = require('city/models/city.model');
const perPage = config.PAGINATION_PERPAGE;

class CityRepository {
    constructor() { }

    async getAll(req) {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({ 'city': { $regex: req.body.query.generalSearch, $options: 'i' } });
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

            var aggregate = City.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'countries',
                        localField: 'countryId',
                        foreignField: '_id',
                        as: 'countryDetails'
                    }
                },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allCity = await City.aggregatePaginate(aggregate, options);
            return allCity;
        } catch (e) {
            throw (e);
        }
    }

    async getAllCity(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await City.find(_params)
                .populate('countryId')
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            return await City.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await City.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await City.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await City.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getCityCount() {
        try {
            return await City.count({ "isDeleted": false, "status": "Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new City(data);
            return await _save.save();
        } catch (error) {
            return error;
        }
    }

    async getActiveCountry(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await City.find(_params).sort({ "country_name": 1 }).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await City.findById(id).lean().exec();
            return await City.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    }
}

module.exports = new CityRepository();