const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const realEstateController = require('real_estate/controllers/real_estate.controller');
const request_param = multer();

namedRouter.all('/realestate*', auth.authenticate);

namedRouter.post("realestate.buy.getall", '/realestate-buy/getall', async (req, res) => {
    try {
        const success = await realEstateController.getAllBuyContent(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("realestate.buy.list", '/realestate-buy/list', realEstateController.BuyContentList);
namedRouter.get("realestate.buy.create", '/realestate-buy/create', realEstateController.createBuyContent);
namedRouter.post("realestate.buy.store", '/realestate-buy/store', request_param.any(), realEstateController.storeBuyContent);
namedRouter.get("realestate.buy.edit", "/realestate-buy/edit/:id", realEstateController.editBuyContent);
namedRouter.post("realestate.buy.update", '/realestate-buy/update', request_param.any(), realEstateController.updateBuyContent);

module.exports = router;