const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const cityController = require('city/controllers/city.controller');
//const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of city
namedRouter.all('/city*', auth.authenticate);

// admin city list route
namedRouter.post("city.getall", '/city/getall', async(req, res) => {
    try {
        const success = await cityController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("city.list", '/city/list', cityController.list);
namedRouter.get("city.create", '/city/create', cityController.create);
namedRouter.post("city.store", '/city/store', request_param.any(), cityController.store);
namedRouter.get("city.edit", '/city/edit/:id', cityController.edit);
namedRouter.get("city.delete", '/city/delete/:id', cityController.destroy);
namedRouter.post("city.update", '/city/update', request_param.any(), cityController.update);
namedRouter.get("city.statusChange", '/city/status-change/:id', request_param.any(), cityController.changeStatus);

//Export the express.Router() instance
module.exports = router;