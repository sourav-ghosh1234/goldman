const countryEstateRepo = require('artofliving/repositories/country_estate.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class countryEstateController {
    constructor() {
        this.countryEstate = [];
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
            let countryEstate = await countryEstateRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < countryEstate.translate.length; i++) {
                translateArr[countryEstate.translate[i].language] = countryEstate.translate[i];
			}
			countryEstate.translate = translateArr
            if (!_.isEmpty(countryEstate)) {
                result.countryestate_data = countryEstate;
                res.render('artofliving/views/edit_country_estate.ejs', {
                    page_name: 'countryestate-management',
                    page_title: 'Country Estate Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Country Estate not found!");
                res.redirect(namedRouter.urlFor('countryestate.edit'));
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
            const countryEstateId = req.body.id;
            let countryEstate = await countryEstateRepo.getById(countryEstateId);
            console.log(req.files);
            let imageArr = countryEstate.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (countryEstate.bannerImage && countryEstate.bannerImage != '' && fs.existsSync(`./public/uploads/country_estate/${countryEstate.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/homecontent/${homeContent.bannerImage}`);
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
            
            let countryEstateUpdateById = await countryEstateRepo.updateById(req.body, countryEstateId);
            if (countryEstateUpdateById) {
                req.flash('success', "Country Estate Updated Successfully");
                res.redirect(namedRouter.urlFor('countryestate.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new countryEstateController();