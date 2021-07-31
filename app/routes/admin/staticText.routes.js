const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const staticTextController = require('staticText/controllers/staticText.controller');
const multer = require('multer');
const request_param = multer();

//authentication section of staticText
namedRouter.all('/staticText*', auth.authenticate);

namedRouter.get("staticText.edit", '/staticText/edit', staticTextController.edit);

namedRouter.post("staticText.update", '/staticText/update', request_param.any(), staticTextController.update);




//Export the express.Router() instance
module.exports = router;