const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const amenitiesController = require('amenities/controllers/amenities.controller');
const multer = require('multer');
const request_param = multer();


//authentication section of amenities
namedRouter.all('/amenities*', auth.authenticate);

// admin amenities list route

namedRouter.post("amenities.getall", '/amenities/getall', async (req, res) => {
    try {
        const success = await amenitiesController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("amenities.list", '/amenities/list', amenitiesController.list);
namedRouter.get("amenities.create", '/amenities/create', amenitiesController.create);
namedRouter.post("amenities.store", '/amenities/store', request_param.any(), amenitiesController.store);
namedRouter.get("amenities.edit", '/amenities/edit/:id', amenitiesController.edit);
namedRouter.post("amenities.update", '/amenities/update', request_param.any(), amenitiesController.update);
namedRouter.get("amenities.statusChange", '/amenities/status-change/:id', amenitiesController.statusChange);
namedRouter.get("amenities.delete", '/amenities/delete/:id', amenitiesController.destroy);


//Export the express.Router() instance
module.exports = router;