const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const artoflivingController = require('artofliving/controllers/artofliving.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/artofliving')) {
            fs.mkdirSync('./public/uploads/artofliving');
        }
        callback(null, "./public/uploads/artofliving");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/artofliving*', auth.authenticate);

namedRouter.get("artofliving.edit", "/artofliving/edit", artoflivingController.edit);
namedRouter.post("artofliving.update", '/artofliving/update', uploadFile.any(), artoflivingController.update);

module.exports = router;