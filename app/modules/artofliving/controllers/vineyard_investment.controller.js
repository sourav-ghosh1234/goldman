const vineyardInvestmentRepo = require('artofliving/repositories/vineyard_investment.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class vineyardInvestmentController {
    constructor() {
        this.vineyardInvestment = [];
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
            let vineyardInvestment = await vineyardInvestmentRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < vineyardInvestment.translate.length; i++) {
                translateArr[vineyardInvestment.translate[i].language] = vineyardInvestment.translate[i];
			}
			vineyardInvestment.translate = translateArr
            if (!_.isEmpty(vineyardInvestment)) {
                result.vineyard_investment_data = vineyardInvestment;
                res.render('artofliving/views/edit_vineyard_investment.ejs', {
                    page_name: 'vineyard-investment-management',
                    page_title: 'Vineyard Investment Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Vineyard Investment not found!");
                res.redirect(namedRouter.urlFor('vineyard.investment.edit'));
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
            const vineyardInvestmentId = req.body.id;
            let vineyardInvestment = await vineyardInvestmentRepo.getById(vineyardInvestmentId);
            let imageArr = vineyardInvestment.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (vineyardInvestment.bannerImage && vineyardInvestment.bannerImage != '' && fs.existsSync(`./public/uploads/vineyard_investment/${vineyardInvestment.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/vineyard_investment/${vineyardInvestment.bannerImage}`);
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
            
            let vineyardInvestmentUpdateById = await vineyardInvestmentRepo.updateById(req.body, vineyardInvestmentId);
            if (vineyardInvestmentUpdateById) {
                req.flash('success', "Vineyard Investment Updated Successfully");
                res.redirect(namedRouter.urlFor('vineyard.investment.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new vineyardInvestmentController();