const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const artController = require('art/controllers/art.controller');
//const auth = require("../../middlewares/auth")();
const fs = require('fs');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/art")) {
            fs.mkdirSync("./public/uploads/art");
            fs.mkdirSync("./public/uploads/art/thumb");
        }
        callback(null, "./public/uploads/art");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

const request_param = multer();

//authentication section of art
namedRouter.all('/art*', auth.authenticate);

// admin art list route
namedRouter.post("art.getall", '/art/getall', async (req, res) => {
	try {
		const success = await artController.getAll(req, res);
		res.send({"meta": success.meta, "data": success.data});
	}
	catch (error) {
		res.status(error.status).send(error);
	}
});
namedRouter.get("art.list", '/art/list',artController.list);
namedRouter.get("art.create", '/art/create', artController.create);
namedRouter.post("art.store", '/art/store', uploadFile.any(),artController.store);
namedRouter.get("art.edit", '/art/edit/:id',artController.edit);
namedRouter.get("art.delete", '/art/delete/:id',artController.destroy);
namedRouter.post("art.update", '/art/update',uploadFile.any(),artController.update);
namedRouter.get("art.statusChange", '/art/status-change/:id', uploadFile.any(),artController.changeStatus);

//Export the express.Router() instance
module.exports = router;