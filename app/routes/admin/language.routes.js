const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const languageController = require('language/controllers/language.controller');
//const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of language
namedRouter.all('/language*', auth.authenticate);

// admin language list route
namedRouter.post("language.getall", '/language/getall', async(req, res) => {
    try {
        const success = await languageController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("language.list", '/language/list', languageController.list);
namedRouter.get("language.create", '/language/create', languageController.create);
namedRouter.post("language.store", '/language/store', request_param.any(), languageController.store);
namedRouter.get("language.edit", '/language/edit/:id', languageController.edit);
namedRouter.get("language.delete", '/language/delete/:id', languageController.destroy);
namedRouter.post("language.update", '/language/update', request_param.any(), languageController.update);
namedRouter.get("language.statusChange", '/language/status-change/:id', request_param.any(), languageController.changeStatus);

//Export the express.Router() instance
module.exports = router;