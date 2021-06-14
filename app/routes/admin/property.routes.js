const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const propertyController = require('property/controllers/property.controller');
//const auth = require("../../middlewares/auth")();
const fs = require('fs');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/property")) {
            fs.mkdirSync("./public/uploads/property");
            fs.mkdirSync("./public/uploads/property/thumb");
        }
        callback(null, "./public/uploads/property");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

const request_param = multer();

//authentication section of property
namedRouter.all('/property*', auth.authenticate);

// admin property list route
namedRouter.post("property.getall", '/property/getall', async(req, res) => {
    try {
        const success = await propertyController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("property.list", '/property/list', propertyController.list);
namedRouter.get("property.create", '/property/create', propertyController.create);
namedRouter.post("property.store", '/property/store', uploadFile.any(), propertyController.store);
namedRouter.get("property.edit", '/property/edit/:id', propertyController.edit);
namedRouter.get("property.delete", '/property/delete/:id', propertyController.destroy);
namedRouter.post("property.update", '/property/update', uploadFile.any(), propertyController.update);
namedRouter.get("property.statusChange", '/property/status-change/:id', uploadFile.any(), propertyController.changeStatus);

//Export the express.Router() instance
module.exports = router;