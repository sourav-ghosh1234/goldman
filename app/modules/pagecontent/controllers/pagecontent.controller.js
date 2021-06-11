const pagecontentRepo = require('pagecontent/repositories/pagecontent.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});

class pageContentController {
    constructor() {
        this.pagecontent = [];
    }

    async create(req, res) {
        try {
            res.render('pagecontent/views/create.ejs', {
                page_name: 'pagecontent-management',
                page_title: 'Create Page Content',
                user: req.user,
            });
        } catch (e) {
            throw ({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            let pagecontent = await pagecontentRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' }, 'isDeleted': false });

            if (_.isEmpty(pagecontent)) {
                if (req.files.length > 0) {
                    req.body.image = req.files[0].filename;
                }
                let pagecontentSave = await pagecontentRepo.save(req.body);
                if (pagecontentSave) {
                    req.flash('success', "Page Content created successfully.");
                    res.redirect(namedRouter.urlFor('pagecontent.list'));
                }
            } else {
                req.flash('error', "This Page Content already exist!");
                res.redirect(namedRouter.urlFor('pagecontent.list'));
            }
        } catch (e) {
            console.log(e)
            throw ({ message: e.message });
        }
    }


    /*
    // @Method: edit
    // @Description:  pagecontent update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let pagecontent = await pagecontentRepo.getById(req.params.id);
            if (!_.isEmpty(pagecontent)) {
                result.pagecontent_data = pagecontent;
                res.render('pagecontent/views/edit.ejs', {
                    page_name: 'pagecontent-management',
                    page_title: 'Edit Page Content',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Page Content not found!");
                res.redirect(namedRouter.urlFor('pagecontent.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: pagecontent update action
    */
    async update(req, res) {
        try {
            const pagecontentId = req.body.pagecontent_id;
            let pagecontent = await pagecontentRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' }, _id: { $ne: pagecontentId } });
            if (_.isEmpty(pagecontent)) {
                let pagecontentData = await pagecontentRepo.getById(pagecontentId);
                if (req.files.length > 0) {
                    if (fs.existsSync('./public/uploads/pagecontent/' + pagecontentData.image) && pagecontentData.image != '') {
                        fs.unlinkSync('./public/uploads/pagecontent/' + pagecontentData.image);
                    }
                    req.body.image = req.files[0].filename;
                }
                let pagecontentUpdate = await pagecontentRepo.updateById(req.body, pagecontentId);
                if (pagecontentUpdate) {
                    req.flash('success', "Page Content updated successfully");
                    res.redirect(namedRouter.urlFor('pagecontent.list'));
                }

            } else {
                req.flash('error', "Page Content is already available!");
                res.redirect(namedRouter.urlFor('pagecontent.edit', { id: pagecontentId }));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };



    /* @Method: list
    // @Description: To get all the pagecontents from DB
    */
    async list(req, res) {
        try {
            res.render('pagecontent/views/list.ejs', {
                page_name: 'pagecontent-management',
                page_title: 'Page Content List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async getAll(req, res) {
            try {
                let pagecontent = await pagecontentRepo.getAll(req);

                if (_.has(req.body, 'sort')) {
                    var sortOrder = req.body.sort.sort;
                    var sortField = req.body.sort.field;
                } else {
                    var sortOrder = -1;
                    var sortField = '_id';
                }
                let meta = { "page": req.body.pagination.page, "pages": pagecontent.pageCount, "perpage": req.body.pagination.perpage, "total": pagecontent.totalCount, "sort": sortOrder, "field": sortField };
                return { status: 200, meta: meta, data: pagecontent.data, message: `Data fetched succesfully.` };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
        }
        /*
        // @Method: status_change
        // @Description: pagecontent status change action
        */
    async changeStatus(req, res) {
        try {
            let pagecontent = await pagecontentRepo.getById(req.params.id);
            if (!_.isEmpty(pagecontent)) {
                let pagecontentStatus = (pagecontent.status == "Active") ? "Inactive" : "Active";
                let pagecontentUpdate = await pagecontentRepo.updateById({ "status": pagecontentStatus }, req.params.id);
                req.flash('success', "Page Content status has changed successfully");
                res.redirect(namedRouter.urlFor('pagecontent.list'));
            } else {
                req.flash('error', "Sorry Page Content not found");
                res.redirect(namedRouter.urlFor('pagecontent.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: delete
    // @Description: pagecontent delete
    */
    async destroy(req, res) {
        try {
            let pagecontentDelete = await pagecontentRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(pagecontentDelete)) {
                if (pagecontentDelete.image !== '') {
                    if (fs.existsSync('./public/uploads/pagecontent/' + pagecontentDelete.image) && pagecontentDelete.image != '') {
                        fs.unlinkSync('./public/uploads/pagecontent/' + pagecontentDelete.image);
                    }
                    if (fs.existsSync('./public/uploads/pagecontent/thumb/' + pagecontentDelete.image) && pagecontentDelete.image != '') {
                        fs.unlinkSync('./public/uploads/pagecontent/thumb/' + pagecontentDelete.image);
                    }
                }
                req.flash('success', 'Page Content removed successfully');
                res.redirect(namedRouter.urlFor('pagecontent.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new pageContentController();