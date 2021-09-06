const mongoose = require('mongoose');
const ArtOfDecor = require('artofdecor/models/artofdecor.model');
const perPage = config.PAGINATION_PERPAGE;

const ArtOfDecorRepository = {

    getById: async(id) => {
        let result = await ArtOfDecor.findById(id).exec();
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
        let result = await ArtOfDecor.findOne(params).lean().exec();
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
        let result = await ArtOfDecor.find(params).exec();
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
            let result = await ArtOfDecor.findById(id);
            if (result) {
                let resultDelete = await ArtOfDecor.remove({ _id: id }).exec();
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
            let result = await ArtOfDecor.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

};

module.exports = ArtOfDecorRepository;