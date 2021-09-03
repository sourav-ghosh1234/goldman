const propertyManagementRepo = require('services_content/repositories/property_management.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class propertyManagementController {
    constructor() {
        this.propertyManagement = [];
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
            let propertyManagement = await propertyManagementRepo.getByField();
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < propertyManagement.translate.length; i++) {
                translateArr[propertyManagement.translate[i].language] = propertyManagement.translate[i];
			}
			propertyManagement.translate = translateArr
            if (!_.isEmpty(propertyManagement)) {
                result.property_management_data = propertyManagement;
                res.render('services_content/views/edit_property_management.ejs', {
                    page_name: 'service-property-management',
                    page_title: 'Property Management',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Property Management not found!");
                res.redirect(namedRouter.urlFor('property.management.edit'));
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
            const propertyManagementId = req.body.id;
            let propertyManagement = await propertyManagementRepo.getById(propertyManagementId);
            let imageArr = propertyManagement.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (propertyManagement.bannerImage && propertyManagement.bannerImage != '' && fs.existsSync(`./public/uploads/property_management/${propertyManagement.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/property_management/${propertyManagement.bannerImage}`);
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
            
            let propertyManagementUpdateById = await propertyManagementRepo.updateById(req.body, propertyManagementId);
            if (propertyManagementUpdateById) {
                req.flash('success', "Property Management Updated Successfully");
                res.redirect(namedRouter.urlFor('property.management.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new propertyManagementController();