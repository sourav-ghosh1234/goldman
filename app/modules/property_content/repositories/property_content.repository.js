const PropertyContent = require('property_content/models/property_content.model');
const perPage = config.PAGINATION_PERPAGE;
const mongoose = require('mongoose');

class PropertyContentRepository {
    constructor() {}

    async getAllArt(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await PropertyContent.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }
   
    async getById(id) {
        try {
            return await PropertyContent.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await PropertyContent.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await PropertyContent.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await PropertyContent.findByIdAndUpdate(id, data, {
                    new: true,
                    upsert: true
                })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getArtCount() {
        try {
            return await PropertyContent.count({"isDeleted": false,"status":"Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new PropertyContent(data);
            return await _save.save();
        } catch (error) {
            return error;
        }
    }

    async getActiveArt(params) {
        try {
            const _params = {...params,
                "isDeleted": false,
            };
            return await PropertyContent.find(_params).sort({"title":1}).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await PropertyContent.findById(id).lean().exec();
            return await PropertyContent.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    }
}

module.exports = new PropertyContentRepository();