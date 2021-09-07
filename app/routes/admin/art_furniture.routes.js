const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const art_furnitureController = require('art_furniture/controllers/art_furniture.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/art_furniture')) {
            fs.mkdirSync('./public/uploads/art_furniture');
        }
        callback(null, "./public/uploads/art_furniture");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/art_furniture*', auth.authenticate);

namedRouter.get("art_furniture.edit", "/art_furniture/edit", art_furnitureController.edit);
namedRouter.post("art_furniture.update", '/art_furniture/update', uploadFile.any(), art_furnitureController.update);

module.exports = router;