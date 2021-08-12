const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const characteristicsController = require('characteristics/controllers/characteristics.controller');
const multer = require('multer');
const request_param = multer();


//authentication section of characteristics
namedRouter.all('/characteristics*', auth.authenticate);

// admin characteristics list route

namedRouter.post("characteristics.getall", '/characteristics/getall', async (req, res) => {
    try {
        const success = await characteristicsController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("characteristics.list", '/characteristics/list', characteristicsController.list);
namedRouter.get("characteristics.create", '/characteristics/create', characteristicsController.create);
namedRouter.post("characteristics.store", '/characteristics/store', request_param.any(), characteristicsController.store);
namedRouter.get("characteristics.edit", '/characteristics/edit/:id', characteristicsController.edit);
namedRouter.post("characteristics.update", '/characteristics/update', request_param.any(), characteristicsController.update);
namedRouter.get("characteristics.statusChange", '/characteristics/status-change/:id', characteristicsController.statusChange);
namedRouter.get("characteristics.delete", '/characteristics/delete/:id', characteristicsController.destroy);


//Export the express.Router() instance
module.exports = router;