const investmentRealtyRepo = require('services_content/repositories/investment_realty.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class investmentRealtyController {
    constructor() {
        this.investmentRealty = [];
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
            let investmentRealty = await investmentRealtyRepo.getByField();
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < investmentRealty.translate.length; i++) {
                translateArr[investmentRealty.translate[i].language] = investmentRealty.translate[i];
			}
			investmentRealty.translate = translateArr
            if (!_.isEmpty(investmentRealty)) {
                result.investment_realty_data = investmentRealty;
                res.render('services_content/views/edit_investment_realty.ejs', {
                    page_name: 'investment-realty-management',
                    page_title: 'Investment Realty',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Investment Realty not found!");
                res.redirect(namedRouter.urlFor('investment.realty.edit'));
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
            const investmentRealtyId = req.body.id;
            let investmentRealty = await investmentRealtyRepo.getById(investmentRealtyId);
            let imageArr = investmentRealty.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (investmentRealty.bannerImage && investmentRealty.bannerImage != '' && fs.existsSync(`./public/uploads/investment_realty/${investmentRealty.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/investment_realty/${investmentRealty.bannerImage}`);
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
            
            let investmentRealtyUpdateById = await investmentRealtyRepo.updateById(req.body, investmentRealtyId);
            if (investmentRealtyUpdateById) {
                req.flash('success', "Investment Realty Updated Successfully");
                res.redirect(namedRouter.urlFor('investment.realty.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new investmentRealtyController();