const mongoose = require('mongoose');
const PropertiesPrivate = require('services_content/models/properties_private.model');
const perPage = config.PAGINATION_PERPAGE;

const PropertiesPrivateRepository = {

    getById: async(id) => {
        let result = await PropertiesPrivate.findById(id).exec();
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
        let result = await PropertiesPrivate.findOne(params).lean().exec();
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
        let result = await PropertiesPrivate.find(params).exec();
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
            let result = await PropertiesPrivate.findById(id);
            if (result) {
                let resultDelete = await PropertiesPrivate.remove({ _id: id }).exec();
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
            let result = await PropertiesPrivate.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

};

module.exports = PropertiesPrivateRepository;