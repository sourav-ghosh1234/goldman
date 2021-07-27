const mongoose = require('mongoose');
const newsRepo = require('news/repositories/news.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});


class newsController {
    constructor() {
        this.news = [];
    }

    /* @Method: create
    // @Description: news create view render
    */
    async create(req, res) {
        try {
            res.render('news/views/add.ejs', {
                page_name: 'news-management',
                page_title: 'Create News',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: store
    // @Description: save news
    */
    async store(req, res) {
        try {
            let newsCheck = await newsRepo.getByField({'title':req.body.title, isDeleted: false});
            if(_.isEmpty(newsCheck)){
                if (req.files.length>0){
                    gm('./public/uploads/news/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/news/thumb/' + req.files[0].filename, function (err, result) {
                        if (!err) console.log('done');
                });
                req.body.image = req.files[0].filename;
                }
                let save = await newsRepo.save(req.body);
                if(save){
                    req.flash('success', 'News save successfully.');
                    res.redirect(namedRouter.urlFor('news.list'));
                }
            }else{
                req.flash('error', "News already exist.");
                res.redirect(namedRouter.urlFor('news.create'));
            }
        } catch (e) {
            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('news.create'));
        }
    };

    /* @Method: list
    // @Description: To get all the news from DB
    */
    async list(req, res) {
        try {
            res.render('news/views/list.ejs', {
                page_name: 'news-management',
                page_title: 'News List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAll
    // @Description: To get all the news from DB
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
            let newsData = await newsRepo.getAll(req);
            let meta = {
                "page": req.body.pagination.page,
                "pages": newsData.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": newsData.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200, meta: meta, data: newsData.data, message: `Data fetched successfully.`
            };
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    }

    
    /**
     * @Method: edit
     * @Description: To edit news information
     */
    async edit(req, res) {
        try {
            let newsData = await newsRepo.getById(req.params.id);
            if (!_.isEmpty(newsData)) {
                res.render('news/views/edit.ejs', {
                    page_name: 'news-management',
                    page_title: 'Edit News',
                    user: req.user,
                    response: newsData,
                });
            } else {
                req.flash('error', "Sorry news not found!");
                res.redirect(namedRouter.urlFor('news.list'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: update
    // @Description: news Update
    */
    async update(req, res) {
        try {
            var chkTitle = {
                isDeleted: false,
                title: req.body.title,
                _id: { $ne: mongoose.Types.ObjectId(req.body.id) }
            };
           
            let checkTitle = await newsRepo.getByField(chkTitle);
            if (!_.isEmpty(checkTitle)) {
                req.flash('error', "News already exist.");
                res.redirect(namedRouter.urlFor('news.edit',{
                    id: req.body.id
                }));
            }
            else {
                let oldData = await newsRepo.getById(req.body.id);
                if (req.files.length > 0){
                    if (fs.existsSync('./public/uploads/news/' + oldData.image) && oldData.image != '') {
                        fs.unlinkSync('./public/uploads/news/' + oldData.image);
                        fs.unlinkSync('./public/uploads/news/thumb/' + oldData.image);
                    }
                    gm('./public/uploads/news/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/news/thumb/' + req.files[0].filename, function (err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename;
                }
                let newsUpdate = await newsRepo.updateById(req.body, req.body.id);
                if (newsUpdate) {
                    req.flash('success', 'News updated successfully.');
                    res.redirect(namedRouter.urlFor('news.list'));
                } else {
                    res.redirect(namedRouter.urlFor('news.edit', { id: req.body.id }));
                }
            }
            
        } catch (e) {
            throw e;
        }
    };

    /* @Method: delete
    // @Description: news Delete
    */
    async delete(req, res) {
        try {
            let newsData = await newsRepo.getById(req.params.id);
            if(!_.isEmpty(newsData)){
                let newsDelete = await newsRepo.updateById({
                    "isDeleted": true
                }, newsData._id)
                if (!_.isEmpty(newsDelete)) {
                        req.flash('success', 'News Removed Successfully');
                        res.redirect(namedRouter.urlFor('news.list'));
                }
            }else{
                req.flash('error', "Sorry news not found");
                res.redirect(namedRouter.urlFor('news.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    

    /*
    // @Method: statusChange
    // @Description: news status change action
    */
    async statusChange(req, res) {
        try {            
            let newsData = await newsRepo.getById(req.params.id);
            if (!_.isEmpty(newsData)) {
                let newsStatus = (newsData.status == 'Active') ? 'Inactive' : 'Active';
                let newsUpdate = await newsRepo.updateById({
                    'status': newsStatus
                }, req.params.id);
                if(!_.isEmpty(newsStatus)){
                    req.flash('success', "News status has changed successfully.");
                    res.redirect(namedRouter.urlFor('news.list'));
                }
            } else {
                req.flash('error', "Sorry news not found");
                res.redirect(namedRouter.urlFor('news.list'));
                
            }
        } catch (e) {
           
            return res.status(500).send({
                message: e.message
            });
        }
    };
}

module.exports = new newsController();