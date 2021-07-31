const staticTextRepo = require('staticText/repositories/staticText.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');

class staticTextController {
    constructor() {
        this.staticText = [];
    }

    /*
    // @Method: edit
    // @Description:  staticText update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
            result.languages = languages;
            let staticText = await staticTextRepo.getByField();

            // This is for language section //
            var translateArr = [];
            for (var i = 0; i < staticText.translate.length; i++) {
                translateArr[staticText.translate[i].language] = staticText.translate[i]
            }
            staticText.translate = translateArr

            // This is for language section //

            if (!_.isEmpty(staticText)) {
                result.staticText_data = staticText;
                //console.log("result",result)
                res.render('staticText/views/edit.ejs', {
                    page_name: 'statictext-management',
                    page_title: 'Update Static Text',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Text not found!");
                res.redirect(namedRouter.urlFor('staticText.edit'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: faq update action
    */
    async update(req, res) {
        try {
            let translateAr = {
                "footer_common_text":req.body.translate[0].footer_common_text,
                "copyright_text":req.body.translate[0].copyright_text,
                "follow_us_text":req.body.translate[0].follow_us_text
            }
            const staticTextId = req.body.id;
            let staticTextDataUpdate = await staticTextRepo.updateById(req.body, staticTextId);
            if (staticTextDataUpdate) {
                req.flash('success', "Static Text updated Successfully");
                res.redirect(namedRouter.urlFor('staticText.edit'));
            }
        } catch (e) {
            console.log('ererererer', e);
            return res.status(500).send({
                message: e.message
            });
        }

    };

}

module.exports = new staticTextController();