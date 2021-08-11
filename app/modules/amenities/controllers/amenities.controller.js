const amenitiesRepo = require('amenities/repositories/amenities.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
var fs = require('fs');


class amenitiesController {
    constructor() {
        this.amenities = [];

    }

    /* @Method: list
    // @Description: To get all the amenities from DB
    */
    async list(req, res) {
        try {
            res.render('amenities/views/list.ejs', {
                page_name: 'amenities-list',
                page_title: 'Amenities List',
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
            let amenities = await amenitiesRepo.getAll(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": amenities.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": amenities.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: amenities.data,
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
    // @Description:  amenities add page
    */
    async create(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('amenities/views/add.ejs', {
                page_name: 'amenities-management',
                page_title: 'Create Amenities',
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
    // @Description:  amenities store
    */
    async store(req, res) {
        try {
            let amenitiesData = await amenitiesRepo.getByField({
                'title': req.body.title
            });
            if (_.isEmpty(amenitiesData)) {
                let amenitiesInsert = amenitiesRepo.save(req.body);
                if (amenitiesInsert) {
                    req.flash('success', "Amenities Created Successfully");
                    res.redirect(namedRouter.urlFor('amenities.list'));
                }
            } else {
                req.flash('error', "Amenities already exist with same name");
                res.redirect(namedRouter.urlFor('amenities.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: edit
    // @Description:  amenities update page
    */
    async edit(req, res) {
        try {

            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            let amenities = await amenitiesRepo.getById(req.params.id);

            // This is for language section //
            var translateArr = [];
            for (var i = 0; i < amenities.translate.length; i++) {
                translateArr[amenities.translate[i].language] = amenities.translate[i]
            }
            
            amenities.translate = translateArr
            // This is for language section //

            if (!_.isEmpty(amenities)) {
                result.amenities_data = amenities;
                res.render('amenities/views/edit.ejs', {
                    page_name: 'amenities-list',
                    page_title: 'Update Amenities',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry amenities not found!");
                res.redirect(namedRouter.urlFor('amenities.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: amenities update action
    */
    async update(req, res) {

        try {
            const amenitiesId = req.body.id;
            let data = await amenitiesRepo.getById(amenitiesId);
            let amenitiesUpdate = amenitiesRepo.updateById(req.body, amenitiesId)
            if (amenitiesUpdate) {
                req.flash('success', "Amenities Updated Successfully");
                res.redirect(namedRouter.urlFor('amenities.list'));
            } else {
                res.redirect(namedRouter.urlFor('amenities.edit', {
                    id: req.body.amenitiesId
                }));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }


    };

    /*
    // @Method: status_change
    // @Description: amenities status change action
    */
    async statusChange(req, res) {
        try {
            let amenities = await amenitiesRepo.getById(req.params.id);
            if (!_.isEmpty(amenities)) {
                let amenitiesStatus = (amenities.status == 'Active') ? 'Inactive' : 'Active';
                let amenitiesUpdate = amenitiesRepo.updateById({
                    'status': amenitiesStatus
                }, req.params.id);
                req.flash('success', "amenities has changed successfully");
                res.redirect(namedRouter.urlFor('amenities.list'));
            } else {
                req.flash('error', "sorry amenities data not found");
                res.redirect(namedRouter.urlFor('amenities.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: delete
    // @Description: amenities delete
    */
    async destroy(req, res) {
        try {
            let amenitiesDelete = await amenitiesRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(amenitiesDelete)) {
                req.flash('success', 'Amenities Removed Successfully');
                res.redirect(namedRouter.urlFor('amenities.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new amenitiesController();