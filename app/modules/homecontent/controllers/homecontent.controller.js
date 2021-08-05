const homecontentRepo = require('homecontent/repositories/homecontent.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class homeContentController {
    constructor() {
        this.homeContent = [];
    }

    /*
    // @Method: edit
    // @Description:  Home content update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
			result.languages = languages;
            let homecontent = await homecontentRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < homecontent.translate.length; i++) {
                translateArr[homecontent.translate[i].language] = homecontent.translate[i];
			}
            homecontent.translate = translateArr
            if (!_.isEmpty(homecontent)) {
                result.homecontent_data = homecontent;
                
                res.render('homecontent/views/edit.ejs', {
                    page_name: 'homecontent-management',
                    page_title: 'Home Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('homecontent.edit'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }

    };

    /* @Method: update
    // @Description: Home content update action
    */
    async update(req, res) {
        try {
            const homecontentId = req.body.id;
            let homeContent = await homecontentRepo.getById(homecontentId);
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (homeContent.bannerImage && homeContent.bannerImage != '' && fs.existsSync(`./public/uploads/homecontent/${homeContent.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/homecontent/${homeContent.bannerImage}`);
                        }
                        req.body.bannerImage = file.filename;
                    } 
                    if (file.fieldname == 'artOfLiving_image') {
                        if (homeContent.artOfLiving.image && homeContent.artOfLiving.image != '' && fs.existsSync(`./public/uploads/homecontent/${homeContent.artOfLiving.image}`)) {
                            fs.unlinkSync(`./public/uploads/homecontent/${homeContent.artOfLiving.image}`);
                        }
                        req.body.artOfLiving.image = file.filename;
                    } 
                    if (file.fieldname == 'realEstateService_image') {
                        if (homeContent.realEstateService.image && homeContent.realEstateService.image != '' && fs.existsSync(`./public/uploads/homecontent/${homeContent.realEstateService.image}`)) {
                            fs.unlinkSync(`./public/uploads/homecontent/${homeContent.realEstateService.image}`);
                        }
                        req.body.realEstateService.image = file.filename;
                    } 
                });
            }
            let homecontentIdUpdate = await homecontentRepo.updateById(req.body, homecontentId);
            if (homecontentIdUpdate) {
                req.flash('success', "Home Content Updated Successfully");
                res.redirect(namedRouter.urlFor('homecontent.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new homeContentController();