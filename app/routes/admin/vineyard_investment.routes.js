const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const vineyardInvestmentController = require('artofliving/controllers/vineyard_investment.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/vineyard_investment')) {
            fs.mkdirSync('./public/uploads/vineyard_investment');
        }
        callback(null, "./public/uploads/vineyard_investment");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/vineyard-investment*', auth.authenticate);

namedRouter.get("vineyard.investment.edit", "/vineyard-investment/edit", vineyardInvestmentController.edit);
namedRouter.post("vineyard.investment.update", '/vineyard-investment/update', uploadFile.any(), vineyardInvestmentController.update);

module.exports = router;