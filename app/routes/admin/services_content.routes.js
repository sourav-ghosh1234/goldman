const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const servicesContentController = require('services_content/controllers/services_content.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/services_content')) {
            fs.mkdirSync('./public/uploads/services_content');
        }
        callback(null, "./public/uploads/services_content");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/services-content*', auth.authenticate);

namedRouter.get("services.content.edit", "/services-content/edit", servicesContentController.edit);
namedRouter.post("services.content.update", '/services-content/update', uploadFile.any(), servicesContentController.update);

module.exports = router;