const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const artdecorController = require('art_decor/controllers/art_decor.controller');
//const auth = require("../../middlewares/auth")();
const fs = require('fs');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/artdecor")) {
            fs.mkdirSync("./public/uploads/artdecor");
            fs.mkdirSync("./public/uploads/artdecor/thumb");
        }
        callback(null, "./public/uploads/artdecor");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

const request_param = multer();

//authentication section of artdecor
namedRouter.all('/art-decor*', auth.authenticate);

// admin artdecor list route
namedRouter.post("art-decor.getall", '/art-decor/getall', async(req, res) => {
    try {
        const success = await artdecorController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("art-decor.list", '/art-decor/list', artdecorController.list);
namedRouter.get("art-decor.create", '/art-decor/create', artdecorController.create);
namedRouter.post("art-decor.store", '/art-decor/store', uploadFile.any(), artdecorController.store);
namedRouter.get("art-decor.edit", '/art-decor/edit/:id', artdecorController.edit);
namedRouter.get("art-decor.delete", '/art-decor/delete/:id', artdecorController.destroy);
namedRouter.post("art-decor.update", '/art-decor/update', uploadFile.any(), artdecorController.update);
namedRouter.get("art-decor.statusChange", '/art-decor/status-change/:id', uploadFile.any(), artdecorController.changeStatus);

//Export the express.Router() instance
module.exports = router;