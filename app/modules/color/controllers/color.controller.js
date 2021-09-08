const colorRepo = require('color/repositories/color.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const mongoose = require('mongoose');
var fs = require('fs');


class colorController {
    constructor() {
        this.color = [];

    }

    /* @Method: list
    // @Description: To get all the color from DB
    */
    async list(req, res) {
        try {
            res.render('color/views/list.ejs', {
                page_name: 'color-management',
                page_title: 'Color List',
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
            let color = await colorRepo.getAll(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": color.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": color.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: color.data,
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
    // @Description:  color add page
    */
    async create(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('color/views/add.ejs', {
                page_name: 'color-management',
                page_title: 'Create Color',
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
    // @Description:  color store
    */
    async store(req, res) {
        try {
            let colorData = await colorRepo.getByField({
                'title': req.body.title
            });
            if (_.isEmpty(colorData)) {
                let colorInsert = colorRepo.save(req.body);
                if (colorInsert) {
                    req.flash('success', "color Created Successfully");
                    res.redirect(namedRouter.urlFor('color.list'));
                }
            } else {
                req.flash('error', "color already exist with same name");
                res.redirect(namedRouter.urlFor('color.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: edit
    // @Description:  color update page
    */
    async edit(req, res) {
        try {

            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            let color = await colorRepo.getById(req.params.id);

            // This is for language section //
            var translateArr = [];
            for (var i = 0; i < color.translate.length; i++) {
                translateArr[color.translate[i].language] = color.translate[i]
            }
            
            color.translate = translateArr
            // This is for language section //

            if (!_.isEmpty(color)) {
                result.color_data = color;
                res.render('color/views/edit.ejs', {
                    page_name: 'color-list',
                    page_title: 'Update Color',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry color not found!");
                res.redirect(namedRouter.urlFor('color.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: color update action
    */
    async update(req, res) {
        try {
            const colorId = req.body.id;
            let data = await colorRepo.getById(colorId);
            var chkTitle = {
                isDeleted: false,
                title: req.body.title,
                _id: { $ne: mongoose.Types.ObjectId(colorId) }
            };

            let isExist = await colorRepo.getByField(chkTitle);
            if (!_.isEmpty(isExist)) {
                req.flash('error', "color already exist.");
                res.redirect(namedRouter.urlFor('color.edit', {
                    id: req.body.colorId
                }));
            } else {
                let colorUpdate = colorRepo.updateById(req.body, colorId)
                if (colorUpdate) {
                    req.flash('success', "color Updated Successfully");
                    res.redirect(namedRouter.urlFor('color.list'));
                } else {
                    res.redirect(namedRouter.urlFor('color.edit', {
                        id: req.body.colorId
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
    // @Description: color status change action
    */
    async statusChange(req, res) {
        try {
            let color = await colorRepo.getById(req.params.id);
            if (!_.isEmpty(color)) {
                let colorStatus = (color.status == 'Active') ? 'Inactive' : 'Active';
                let colorUpdate = colorRepo.updateById({
                    'status': colorStatus
                }, req.params.id);
                req.flash('success', "color has changed successfully");
                res.redirect(namedRouter.urlFor('color.list'));
            } else {
                req.flash('error', "sorry color data not found");
                res.redirect(namedRouter.urlFor('color.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: delete
    // @Description: color delete
    */
    async destroy(req, res) {
        try {
            let colorDelete = await colorRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(colorDelete)) {
                req.flash('success', 'color Removed Successfully');
                res.redirect(namedRouter.urlFor('color.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new colorController();