const mongoose = require('mongoose');
const languageRepo = require('language/repositories/language.repository');
const propertytypeRepo = require('propertytype/repositories/propertytype.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});



class PropertyTypeController {
    constructor() {
        this.propertytype = [];

    }

    /* @Method: list
    // @Description: To get all the propertytype from DB
    */
    async list(req, res) {
        try {
            res.render('propertytype/views/list.ejs', {
                page_name: 'propertytype-management',
                page_title: 'Property Type List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAll
    // @Description: To get all the propertytype from DB
    */
    async getAll(req, res) {
            try {

                if (_.has(req.body, 'sort')) {
                    var sortOrder = req.body.sort.sort;
                    var sortField = req.body.sort.field;
                } else {
                    var sortOrder = -1;
                    var sortField = '_id';
                }

                let propertytypeData = await propertytypeRepo.getAll(req);
                let meta = {
                    "page": req.body.pagination.page,
                    "pages": propertytypeData.pageCount,
                    "perpage": req.body.pagination.perpage,
                    "total": propertytypeData.totalCount,
                    "sort": sortOrder,
                    "field": sortField
                };
                return {
                    status: 200,
                    meta: meta,
                    data: propertytypeData.data,
                    message: `Data fetched successfully.`
                };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
        }

    /* @Method: create
    // @Description: propertytype create view render
    */
    async create(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            res.render('propertytype/views/add.ejs', {
                page_name: 'propertytype-management',
                page_title: 'Create Property Type',
                user: req.user,
                response: result
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: insert
    // @Description: save propertytype
    */
    async insert(req, res) {
        try {
            let propertytypeCheck = await propertytypeRepo.getByField({ 'title': req.body.title, isDeleted: false });
            if (_.isEmpty(propertytypeCheck)) {
                let save = await propertytypeRepo.save(req.body);
                if (save) {
                    req.flash('success', 'The propertytype has created successfully.');
                    res.redirect(namedRouter.urlFor('propertytype.list'));
                }
            } else {
                req.flash('error', "Property Type already exist.");
                res.redirect(namedRouter.urlFor('propertytype.list'));
            }
        } catch (e) {
            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('propertytype.create'));
        }
    };

    /**
     * @Method: edit
     * @Description: To edit propertytype information
     */
    async edit(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            let propertytypeData = await propertytypeRepo.getById(req.params.id);
             // This is for language section //
             var translateArr = [];
             for (var i = 0; i < propertytypeData.translate.length; i++) {
                 translateArr[propertytypeData.translate[i].language] = propertytypeData.translate[i]
             }
             
             propertytypeData.translate = translateArr

            if (!_.isEmpty(propertytypeData)) {
                result.propertytype_data = propertytypeData;
                res.render('propertytype/views/edit.ejs', {
                    page_name: 'propertytype-management',
                    page_title: 'Edit Property Type',
                    user: req.user,
                    response: result,
                });
            } else {
                req.flash('error', "Sorry propertytype not found!");
                res.redirect(namedRouter.urlFor('propertytype.list'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: update
    // @Description: propertytype Update
    */
    async update(req, res) {
        try {
            let propertytypeData = await propertytypeRepo.getById(req.body.id);
            var chkTitle = {
                isDeleted: false,
                title: req.body.title,
                _id: { $ne: mongoose.Types.ObjectId(req.body.id) }
            };

            let isExist = await propertytypeRepo.getByField(chkTitle);
            if (!_.isEmpty(isExist)) {
                req.flash('error', "Property Type already exist.");
                res.redirect(namedRouter.urlFor('propertytype.edit', { id: req.body.id }));
            } else {
                let propertytypeUpdate = await propertytypeRepo.updateById(req.body, req.body.id);
                if (propertytypeUpdate) {
                    req.flash('success', 'Property Type updated successfully.');
                    res.redirect(namedRouter.urlFor('propertytype.list'));
                } else {
                    res.redirect(namedRouter.urlFor('propertytype.edit', { id: req.body.id }));
                }
            }

        } catch (e) {
            throw e;
        }
    };

    /* @Method: delete
    // @Description: propertytype Delete
    */
    async delete(req, res) {
        try {
            let propertytypeData = await propertytypeRepo.getById(req.params.id);
            if (!_.isEmpty(propertytypeData)) {
                let propertytypeDelete = await propertytypeRepo.updateById({ "isDeleted": true }, propertytypeData._id)
                if (!_.isEmpty(propertytypeDelete)) {
                    req.flash('success', 'Property Type Removed Successfully');
                    res.redirect(namedRouter.urlFor('propertytype.list'));
                }
            } else {
                req.flash('error', "Sorry propertytype not found");
                res.redirect(namedRouter.urlFor('propertytype.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };



    /*
    // @Method: statusChange
    // @Description: propertytype status change action
    */
    async statusChange(req, res) {
        try {
            let propertytypeData = await propertytypeRepo.getById(req.params.id);
            if (!_.isEmpty(propertytypeData)) {
                let propertytypeStatus = (propertytypeData.status == 'Active') ? 'Inactive' : 'Active';
                let propertytypeUpdate = await propertytypeRepo.updateById({
                    'status': propertytypeStatus
                }, req.params.id);
                if (!_.isEmpty(propertytypeUpdate)) {
                    req.flash('success', "Property Type status has changed successfully.");
                    res.redirect(namedRouter.urlFor('propertytype.list'));
                }
            } else {
                req.flash('error', "Sorry propertytype not found");
                res.redirect(namedRouter.urlFor('propertytype.list'));

            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    };
}

module.exports = new PropertyTypeController();