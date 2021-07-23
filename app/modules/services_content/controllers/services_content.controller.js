const serviceContentRepo = require('services_content/repositories/services_content.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class serviceContentController {
    constructor() {
        this.serviceContent = [];
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
            let serviceContent = await serviceContentRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < serviceContent.translate.length; i++) {
                translateArr[serviceContent.translate[i].language] = serviceContent.translate[i];
			}
			serviceContent.translate = translateArr
            if (!_.isEmpty(serviceContent)) {
                result.serviceContent_data = serviceContent;
                res.render('services_content/views/edit.ejs', {
                    page_name: 'service-content-management',
                    page_title: 'Home Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('services.content.edit'));
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
            const serviceContentId = req.body.id;
            let serviceContent = await serviceContentRepo.getById(serviceContentId);
            let imageArr = serviceContent.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname.search('sectionImage') != -1) {
                        let fileIndex = file.fieldname.split('_')[1];
                        if (serviceContent.sections[fileIndex]['image'] && serviceContent.sections[fileIndex]['image'] != '' && fs.existsSync(`./public/uploads/services_content/${serviceContent.sections[fileIndex]['image']}`)) {
                            fs.unlinkSync(`./public/uploads/services_content/${serviceContent.sections[fileIndex]['image']}`);
                        }
                        req.body.sections[fileIndex]['image'] = file.filename;
                    } else {
                        imageArr.push(file.filename);
                    }
                });
            }

            // For delete image //
            if (req.body.delImgIds) {
                var delimageList = req.body.delImgIds.split(',');
                imageArr = imageArr.filter(item => !delimageList.includes(item));
                req.body.image = imageArr; 
            }
            
            let serviceContentUpdateById = await serviceContentRepo.updateById(req.body, serviceContentId);
            if (serviceContentUpdateById) {
                req.flash('success', "Services Content Updated Successfully");
                res.redirect(namedRouter.urlFor('services.content.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new serviceContentController();