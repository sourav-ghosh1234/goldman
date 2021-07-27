const menuRepo = require('menu/repositories/menu.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
var fs = require('fs');


class menuController {
    constructor() {
        this.menu = [];

    }

    /* @Method: list
    // @Description: To get all the menu from DB
    */
    async list(req, res) {
        try {
            res.render('menu/views/list.ejs', {
                page_name: 'menu-list',
                page_title: 'Menu List',
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
            let menu = await menuRepo.getAll(req);
            //console.log("CNTRL >>> ", menu)
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": menu.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": menu.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: menu.data,
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
    // @Method: edit
    // @Description:  menu update page
    */
    async edit(req, res) {
        try {

            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            let menu = await menuRepo.getById(req.params.id);

            // This is for language section //
            var translateArr = [];
            for (var i = 0; i < menu.translate.length; i++) {
                translateArr[menu.translate[i].language] = menu.translate[i]
            }
            
            menu.translate = translateArr
            // This is for language section //

            if (!_.isEmpty(menu)) {
                result.menu_data = menu;
                res.render('menu/views/edit.ejs', {
                    page_name: 'menu-list',
                    page_title: 'Update menu',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry menu not found!");
                res.redirect(namedRouter.urlFor('admin.menu.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: menu update action
    */
    async update(req, res) {

        try {
            const menuId = req.body.id;
            let data = await menuRepo.getById(menuId);
            let menuUpdate = menuRepo.updateById(req.body, menuId)
            if (menuUpdate) {
                req.flash('success', "menu Updated Successfully");
                res.redirect(namedRouter.urlFor('menu.list'));
            } else {
                res.redirect(namedRouter.urlFor('menu.edit', {
                    id: req.body.menuId
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
    // @Description: menu status change action
    */
    async statusChange(req, res) {
        try {
            let menu = await menuRepo.getById(req.body.id);
            if (!_.isEmpty(menu)) {
                let menuStatus = (menu.isActive == true) ? false : true;
                let menuUpdate = menuRepo.updateById({
                    'isActive': menuStatus
                }, req.body.id);
                req.flash('success', "menu status has changed successfully");
                res.send(menuUpdate);
            } else {
                req.flash('error', "sorry menu data not found");
                res.redirect(namedRouter.urlFor('menu.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: delete
    // @Description: menu delete
    */
    async destroy(req, res) {
        try {
            // console.log("menu CNTRL")
            let menuDelete = await menuRepo.delete(req.params.id)
            if (!_.isEmpty(menuDelete)) {
                req.flash('success', 'menu Removed Successfully');
                res.redirect(namedRouter.urlFor('menu.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new menuController();