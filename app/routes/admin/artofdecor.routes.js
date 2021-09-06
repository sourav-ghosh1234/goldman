const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const artofdecorController = require('artofdecor/controllers/artofdecor.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/artofdecor')) {
            fs.mkdirSync('./public/uploads/artofdecor');
        }
        callback(null, "./public/uploads/artofdecor");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

const request_param = multer();

namedRouter.all('/artofdecor*', auth.authenticate);

namedRouter.get("artofdecor.edit", "/artofdecor/edit", artofdecorController.edit);
namedRouter.post("artofdecor.update", '/artofdecor/update', uploadFile.any(), artofdecorController.update);


module.exports = router;