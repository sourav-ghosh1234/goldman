const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const permissionController = require('permission/controllers/permission.controller');
// const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of permission
namedRouter.all('/permission*', auth.authenticate);

// admin permission list route
namedRouter.get("admin.permission.edit", '/permission/edit/:id',permissionController.edit);
namedRouter.post("admin.permission.update", '/permission/update',request_param.any(),permissionController.update);


//Export the express.Router() instance
module.exports = router;