const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const propertyContentController = require('property_content/controllers/property_content.controller');
//const auth = require("../../middlewares/auth")();
const fs = require('fs');

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/propertyContent")) {
            fs.mkdirSync("./public/uploads/propertyContent");
            fs.mkdirSync("./public/uploads/propertyContent/thumb");
        }
        callback(null, "./public/uploads/propertyContent");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

const request_param = multer();

//authentication section of propertyContent
namedRouter.all('/property-content*', auth.authenticate);


namedRouter.get("property-content.edit", '/property-content/edit', propertyContentController.edit);
namedRouter.post("property-content.update", '/property-content/update', uploadFile.any(), propertyContentController.update);

//Export the express.Router() instance
module.exports = router;