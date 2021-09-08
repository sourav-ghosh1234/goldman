const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const colorController = require('color/controllers/color.controller');
const multer = require('multer');
const request_param = multer();


//authentication section of colors
namedRouter.all('/color*', auth.authenticate);

// admin color list route

namedRouter.post("color.getall", '/color/getall', async (req, res) => {
    try {
        const success = await colorController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("color.list", '/color/list', colorController.list);
namedRouter.get("color.create", '/color/create', colorController.create);
namedRouter.post("color.store", '/color/store', request_param.any(), colorController.store);
namedRouter.get("color.edit", '/color/edit/:id', colorController.edit);
namedRouter.post("color.update", '/color/update', request_param.any(), colorController.update);
namedRouter.get("color.statusChange", '/color/status-change/:id', colorController.statusChange);
namedRouter.get("color.delete", '/color/delete/:id', colorController.destroy);


//Export the express.Router() instance
module.exports = router;