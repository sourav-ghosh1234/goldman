const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const languageController = require('language/controllers/language.controller');
//const auth = require("../../middlewares/auth")();

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/language')) {
            fs.mkdirSync('./public/uploads/language');
        }
        callback(null, "./public/uploads/language");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

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
namedRouter.post("language.store", '/language/store', uploadFile.any(), languageController.store);
namedRouter.get("language.edit", '/language/edit/:id', languageController.edit);
namedRouter.get("language.delete", '/language/delete/:id', languageController.destroy);
namedRouter.post("language.update", '/language/update', uploadFile.any(), languageController.update);
namedRouter.get("language.statusChange", '/language/status-change/:id', request_param.any(), languageController.changeStatus);

//Export the express.Router() instance
module.exports = router;