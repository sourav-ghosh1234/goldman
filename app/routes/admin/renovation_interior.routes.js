const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const renovationInteriorController = require('services_content/controllers/renovation_interior.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/renovation_interior')) {
            fs.mkdirSync('./public/uploads/renovation_interior');
        }
        callback(null, "./public/uploads/renovation_interior");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/renovation-interior*', auth.authenticate);

namedRouter.get("renovation.interior.edit", "/renovation-interior/edit", renovationInteriorController.edit);
namedRouter.post("renovation.interior.update", '/renovation-interior/update', uploadFile.any(), renovationInteriorController.update);

module.exports = router;