const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const realEstateController = require('real_estate/controllers/real_estate.controller');
const request_param = multer();

namedRouter.all('/realestate*', auth.authenticate);

namedRouter.post("realestate.rent.getall", '/realestate-rent/getall', async (req, res) => {
    try {
        const success = await realEstateController.getAllRentContent(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("realestate.rent.list", '/realestate-rent/list', realEstateController.RentContentList);
namedRouter.get("realestate.rent.create", '/realestate-rent/create', realEstateController.createRentContent);
namedRouter.post("realestate.rent.store", '/realestate-rent/store', request_param.any(), realEstateController.storeRentContent);
namedRouter.get("realestate.rent.edit", "/realestate-rent/edit/:id", realEstateController.editRentContent);
namedRouter.post("realestate.rent.update", '/realestate-rent/update', request_param.any(), realEstateController.updateRentContent);

module.exports = router;