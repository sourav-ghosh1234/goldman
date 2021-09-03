const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const propertyManagementController = require('services_content/controllers/property_management.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/property_management')) {
            fs.mkdirSync('./public/uploads/property_management');
        }
        callback(null, "./public/uploads/property_management");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/property-management*', auth.authenticate);

namedRouter.get("property.management.edit", "/property-management/edit", propertyManagementController.edit);
namedRouter.post("property.management.update", '/property-management/update', uploadFile.any(), propertyManagementController.update);

module.exports = router;