const renovationInteriorRepo = require('services_content/repositories/renovation_interior.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class renovationInteriorController {
    constructor() {
        this.renovationInterior = [];
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
            let renovationInterior = await renovationInteriorRepo.getByField();
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < renovationInterior.translate.length; i++) {
                translateArr[renovationInterior.translate[i].language] = renovationInterior.translate[i];
			}
			renovationInterior.translate = translateArr
            if (!_.isEmpty(renovationInterior)) {
                result.renovation_interior_data = renovationInterior;
                res.render('services_content/views/edit_renovation_interior.ejs', {
                    page_name: 'renovation-interior-management',
                    page_title: 'Renovation Interior Design',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Renovation Interior Design not found!");
                res.redirect(namedRouter.urlFor('renovation.interior.edit'));
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
            const renovationId = req.body.id;
            let renovationInterior = await renovationInteriorRepo.getById(renovationId);
            let imageArr = renovationInterior.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (renovationInterior.bannerImage && renovationInterior.bannerImage != '' && fs.existsSync(`./public/uploads/renovation_interior/${renovationInterior.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/renovation_interior/${renovationInterior.bannerImage}`);
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
            
            let renovationInteriorUpdateById = await renovationInteriorRepo.updateById(req.body, renovationId);
            if (renovationInteriorUpdateById) {
                req.flash('success', "Renovation Interior Design Updated Successfully");
                res.redirect(namedRouter.urlFor('renovation.interior.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new renovationInteriorController();