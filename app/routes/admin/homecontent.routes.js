const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const homecontentController = require('homecontent/controllers/homecontent.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/homecontent')) {
            fs.mkdirSync('./public/uploads/homecontent');
        }
        callback(null, "./public/uploads/homecontent");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/homecontent*', auth.authenticate);

namedRouter.get("homecontent.edit", "/homecontent/edit", homecontentController.edit);
namedRouter.post("homecontent.update", '/homecontent/update', uploadFile.any(), homecontentController.update);

module.exports = router;