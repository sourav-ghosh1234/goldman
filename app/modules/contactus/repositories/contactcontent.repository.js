const mongoose = require('mongoose');
const ContactContent = require('contactus/models/contactcontent.model');
const perPage = config.PAGINATION_PERPAGE;

const cmsRepository = {

    getById: async(id) => {
        let cms = await ContactContent.findById(id).exec();
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
        let cms = await ContactContent.findOne(params).lean().exec();
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
        let user = await ContactContent.find(params).exec();
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
            let cmsCount = await ContactContent.countDocuments(params);
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
            let cms = await ContactContent.findById(id);
            if (cms) {
                let cmsDelete = await ContactContent.remove({ _id: id }).exec();
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
            let cms = await ContactContent.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
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