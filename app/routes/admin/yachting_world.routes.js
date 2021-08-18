const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const yachtingWorldController = require('artofliving/controllers/yachting_world.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/yachting_world')) {
            fs.mkdirSync('./public/uploads/yachting_world');
        }
        callback(null, "./public/uploads/yachting_world");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/yachting-world*', auth.authenticate);

namedRouter.get("yachting.world.edit", "/yachting-world/edit", yachtingWorldController.edit);
namedRouter.post("yachting.world.update", '/yachting-world/update', uploadFile.any(), yachtingWorldController.update);

module.exports = router;