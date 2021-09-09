const cmsRepo = require('cms/repositories/cms.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');



class cmsController {
    constructor() {
        this.cms = [];
    }

    /*
    // @Method: edit
    // @Description:  Coupon update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
			result.languages = languages;
            let cms = await cmsRepo.getById(req.params.id);
            var translateArr = [];
			for (var i = 0; i < cms.translate.length; i++) {
                translateArr[cms.translate[i].language] = cms.translate[i];
			}
			cms.translate = translateArr;
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('cms/views/edit.ejs', {
                    page_name: 'cms-management',
                    page_title: 'CMS Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry cms not found!");
                res.redirect(namedRouter.urlFor('cms.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: coupon update action
    */
    async update(req, res) {
        try {          
            const cmsId = req.body.id;
            let coupon = await cmsRepo.getByField({
                'title': req.body.title,
                _id: {
                    $ne: cmsId
                }
            });
            // req.body.slug = req.body.title.toLowerCase();
            var slug = req.body.title.toLowerCase();
            req.body.slug = slug.split(' ').join('-');
            if (_.isEmpty(coupon)) {
                let cmsIdUpdate = cmsRepo.updateById(req.body, cmsId)
                if (cmsIdUpdate) {
                    req.flash('success', "CMS Updated Successfully");
                    res.redirect(namedRouter.urlFor('cms.list'));
                }

            } else {
                req.flash('error', "CMS is already availabe!");
                res.redirect(namedRouter.urlFor('cms.edit', {
                    id: cmsId
                }));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }

    };



    /* @Method: list
    // @Description: To get all the users from DB
    */
    async list(req, res) {
        try {
            res.render('cms/views/list.ejs', {
                page_name: 'cms-management',
                page_title: 'CMS List',
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
            let cms = await cmsRepo.getAll(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": cms.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": cms.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: cms.data,
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
    // @Method: status_change
    // @Description: coupon status change action
    */
    // async statusChange(req, res) {
    //     try {
    //         let coupon = await couponRepo.getById(req.body.id);
    //         if (!_.isEmpty(coupon)) {
    //             let couponStatus = (coupon.isActive == true) ? false : true;
    //             let couponUpdate = couponRepo.updateById({
    //                 'isActive': couponStatus
    //             }, req.body.id);
    //             req.flash('success', "Coupon status has changed successfully");
    //             res.send(couponUpdate);
    //         } else {
    //             req.flash('error', "sorry coupon not found");
    //             res.redirect(namedRouter.urlFor('coupon.list'));
    //         }
    //     } catch (e) {
    //         return res.status(500).send({
    //             message: e.message
    //         });
    //     }
    // };

    /* @Method: delete
    // @Description: coupon delete
    */
    // async destroy(req, res) {
    //     try {
    //        
    //         let cmsDelete = await cmsRepo.delete(req.params.id)
    //         if (!_.isEmpty(cmsDelete)) {
    //             req.flash('success', 'Cms Removed Successfully');
    //             res.redirect(namedRouter.urlFor('cms.list'));
    //         }
    //     } catch (e) {
    //         return res.status(500).send({
    //             message: e.message
    //         });
    //     }
    // };

}

module.exports = new cmsController();