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
            res.render('real_estate/views/list_sale_content.ejs', {
                page_name: 'sale-management',
                page_title: 'For Sale Content',
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
                page_title: 'Create For Sale Content',
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
                    page_title: 'For Sale Content Edit',
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



    /* @Method: RentContentList
    // @Description: To get all the rent content from DB
    */
    async RentContentList(req, res) {
        try {
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            res.render('real_estate/views/list_rent_content.ejs', {
                page_name: 'rent-management',
                page_title: 'For Rent Content',
                user: req.user,
                cities:cities

            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    async getAllRentContent(req, res) {
        try {
            let rentContent = await realEstateRepo.getAllRentContent(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": rentContent.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": rentContent.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: rentContent.data,
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
    // @Description:  rent content add page
    */
    async createRentContent(req, res) {
        try {
            let result = {};
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            result.cities = cities;
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('real_estate/views/add_rent_content.ejs', {
                page_name: 'rent-management',
                page_title: 'Create For Rent Content',
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
    // @Description:  rent content store
    */
    async storeRentContent(req, res) {
        try {
            let rentContentData = await realEstateRepo.getrentContent({
                'cityId':req.body.cityId
            });
            if (_.isEmpty(rentContentData)) {
                let rentContentDataInsert = realEstateRepo.saveRentContent(req.body);
                if (rentContentDataInsert) {
                    req.flash('success', "Rent Content Created Successfully");
                    res.redirect(namedRouter.urlFor('realestate.rent.list'));
                }
            } else {
                req.flash('error', "Rent Content already exist with this city");
                res.redirect(namedRouter.urlFor('realestate.rent.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: editRentContent
    // @Description:  Rent update page
    */
    async editRentContent(req, res) {
        try {
            let result = {};
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            result.cities = cities;
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
            result.languages = languages;
            let rentContent = await realEstateRepo.getRentContentById(req.params.id);
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < rentContent.translate.length; i++) {
                translateArr[rentContent.translate[i].language] = rentContent.translate[i];
			}
			rentContent.translate = translateArr
            if (!_.isEmpty(rentContent)) {
                result.rentcontent_data = rentContent;
                res.render('real_estate/views/edit_rent_content.ejs', {
                    page_name: 'rent-management',
                    page_title: 'For Rent Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('realestate.rent.edit',{'id':req.params.id}));
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
    async updateRentContent(req, res) {
        try {
            const rentContentId = req.body.id;
            let rentContent = await realEstateRepo.getRentContentById(rentContentId);
            let rentContentUpdateById = await realEstateRepo.updateRentContentById(req.body, rentContentId);
            if (rentContentUpdateById) {
                req.flash('success', "Rent Content Updated Successfully");
                res.redirect(namedRouter.urlFor('realestate.rent.list'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };



    /* @Method: BuyContentList
    // @Description: To get all the buy content from DB
    */
    async BuyContentList(req, res) {
        try {
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            res.render('real_estate/views/list_buy_content.ejs', {
                page_name: 'buy-management',
                page_title: 'For Buy Content',
                user: req.user,
                cities:cities

            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async getAllBuyContent(req, res) {
        try {
            let buyContent = await realEstateRepo.getAllBuyContent(req);
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": buyContent.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": buyContent.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: buyContent.data,
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
    // @Description:  buy content add page
    */
    async createBuyContent(req, res) {
        try {
            let result = {};
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            result.cities = cities;
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('real_estate/views/add_buy_content.ejs', {
                page_name: 'buy-management',
                page_title: 'Create For Buy Content',
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
    // @Description:  buy content store
    */
    async storeBuyContent(req, res) {
        try {
            let buyContentData = await realEstateRepo.getbuyContent({
                'cityId':req.body.cityId
            });
            if (_.isEmpty(buyContentData)) {
                let buyContentDataInsert = realEstateRepo.saveBuyContent(req.body);
                if (buyContentDataInsert) {
                    req.flash('success', "Buy Content Created Successfully");
                    res.redirect(namedRouter.urlFor('realestate.buy.list'));
                }
            } else {
                req.flash('error', "Buy Content already exist with this city");
                res.redirect(namedRouter.urlFor('realestate.buy.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: editBuyContent
    // @Description:  Buy update page
    */
    async editBuyContent(req, res) {
        try {
            let result = {};
            let cities = await cityRepo.getAllByField({ status: 'Active', isDeleted: false });
            result.cities = cities;
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
            result.languages = languages;
            let buyContent = await realEstateRepo.getBuyContentById(req.params.id);
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < buyContent.translate.length; i++) {
                translateArr[buyContent.translate[i].language] = buyContent.translate[i];
			}
			buyContent.translate = translateArr
            if (!_.isEmpty(buyContent)) {
                result.buycontent_data = buyContent;
                res.render('real_estate/views/edit_buy_content.ejs', {
                    page_name: 'buy-management',
                    page_title: 'For Buy Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('realestate.buy.edit',{'id':req.params.id}));
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
    async updateBuyContent(req, res) {
        try {
            const buyContentId = req.body.id;
            let buyContent = await realEstateRepo.getBuyContentById(buyContentId);
            let buyContentUpdateById = await realEstateRepo.updateBuyContentById(req.body, buyContentId);
            if (buyContentUpdateById) {
                req.flash('success', "Buy Content Updated Successfully");
                res.redirect(namedRouter.urlFor('realestate.buy.list'));
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