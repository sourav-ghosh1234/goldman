const Role = require('role/models/role.model');
const perPage = config.PAGINATION_PERPAGE;

class RoleRepository {
    constructor() {}

    async getAll(searchQuery, page) {
        try {
            // const match = [{ role: { $in: ['admin', 'user', 'community_manager', 'payments_support'] } }];
            let match = [{ rolegroup: { $in: ['backend', 'frontend'] } }];
            if (_.has(searchQuery, "keyword")) {
                if (searchQuery.keyword != '') {
                    const search_string = searchQuery.keyword.trim();
                    match.push({
                        "$or": [{ 'roleDisplayName': { '$regex': search_string, '$options': 'i' } },
                            { 'desc': { '$regex': search_string, '$options': 'i' } }
                        ]
                    });
                }
            }
            let role = await Role.paginate({ "$and": match }, { page: page, limit: perPage, sort: { _id: -1 } });;
            return role;
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            return await Role.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            return await Role.findOne(params).exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            return await Role.find(params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await Role.findById(id).lean().exec();
            return await Role.deleteOne({ _id: id }).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await Role.findByIdAndUpdate(id, data, { new: true, upsert: true })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            return await Role.create(data);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new RoleRepository();