const mongoose = require('mongoose');
const notificationRepo = require('notification/repositories/notification.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
var slugify = require('slugify')

class notificationController {
    constructor() {
        this.notification = [];
    }

    /* @Method: list
    // @Description: list all the notification from DB
    */
    async list(req, res) {
        try {
            res.render('notification/views/list.ejs', {
                page_name: 'notification-management',
                page_title: 'Notification List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAll
    // @Description: To get all the notification from DB
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

            if (!_.has(req.body, 'pagination')) {
                req.body.pagination.page = 1;
                eq.body.pagination.perpage = config.PAGINATION_PERPAGE
            }
            let notification = await notificationRepo.getAll(req);
            let meta = {
                "page": req.body.pagination.page,
                "pages": notification.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": notification.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200, meta: meta, data: notification.data, message: `Data fetched successfully.`
            };
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    }


    /* @Method: create
    // @Description: sport create view render
    */
    async create(req, res) {
        try {
            res.render('notification/views/add.ejs', {
                page_name: 'notification-management',
                page_title: 'Create Notification',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: insert
// @Description: save sport
*/
    async insert(req, res) {
        try {
            let notificationCheck = await notificationRepo.getByField({ 'title': req.body.title, isDeleted: false });
            if (_.isEmpty(notificationCheck)) {
                if (req.files.length) {
                    gm('./public/uploads/notification/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/notification/thumb/' + req.files[0].filename, function(err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename;
                }
                var slug = req.body.title.toLowerCase();
                req.body.slug = slug.split(' ').join('-');
                let save = await notificationRepo.save(req.body);
                if (save) {
                    req.flash('success', 'The notification has created successfully.');
                    res.redirect(namedRouter.urlFor('notification.list'));
                }
            } else {
                req.flash('error', "Notification already exist.");
                res.redirect(namedRouter.urlFor('notification.list'));
            }
        } catch (e) {
            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('notification.create'));
        }
    };


    /**
     * @Method: edit
     * @Description: To edit notification information
     */
    async edit(req, res) {
        try {
            let notificationData = await notificationRepo.getById(req.params.id);
            if (!_.isEmpty(notificationData)) {
                res.render('notification/views/edit.ejs', {
                    page_name: 'notification-management',
                    page_title: 'Edit Notification',
                    user: req.user,
                    response: notificationData,
                });
            } else {
                req.flash('error', "Sorry Notification not found!");
                res.redirect(namedRouter.urlFor('notification.list'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: update
    // @Description: notification Update
    */
    async update(req, res) {
        try {
            var chkTitle = { isDeleted: false, title: { $regex: req.body.title, $options: 'i' }, _id: { $ne: mongoose.Types.ObjectId(req.body.id) } };
            var slug = req.body.title.toLowerCase();
            req.body.slug = slug.split(' ').join('-');
            let checkTitle = await notificationRepo.getByField(chkTitle);
            if (!_.isEmpty(checkTitle)) {
                req.flash('error', "Notification already exist.");
                res.redirect(namedRouter.urlFor('notification.edit', { id: req.body.id }));
            }
            else {
                // var slug = slugify(req.body.title, {replacement: '-',lower: true,})
                // req.body.slug = slug;
                let notificationUpdate = await notificationRepo.updateById(req.body, req.body.id);
                if (notificationUpdate) {
                    req.flash('success', 'Notification updated successfully.');
                    res.redirect(namedRouter.urlFor('notification.list'));
                }
                else {
                    res.redirect(namedRouter.urlFor('notification.edit', { id: req.body.id }));
                }
            }
        }
        catch (e) {
            throw e;
        }
    };

    /*
    // @Method: statusChange
    // @Description: notification status change action
    */
    async statusChange(req, res) {
        try {
            let notification = await notificationRepo.getById(req.params.id);
            if (!_.isEmpty(notification)) {
                let notificationStatus = (notification.status == 'Active') ? 'Inactive' : 'Active';
                let notificationUpdate = await notificationRepo.updateById({ 'status': notificationStatus }, req.params.id);
                if (!_.isEmpty(notificationUpdate)) {
                    req.flash('success', "Notification status has changed successfully.");
                    res.redirect(namedRouter.urlFor('notification.list'));
                }
            } else {
                req.flash('error', "Sorry Notification not found");
                res.redirect(namedRouter.urlFor('notification.list'));
            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    };
}

module.exports = new notificationController();