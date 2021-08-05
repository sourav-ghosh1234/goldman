const mongoose = require('mongoose');
const HomeContent = require('homecontent/models/homecontent.model');
const perPage = config.PAGINATION_PERPAGE;

const cmsRepository = {

    getById: async(id) => {
        let cms = await HomeContent.findById(id).exec();
        try {
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getByField: async(params) => {
        let cms = await HomeContent.findOne(params).lean().exec();
        try {
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async(params) => {
        let user = await HomeContent.find(params).exec();
        try {
            if (!user) {
                return null;
            }
            return user;

        } catch (e) {
            return e;
        }
    },

    getCmsCount: async(params) => {
        try {
            let cmsCount = await HomeContent.countDocuments(params);
            if (!cmsCount) {
                return null;
            }
            return cmsCount;
        } catch (e) {
            return e;
        }
    },

    delete: async(id) => {
        try {
            let cms = await HomeContent.findById(id);
            if (cms) {
                let cmsDelete = await HomeContent.remove({ _id: id }).exec();
                if (!cmsDelete) {
                    return null;
                }
                return cmsDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async(data, id) => {
        try {
            let cms = await HomeContent.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!cms) {
                return null;
            }
            return cms;
        } catch (e) {
            return e;
        }
    },

};

module.exports = cmsRepository;