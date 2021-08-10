const contactusRepo = require('contactus/repositories/contactus.repository');
const languageRepo = require('language/repositories/language.repository');
const contactcontentRepo = require('contactus/repositories/contactcontent.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

class contactusController {
    constructor() {
        this.contactus = [];
    }

    /* @Method: list
    // @Description: To get all the contactus from DB
    */
    async list(req, res) {
        try {
            res.render('contactus/views/list.ejs', {
                page_name: 'contactus-list',
                page_title: 'Contact Request List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    async getAll(req, res) {
        try {
            let contactus = await contactusRepo.getAll(req);
            //console.log("contactus>>", contactus)

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = { "page": req.body.pagination.page, "pages": contactus.pageCount, "perpage": req.body.pagination.perpage, "total": contactus.totalCount, "sort": sortOrder, "field": sortField };
            return { status: 200, meta: meta, data: contactus.data, message: `Data fetched succesfully.` };
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    }

    async create(req, res) {
        try {
            res.render('contactus/views/create.ejs', {
                page_name: 'contactus-list',
                page_title: 'Create Contact Request',
                user: req.user,
            });
        } catch (e) {
            throw ({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            let contactusSave = await contactusRepo.save(req.body);
            if (contactusSave) {
                req.flash('success', "Contact Request created successfully.");
                res.redirect(namedRouter.urlFor('contactus.list'));
            }
        } catch (e) {
            throw ({ message: e.message });
        }
    }

    /*
    // @Method: edit
    // @Description:  contactus update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let contactus = await contactusRepo.getById(req.params.id);
            if (!_.isEmpty(contactus)) {
                result.contactus_data = contactus;
                res.render('contactus/views/edit.ejs', {
                    page_name: 'contactus-management',
                    page_title: 'Edit Contact Request',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Contact Request not found!");
                res.redirect(namedRouter.urlFor('contactus.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    /* @Method: update
    // @Description: contactus update action
    */
    async update(req, res) {
        try {
            const contactusId = req.body.contactus_id;
            //  let contactus = await contactusRepo.getByField({'contactus_name':req.body.contactus_name,_id:{$ne:contactusId}});
            let contactusUpdate = await contactusRepo.updateById(req.body, contactusId)
            if (contactusUpdate) {
                req.flash('success', "Contact Request updated successfully");
                res.redirect(namedRouter.urlFor('contactus.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    /*
    // @Method: status_change
    // @Description: contactus status change action
    */
    async changeStatus(req, res) {
        try {
            let contactus = await contactusRepo.getById(req.params.id);
            if (!_.isEmpty(contactus)) {
                let contactusStatus = (contactus.status == "Active") ? "Inactive" : "Active";
                let contactusUpdate = await contactusRepo.updateById({ "status": contactusStatus }, req.params.id);
                req.flash('success', "Contact Request status has changed successfully");
                res.redirect(namedRouter.urlFor('contactus.list'));
            } else {
                req.flash('error', "Sorry Contact Request not found");
                res.redirect(namedRouter.urlFor('contactus.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    /* @Method: delete
    // @Description: contactus delete
    */
    async destroy(req, res) {
        try {
            //let contactusDelete = await contactusRepo.delete(req.params.id)
            let contactusDelete = await contactusRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(contactusDelete)) {
                req.flash('success', 'Contact Request removed successfully');
                res.redirect(namedRouter.urlFor('contactus.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }


    /*
    // @Method: editContent
    // @Description: Contact content update page
    */
    async editContent(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
			result.languages = languages;
            let contactcontent = await contactcontentRepo.getByField();
            
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < contactcontent.translate.length; i++) {
                translateArr[contactcontent.translate[i].language] = contactcontent.translate[i];
			}
            contactcontent.translate = translateArr
            if (!_.isEmpty(contactcontent)) {
                result.contactcontent_data = contactcontent;
                
                res.render('contactus/views/edit_content.ejs', {
                    page_name: 'contactcontent-management',
                    page_title: 'Contact Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Contact Content not found!");
                res.redirect(namedRouter.urlFor('contactcontent.edit'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }

    };

    /* @Method: updateContent
    // @Description: Contact content update action
    */
    async updateContent(req, res) {
        try {
            const contactcontentId = req.body.id;
            let contactContent = await contactcontentRepo.getById(contactcontentId);
            let contactContentIdUpdate = await contactcontentRepo.updateById(req.body, contactcontentId);
            if (contactContentIdUpdate) {
                req.flash('success', "Contact Content Updated Successfully");
                res.redirect(namedRouter.urlFor('contactcontent.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new contactusController();