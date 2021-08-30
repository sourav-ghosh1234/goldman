const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const investmentRealtyController = require('services_content/controllers/investment_realty.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/investment_realty')) {
            fs.mkdirSync('./public/uploads/investment_realty');
        }
        callback(null, "./public/uploads/investment_realty");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/investment-realty*', auth.authenticate);

namedRouter.get("investment.realty.edit", "/investment-realty/edit", investmentRealtyController.edit);
namedRouter.post("investment.realty.update", '/investment-realty/update', uploadFile.any(), investmentRealtyController.update);

module.exports = router;