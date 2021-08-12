const characteristicsRepo = require('characteristics/repositories/characteristics.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const mongoose = require('mongoose');
var fs = require('fs');


class characteristicsController {
    constructor() {
        this.characteristics = [];

    }

    /* @Method: list
    // @Description: To get all the characteristics from DB
    */
    async list(req, res) {
        try {
            res.render('characteristics/views/list.ejs', {
                page_name: 'characteristics-management',
                page_title: 'Characteristics List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    async getAll(req, res) {
        try {
            let characteristics = await characteristicsRepo.getAll(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": characteristics.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": characteristics.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: characteristics.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            return {
                status: 500,
                data: [],
                message: e.message
            };
        }
    }

    /*
    // @Method: create
    // @Description:  characteristics add page
    */
    async create(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('characteristics/views/add.ejs', {
                page_name: 'characteristics-management',
                page_title: 'Create Characteristics',
                user: req.user,
                response: result
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: store
    // @Description:  characteristics store
    */
    async store(req, res) {
        try {
            let characteristicsData = await characteristicsRepo.getByField({
                'title': req.body.title
            });
            if (_.isEmpty(characteristicsData)) {
                let characteristicsInsert = characteristicsRepo.save(req.body);
                if (characteristicsInsert) {
                    req.flash('success', "Characteristics Created Successfully");
                    res.redirect(namedRouter.urlFor('characteristics.list'));
                }
            } else {
                req.flash('error', "Characteristics already exist with same name");
                res.redirect(namedRouter.urlFor('characteristics.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: edit
    // @Description:  characteristics update page
    */
    async edit(req, res) {
        try {

            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            let characteristics = await characteristicsRepo.getById(req.params.id);

            // This is for language section //
            var translateArr = [];
            for (var i = 0; i < characteristics.translate.length; i++) {
                translateArr[characteristics.translate[i].language] = characteristics.translate[i]
            }
            
            characteristics.translate = translateArr
            // This is for language section //

            if (!_.isEmpty(characteristics)) {
                result.characteristics_data = characteristics;
                res.render('characteristics/views/edit.ejs', {
                    page_name: 'characteristics-list',
                    page_title: 'Update Characteristics',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry characteristics not found!");
                res.redirect(namedRouter.urlFor('characteristics.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: characteristics update action
    */
    async update(req, res) {
        try {
            const characteristicsId = req.body.id;
            let data = await characteristicsRepo.getById(characteristicsId);
            var chkTitle = {
                isDeleted: false,
                title: req.body.title,
                _id: { $ne: mongoose.Types.ObjectId(characteristicsId) }
            };

            let isExist = await characteristicsRepo.getByField(chkTitle);
            if (!_.isEmpty(isExist)) {
                req.flash('error', "Characteristics already exist.");
                res.redirect(namedRouter.urlFor('characteristics.edit', {
                    id: req.body.characteristicsId
                }));
            } else {
                let characteristicsUpdate = characteristicsRepo.updateById(req.body, characteristicsId)
                if (characteristicsUpdate) {
                    req.flash('success', "Characteristics Updated Successfully");
                    res.redirect(namedRouter.urlFor('characteristics.list'));
                } else {
                    res.redirect(namedRouter.urlFor('characteristics.edit', {
                        id: req.body.characteristicsId
                    }));
                }
          } 
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }


    };

    /*
    // @Method: status_change
    // @Description: characteristics status change action
    */
    async statusChange(req, res) {
        try {
            let characteristics = await characteristicsRepo.getById(req.params.id);
            if (!_.isEmpty(characteristics)) {
                let characteristicsStatus = (characteristics.status == 'Active') ? 'Inactive' : 'Active';
                let characteristicsUpdate = characteristicsRepo.updateById({
                    'status': characteristicsStatus
                }, req.params.id);
                req.flash('success', "Characteristics has changed successfully");
                res.redirect(namedRouter.urlFor('characteristics.list'));
            } else {
                req.flash('error', "sorry characteristics data not found");
                res.redirect(namedRouter.urlFor('characteristics.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: delete
    // @Description: characteristics delete
    */
    async destroy(req, res) {
        try {
            let characteristicsDelete = await characteristicsRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(characteristicsDelete)) {
                req.flash('success', 'Characteristics Removed Successfully');
                res.redirect(namedRouter.urlFor('characteristics.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new characteristicsController();