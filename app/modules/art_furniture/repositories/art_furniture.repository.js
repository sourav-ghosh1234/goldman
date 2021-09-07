const mongoose = require('mongoose');
const art_Furniture = require('art_furniture/models/art_furniture.model');
const perPage = config.PAGINATION_PERPAGE;

const art_FurnitureRepository = {

    getById: async(id) => {
        let result = await art_Furniture.findById(id).exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getByField: async(params) => {
        let result = await art_Furniture.findOne(params).lean().exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        let result = await art_Furniture.find(params).exec();
        try {
            if (!result) {
                return null;
            }
            return result;

        } catch (e) {
            return e;
        }
    },

    delete: async(id) => {
        try {
            let result = await art_Furniture.findById(id);
            if (result) {
                let resultDelete = await art_Furniture.remove({ _id: id }).exec();
                if (!resultDelete) {
                    return null;
                }
                return resultDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async(data, id) => {
        try {
            let result = await art_Furniture.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

};

module.exports = art_FurnitureRepository;