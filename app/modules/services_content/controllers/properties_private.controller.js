const propertiesPrivateRepo = require('services_content/repositories/properties_private.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class propertiesPrivateController {
    constructor() {
        this.propertiesPrivate = [];
    }

    /*
    // @Method: edit
    // @Description:  edit page
    */
    async edit(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
			result.languages = languages;
            let propertiesPrivate = await propertiesPrivateRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < propertiesPrivate.translate.length; i++) {
                translateArr[propertiesPrivate.translate[i].language] = propertiesPrivate.translate[i];
			}
			propertiesPrivate.translate = translateArr
            if (!_.isEmpty(propertiesPrivate)) {
                result.properties_private_data = propertiesPrivate;
                res.render('services_content/views/edit_properties_private.ejs', {
                    page_name: 'Exclusive-properties-management',
                    page_title: 'Exclusive properties & private office',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Exclusive properties & private office not found!");
                res.redirect(namedRouter.urlFor('properties.private.edit'));
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
            const propertiesPrivateId = req.body.id;
            let propertiesPrivate = await propertiesPrivateRepo.getById(propertiesPrivateId);
            let imageArr = propertiesPrivate.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (propertiesPrivate.bannerImage && propertiesPrivate.bannerImage != '' && fs.existsSync(`./public/uploads/properties_private/${propertiesPrivate.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/properties_private/${propertiesPrivate.bannerImage}`);
                        }
                        req.body.bannerImage = file.filename;
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
            } else {
                req.body.image = imageArr; 
            }
            
            let propertiesPrivateUpdateById = await propertiesPrivateRepo.updateById(req.body, propertiesPrivateId);
            if (propertiesPrivateUpdateById) {
                req.flash('success', "Exclusive properties & private office Updated Successfully");
                res.redirect(namedRouter.urlFor('properties.private.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new propertiesPrivateController();