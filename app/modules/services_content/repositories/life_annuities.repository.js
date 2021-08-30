const mongoose = require('mongoose');
const LifeAnnuities = require('services_content/models/life_annuities.model');
const perPage = config.PAGINATION_PERPAGE;

const LifeAnnuitiesRepository = {

    getById: async(id) => {
        let result = await LifeAnnuities.findById(id).exec();
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
        let result = await LifeAnnuities.findOne(params).lean().exec();
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
        let result = await LifeAnnuities.find(params).exec();
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
            let result = await LifeAnnuities.findById(id);
            if (result) {
                let resultDelete = await LifeAnnuities.remove({ _id: id }).exec();
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
            let result = await LifeAnnuities.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            return e;
        }
    },

};

module.exports = LifeAnnuitiesRepository;