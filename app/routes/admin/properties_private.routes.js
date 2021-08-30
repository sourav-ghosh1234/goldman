const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const propertiesPrivateController = require('services_content/controllers/properties_private.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/properties_private')) {
            fs.mkdirSync('./public/uploads/properties_private');
        }
        callback(null, "./public/uploads/properties_private");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/properties-private*', auth.authenticate);

namedRouter.get("properties.private.edit", "/properties-private/edit", propertiesPrivateController.edit);
namedRouter.post("properties.private.update", '/properties-private/update', uploadFile.any(), propertiesPrivateController.update);

module.exports = router;