const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const estatetypeController = require('estatetype/controllers/estatetype.controller');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/estatetype");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});
const request_param = multer();

//authentication section of estatetype
namedRouter.all('/estatetype*', auth.authenticate);

// admin estatetype list route

namedRouter.post("estatetype.getall", '/estatetype/getall', async(req, res) => {
    try {
        const success = await estatetypeController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("estatetype.list", '/estatetype/list', estatetypeController.list);
namedRouter.get("estatetype.create", '/estatetype/create', estatetypeController.create);
namedRouter.post("estatetype.insert", '/estatetype/insert', uploadFile.any(), estatetypeController.insert);
namedRouter.get("estatetype.edit", '/estatetype/edit/:id', estatetypeController.edit);
namedRouter.post("estatetype.update", '/estatetype/update', uploadFile.any(), estatetypeController.update);
namedRouter.get("estatetype.delete", '/estatetype/delete/:id', estatetypeController.delete);
namedRouter.get("estatetype.statusChange", '/estatetype/status-change/:id', estatetypeController.statusChange);




//Export the express.Router() instance
module.exports = router;