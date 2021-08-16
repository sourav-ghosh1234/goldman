const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const countryEstateController = require('artofliving/controllers/country_estate.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/country_estate')) {
            fs.mkdirSync('./public/uploads/country_estate');
        }
        callback(null, "./public/uploads/country_estate");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/countryestate*', auth.authenticate);

namedRouter.get("countryestate.edit", "/countryestate/edit", countryEstateController.edit);
namedRouter.post("countryestate.update", '/countryestate/update', uploadFile.any(), countryEstateController.update);

module.exports = router;