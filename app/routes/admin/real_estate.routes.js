const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const realEstateController = require('real_estate/controllers/real_estate.controller');
const request_param = multer();

namedRouter.all('/realestate*', auth.authenticate);

namedRouter.post("realestate.sale.getall", '/realestate-sale/getall', async (req, res) => {
    try {
        const success = await realEstateController.getAllSaleContent(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("realestate.sale.list", '/realestate-sale/list', realEstateController.SaleContentList);
namedRouter.get("realestate.sale.create", '/realestate-sale/create', realEstateController.createSaleContent);
namedRouter.post("realestate.sale.store", '/realestate-sale/store', request_param.any(), realEstateController.storeSaleContent);
namedRouter.get("realestate.sale.edit", "/realestate-sale/edit/:id", realEstateController.editSaleContent);
namedRouter.post("realestate.sale.update", '/realestate-sale/update', request_param.any(), realEstateController.updateSaleContent);

module.exports = router;