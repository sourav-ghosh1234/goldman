const lifeAnnuitiesRepo = require('services_content/repositories/life_annuities.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class lifeAnnuitiesController {
    constructor() {
        this.lifeAnnuities = [];
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
            let lifeAnnuities = await lifeAnnuitiesRepo.getByField();
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < lifeAnnuities.translate.length; i++) {
                translateArr[lifeAnnuities.translate[i].language] = lifeAnnuities.translate[i];
			}
			lifeAnnuities.translate = translateArr
            if (!_.isEmpty(lifeAnnuities)) {
                result.life_annuities_data = lifeAnnuities;
                res.render('services_content/views/edit_life_annuities.ejs', {
                    page_name: 'life-annuities-management',
                    page_title: 'Life Annuities',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Life Annuities not found!");
                res.redirect(namedRouter.urlFor('life.annuities.edit'));
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
            const lifeAnnuitiesId = req.body.id;
            let lifeAnnuities = await lifeAnnuitiesRepo.getById(lifeAnnuitiesId);
            let imageArr = lifeAnnuities.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (lifeAnnuities.bannerImage && lifeAnnuities.bannerImage != '' && fs.existsSync(`./public/uploads/life_annuities/${lifeAnnuities.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/life_annuities/${lifeAnnuities.bannerImage}`);
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
            
            let lifeAnnuitiesUpdateById = await lifeAnnuitiesRepo.updateById(req.body, lifeAnnuitiesId);
            if (lifeAnnuitiesUpdateById) {
                req.flash('success', "Life Annuities Updated Successfully");
                res.redirect(namedRouter.urlFor('life.annuities.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new lifeAnnuitiesController();