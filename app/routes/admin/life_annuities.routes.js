const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const lifeAnnuitiesController = require('services_content/controllers/life_annuities.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/life_annuities')) {
            fs.mkdirSync('./public/uploads/life_annuities');
        }
        callback(null, "./public/uploads/life_annuities");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/life-annuities*', auth.authenticate);

namedRouter.get("life.annuities.edit", "/life-annuities/edit", lifeAnnuitiesController.edit);
namedRouter.post("life.annuities.update", '/life-annuities/update', uploadFile.any(), lifeAnnuitiesController.update);

module.exports = router;