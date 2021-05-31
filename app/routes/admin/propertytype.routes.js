const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const propertytypeController = require('propertytype/controllers/propertytype.controller');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/propertytype");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});
const request_param = multer();

//authentication section of propertytype
namedRouter.all('/propertytype*', auth.authenticate);

// admin propertytype list route

namedRouter.post("propertytype.getall", '/propertytype/getall', async(req, res) => {
    try {
        const success = await propertytypeController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("propertytype.list", '/propertytype/list', propertytypeController.list);
namedRouter.get("propertytype.create", '/propertytype/create', propertytypeController.create);
namedRouter.post("propertytype.insert", '/propertytype/insert', uploadFile.any(), propertytypeController.insert);
namedRouter.get("propertytype.edit", '/propertytype/edit/:id', propertytypeController.edit);
namedRouter.post("propertytype.update", '/propertytype/update', uploadFile.any(), propertytypeController.update);
namedRouter.get("propertytype.delete", '/propertytype/delete/:id', propertytypeController.delete);
namedRouter.get("propertytype.statusChange", '/propertytype/status-change/:id', propertytypeController.statusChange);




//Export the express.Router() instance
module.exports = router;