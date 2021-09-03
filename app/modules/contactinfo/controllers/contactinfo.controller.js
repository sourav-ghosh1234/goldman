const contactinfoRepo = require('contactinfo/repositories/contactinfo.repository');
const slug = require('slug');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const errorHandler = require('../../../errorHandler');

var gm = require('gm').subClass({
    imageMagick: true
});


class ContactinfoController {
    /*
    // @Method: edit
    // @Description:  render contactinfo edit page
    */
    async edit(req, res) {
        try {
            let result = {};
            let contactinfoValue = await contactinfoRepo.getById(req.params.id);
            if (!_.isEmpty(contactinfoValue)) {
                result.contactinfo_data = contactinfoValue;
                res.render('contactinfo/views/edit.ejs', {
                    page_name: 'contactinfo-management',
                    page_title: 'Update Contact Info',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry contactinfo not found!");
                res.redirect(namedRouter.urlFor('contactinfo.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* 
    // @Method: update
    // @Description: Contactinfo update action
    */
    async update(req, res) {
        try {
            const contactinfoId = req.body.mid;
            let contactinfoUpdate = await contactinfoRepo.updateById(req.body, contactinfoId);
            if (contactinfoUpdate) {
                req.flash('success', "Contact info updated successfully");
                res.redirect(namedRouter.urlFor('contactinfo.listing'));
            } else {
                res.redirect(namedRouter.urlFor('contactinfo.edit', {
                    id: contactinfoId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('contactinfo.edit', {
                id: req.body.mid
            }));
        }

    };


    /* 
    // @Method: list
    // @Description: To get all the contactinfo from DB
    */
    async list(req, res) {
        try {
            res.render('contactinfo/views/list.ejs', {
                page_name: 'contactinfo-management',
                page_title: 'Contact Info List',
                user: req.user,
                // contactinfo: req.session.contactinfo,
                // postdata: searchStr,
                // response: success
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the contactinfo from DB
    */
    async getAllData(req, res) {
        try {
            let contactinfoValue = await contactinfoRepo.getAll(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": contactinfoValue.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": contactinfoValue.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: contactinfoValue.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    };


    /*
 // @Method: status_change
 // @Description: contactus status change action
 */
    async changeStatus(req, res) {
        try {
            let contactus = await contactinfoRepo.getById(req.params.id);
            if (!_.isEmpty(contactus)) {
                let contactusStatus = (contactus.status == "Active") ? "Inactive" : "Active";
                let contactusUpdate = await contactinfoRepo.updateById({ "status": contactusStatus }, req.params.id);
                req.flash('success', "Contact status has changed successfully");
                res.redirect(namedRouter.urlFor('contactinfo.listing'));
            } else {
                req.flash('error', "Sorry Contact not found");
                res.redirect(namedRouter.urlFor('contactinfo.listing'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
// @Description: contactus delete
*/
    async destroy(req, res) {
        try {
            //let contactusDelete = await contactusRepo.delete(req.params.id)
            let contactusDelete = await contactinfoRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(contactusDelete)) {
                req.flash('success', 'Contact removed successfully');
                res.redirect(namedRouter.urlFor('contactinfo.listing'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }



}

module.exports = new ContactinfoController();