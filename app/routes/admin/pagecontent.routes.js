const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const pagecontentController = require('pagecontent/controllers/pagecontent.controller');
//const auth = require("../../middlewares/auth")();
const fs = require('fs');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/pagecontent")) {
            fs.mkdirSync("./public/uploads/pagecontent");
        }
        callback(null, "./public/uploads/pagecontent");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

const request_param = multer();

//authentication section of pagecontent
namedRouter.all('/pagecontent*', auth.authenticate);

// admin pagecontent list route
namedRouter.post("pagecontent.getall", '/pagecontent/getall', async(req, res) => {
    try {
        const success = await pagecontentController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("pagecontent.list", '/pagecontent/list', pagecontentController.list);
namedRouter.get("pagecontent.create", '/pagecontent/create', pagecontentController.create);
namedRouter.post("pagecontent.store", '/pagecontent/store', uploadFile.any(), pagecontentController.store);
namedRouter.get("pagecontent.edit", '/pagecontent/edit/:id', pagecontentController.edit);
namedRouter.get("pagecontent.delete", '/pagecontent/delete/:id', pagecontentController.destroy);
namedRouter.post("pagecontent.update", '/pagecontent/update', uploadFile.any(), pagecontentController.update);
namedRouter.get("pagecontent.statusChange", '/pagecontent/status-change/:id', uploadFile.any(), pagecontentController.changeStatus);

//Export the express.Router() instance
module.exports = router;