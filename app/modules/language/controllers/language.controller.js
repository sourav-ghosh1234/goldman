const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');

class languageController {
    constructor() {
        this.language = [];
    }

    async create(req, res) {
        try {
            res.render('language/views/create.ejs', {
                page_name: 'language-management',
                page_title: 'Create Language',
                user: req.user,
            });
        } catch (e) {
            throw ({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            let language = await languageRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' }, 'isDeleted': false });
            //let language = await languageRepo.getByField({ 'title': req.body.title, 'isDeleted': false });
            //console.log("29>>",language); process.exit();

            if (_.isEmpty(language)) {
                if (req.files.length > 0) {
                    req.body.icon = req.files[0].filename;
                }
                let languageSave = await languageRepo.save(req.body);
                if (languageSave) {
                    req.flash('success', "Language created successfully.");
                    res.redirect(namedRouter.urlFor('language.list'));
                }
            } else {
                req.flash('error', "This Language already exist!");
                res.redirect(namedRouter.urlFor('language.list'));
            }
        } catch (e) {
            throw ({ message: e.message });
        }
    }


    /*
    // @Method: edit
    // @Description:  language update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let language = await languageRepo.getById(req.params.id);
            if (!_.isEmpty(language)) {
                result.language_data = language;
                res.render('language/views/edit.ejs', {
                    page_name: 'language-management',
                    page_title: 'Edit Language',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Language not found!");
                res.redirect(namedRouter.urlFor('language.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: language update action
    */
    async update(req, res) {
        try {
            const languageId = req.body.language_id;
            //  let language = await languageRepo.getByField({'title':req.body.title,_id:{$ne:languageId}});
            let language = await languageRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' }, _id: { $ne: languageId } });
            if (_.isEmpty(language)) {
                let languageData = await languageRepo.getById(languageId);
                if (req.files.length > 0) {
                    if (languageData.icon && languageData.icon != '' && fs.existsSync(`./public/uploads/language/${languageData.icon}`)) {
                        fs.unlinkSync(`./public/uploads/language/${languageData.icon}`);
                    }
                    req.body.icon = req.files[0].filename;
                }
                let languageUpdate = await languageRepo.updateById(req.body, languageId);
                if (languageUpdate) {
                    req.flash('success', "Language updated successfully");
                    res.redirect(namedRouter.urlFor('language.list'));
                }

            } else {
                req.flash('error', "Language is already available!");
                res.redirect(namedRouter.urlFor('language.edit', { id: languageId }));
            }
        } catch (e) {
            console.log(99, e);
            return res.status(500).send({ message: e.message });
        }

    };

    /* @Method: list
    // @Description: To get all the languages from DB
    */
    async list(req, res) {
        try {
            res.render('language/views/list.ejs', {
                page_name: 'language-management',
                page_title: 'Language List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async getAll(req, res) {
            try {
                let language = await languageRepo.getAll(req);
                //console.log("language>>", language)

                if (_.has(req.body, 'sort')) {
                    var sortOrder = req.body.sort.sort;
                    var sortField = req.body.sort.field;
                } else {
                    var sortOrder = -1;
                    var sortField = '_id';
                }
                let meta = { "page": req.body.pagination.page, "pages": language.pageCount, "perpage": req.body.pagination.perpage, "total": language.totalCount, "sort": sortOrder, "field": sortField };
                return { status: 200, meta: meta, data: language.data, message: `Data fetched succesfully.` };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
        }
        /*
        // @Method: status_change
        // @Description: language status change action
        */
    async changeStatus(req, res) {
        try {
            //console.log("147>>",req.params.id);
            let language = await languageRepo.getById(req.params.id);
            //console.log("149>>",language); process.exit();
            if (!_.isEmpty(language)) {
                let languageStatus = (language.status == "Active") ? "Inactive" : "Active";
                let languageUpdate = await languageRepo.updateById({ "status": languageStatus }, req.params.id);
                req.flash('success', "Language status has changed successfully");
                res.redirect(namedRouter.urlFor('language.list'));
            } else {
                req.flash('error', "Sorry Language not found");
                res.redirect(namedRouter.urlFor('language.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: delete
    // @Description: language delete
    */
    async destroy(req, res) {
        try {
            //let languageDelete = await languageRepo.delete(req.params.id)
            let languageDelete = await languageRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(languageDelete)) {
                req.flash('success', 'Language removed successfully');
                res.redirect(namedRouter.urlFor('language.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new languageController();