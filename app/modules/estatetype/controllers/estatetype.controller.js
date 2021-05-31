const mongoose = require('mongoose');
const estatetypeRepo = require('estatetype/repositories/estatetype.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});



class EstateTypeController {
    constructor() {
        this.estatetype = [];

    }

    /* @Method: create
    // @Description: estatetype create view render
    */
    async create(req, res) {
        try {
            res.render('estatetype/views/add.ejs', {
                page_name: 'estatetype-management',
                page_title: 'Create Estate Type',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: insert
// @Description: save estatetype
*/
    async insert(req, res) {
        try {
            let estatetypeCheck = await estatetypeRepo.getByField({ 'title': req.body.title, isDeleted: false });
            if (_.isEmpty(estatetypeCheck)) {
                if (req.files.length) {
                    gm('./public/uploads/estatetype/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/estatetype/thumb/' + req.files[0].filename, function(err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename;
                }
                let save = await estatetypeRepo.save(req.body);
                if (save) {
                    req.flash('success', 'The estatetype has created successfully.');
                    res.redirect(namedRouter.urlFor('estatetype.list'));
                }
            } else {
                req.flash('error', "Estate Type already exist.");
                res.redirect(namedRouter.urlFor('estatetype.list'));
            }
        } catch (e) {
            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('estatetype.create'));
        }
    };

    /* @Method: list
    // @Description: To get all the estatetype from DB
    */
    async list(req, res) {
        try {
            res.render('estatetype/views/list.ejs', {
                page_name: 'estatetype-management',
                page_title: 'Estate Type List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAll
    // @Description: To get all the estatetype from DB
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

                let estatetypeData = await estatetypeRepo.getAll(req);
                let meta = {
                    "page": req.body.pagination.page,
                    "pages": estatetypeData.pageCount,
                    "perpage": req.body.pagination.perpage,
                    "total": estatetypeData.totalCount,
                    "sort": sortOrder,
                    "field": sortField
                };
                return {
                    status: 200,
                    meta: meta,
                    data: estatetypeData.data,
                    message: `Data fetched successfully.`
                };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
        }
        /**
         * @Method: edit
         * @Description: To edit estatetype information
         */
    async edit(req, res) {
        try {
            let result = {};
            let estatetypeData = await estatetypeRepo.getById(req.params.id);
            if (!_.isEmpty(estatetypeData)) {
                result.estatetype_data = estatetypeData;
                res.render('estatetype/views/edit.ejs', {
                    page_name: 'estatetype-management',
                    page_title: 'Edit Estate Type',
                    user: req.user,
                    response: result,
                });
            } else {
                req.flash('error', "Sorry estatetype not found!");
                res.redirect(namedRouter.urlFor('estatetype.list'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: update
    // @Description: estatetype Update
    */
    async update(req, res) {
        try {
            let estatetypeData = await estatetypeRepo.getById(req.body.id);
            var chkTitle = {
                isDeleted: false,
                title: req.body.title,
                _id: { $ne: mongoose.Types.ObjectId(req.body.id) }
            };

            let isExist = await estatetypeRepo.getByField(chkTitle);
            if (!_.isEmpty(isExist)) {
                req.flash('error', "Estate Type already exist.");
                res.redirect(namedRouter.urlFor('estatetype.edit', { id: req.body.id }));
            } else {
                if (req.files.length > 0) {
                    if (fs.existsSync('./public/uploads/estatetype/' + estatetypeData.image) && estatetypeData.image != '') {
                        fs.unlinkSync('./public/uploads/estatetype/' + estatetypeData.image);
                    }
                    if (fs.existsSync('./public/uploads/estatetype/thumb/' + estatetypeData.image) && estatetypeData.image != '') {
                        fs.unlinkSync('./public/uploads/estatetype/thumb/' + estatetypeData.image);
                    }
                    gm('./public/uploads/estatetype/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/estatetype/thumb/' + req.files[0].filename, function(err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename;
                }
                let estatetypeUpdate = await estatetypeRepo.updateById(req.body, req.body.id);
                if (estatetypeUpdate) {
                    req.flash('success', 'Estate Type updated successfully.');
                    res.redirect(namedRouter.urlFor('estatetype.list'));
                } else {
                    res.redirect(namedRouter.urlFor('estatetype.edit', { id: req.body.id }));
                }
            }

        } catch (e) {
            throw e;
        }
    };

    /* @Method: delete
    // @Description: estatetype Delete
    */
    async delete(req, res) {
        try {
            let estatetypeData = await estatetypeRepo.getById(req.params.id);
            if (!_.isEmpty(estatetypeData)) {
                let estatetypeDelete = await estatetypeRepo.updateById({ "isDeleted": true }, estatetypeData._id)
                if (!_.isEmpty(estatetypeDelete)) {
                    req.flash('success', 'Estate Type Removed Successfully');
                    res.redirect(namedRouter.urlFor('estatetype.list'));
                }
            } else {
                req.flash('error', "Sorry estatetype not found");
                res.redirect(namedRouter.urlFor('estatetype.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };



    /*
    // @Method: statusChange
    // @Description: estatetype status change action
    */
    async statusChange(req, res) {
        try {
            let estatetypeData = await estatetypeRepo.getById(req.params.id);
            if (!_.isEmpty(estatetypeData)) {
                let estatetypeStatus = (estatetypeData.status == 'Active') ? 'Inactive' : 'Active';
                let estatetypeUpdate = await estatetypeRepo.updateById({
                    'status': estatetypeStatus
                }, req.params.id);
                if (!_.isEmpty(estatetypeUpdate)) {
                    req.flash('success', "Estate Type status has changed successfully.");
                    res.redirect(namedRouter.urlFor('estatetype.list'));
                }
            } else {
                req.flash('error', "Sorry estatetype not found");
                res.redirect(namedRouter.urlFor('estatetype.list'));

            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    };
}

module.exports = new EstateTypeController();