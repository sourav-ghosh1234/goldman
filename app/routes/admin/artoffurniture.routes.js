const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const artOfFurnitureController = require('artoffurniture/controllers/artoffurniture.controller');
//const auth = require("../../middlewares/auth")();
const fs = require('fs');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/artoffurniture")) {
            fs.mkdirSync("./public/uploads/artoffurniture");
            fs.mkdirSync("./public/uploads/artoffurniture/thumb");
        }
        callback(null, "./public/uploads/artoffurniture");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

const request_param = multer();

//authentication section of artoffurniture
namedRouter.all('/artoffurniture*', auth.authenticate);

// admin artoffurniture list route
namedRouter.post("artoffurniture.getall", '/artoffurniture/getall', async(req, res) => {
    try {
        const success = await artOfFurnitureController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("artoffurniture.list", '/artoffurniture/list', artOfFurnitureController.list);
namedRouter.get("artoffurniture.create", '/artoffurniture/create', artOfFurnitureController.create);
namedRouter.post("artoffurniture.store", '/artoffurniture/store', uploadFile.any(), artOfFurnitureController.store);
namedRouter.get("artoffurniture.edit", '/artoffurniture/edit/:id', artOfFurnitureController.edit);
namedRouter.get("artoffurniture.delete", '/artoffurniture/delete/:id', artOfFurnitureController.destroy);
namedRouter.post("artoffurniture.update", '/artoffurniture/update', uploadFile.any(), artOfFurnitureController.update);
namedRouter.get("artoffurniture.statusChange", '/artoffurniture/status-change/:id', uploadFile.any(), artOfFurnitureController.changeStatus);

//Export the express.Router() instance
module.exports = router;