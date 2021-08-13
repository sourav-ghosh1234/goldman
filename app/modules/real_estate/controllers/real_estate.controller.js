const realEstateRepo = require('real_estate/repositories/real_estate.repository');
const languageRepo = require('language/repositories/language.repository');
const cityRepo = require('city/repositories/city.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class realEstateController {
    constructor() {
        
    }

    /* @Method: SaleContentList
    // @Description: To get all the sale content from DB
    */
    async SaleContentList(req, res) {
        try {
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            res.render('real_estate/views/list.ejs', {
                page_name: 'sale-management',
                page_title: 'Sale Content',
                user: req.user,
                cities:cities

            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    async getAllSaleContent(req, res) {
        try {
            let saleContent = await realEstateRepo.getAllSaleContent(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": saleContent.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": saleContent.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: saleContent.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            return {
                status: 500,
                data: [],
                message: e.message
            };
        }
    }

     /*
    // @Method: create
    // @Description:  sale content add page
    */
    async createSaleContent(req, res) {
        try {
            let result = {};
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            result.cities = cities;
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('real_estate/views/add_sale_content.ejs', {
                page_name: 'sale-management',
                page_title: 'Create Sale Content',
                user: req.user,
                response: result
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: store
    // @Description:  sale content store
    */
    async storeSaleContent(req, res) {
        try {
            let saleContentData = await realEstateRepo.getsaleContent({
                'cityId':req.body.cityId
            });
            if (_.isEmpty(saleContentData)) {
                let saleContentDataInsert = realEstateRepo.saveSaleContent(req.body);
                if (saleContentDataInsert) {
                    req.flash('success', "Sale Content Created Successfully");
                    res.redirect(namedRouter.urlFor('realestate.sale.list'));
                }
            } else {
                req.flash('error', "Sale Content already exist with this city");
                res.redirect(namedRouter.urlFor('realestate.sale.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: editSaleContent
    // @Description:  Sale update page
    */
    async editSaleContent(req, res) {
        try {
            let result = {};
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            result.cities = cities;
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
            result.languages = languages;
            let saleContent = await realEstateRepo.getSaleContentById(req.params.id);
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < saleContent.translate.length; i++) {
                translateArr[saleContent.translate[i].language] = saleContent.translate[i];
			}
			saleContent.translate = translateArr
            if (!_.isEmpty(saleContent)) {
                result.salecontent_data = saleContent;
                res.render('real_estate/views/edit_sale_content.ejs', {
                    page_name: 'sale-management',
                    page_title: 'Sale Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('realestate.sale.edit',{'id':req.params.id}));
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
    async updateSaleContent(req, res) {
        try {
            const saleContentId = req.body.id;
            console.log(req.body,saleContentId)
            let saleContent = await realEstateRepo.getSaleContentById(saleContentId);
            let saleContentUpdateById = await realEstateRepo.updateSaleContentById(req.body, saleContentId);
            if (saleContentUpdateById) {
                req.flash('success', "Sale Content Updated Successfully");
                res.redirect(namedRouter.urlFor('realestate.sale.list'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new realEstateController();