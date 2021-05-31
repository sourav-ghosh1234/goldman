const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const notificationController = require('notification/controllers/notification.controller');
const request_param = multer();
namedRouter.all('/notification*', auth.authenticate);

namedRouter.post("notification.getall", '/notification/getall', async (req, res) => {
    try {
        const success = await notificationController.getAll(req, res);
        res.send({"meta": success.meta, "data": success.data});
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("notification.list", '/notification/list', notificationController.list);
namedRouter.get("notification.create", '/notification/create', notificationController.create);
namedRouter.post("notification.insert", '/notification/insert', request_param.any(), notificationController.insert);
namedRouter.get("notification.edit", '/notification/edit/:id', notificationController.edit);
namedRouter.post("notification.update", '/notification/update', request_param.any(), notificationController.update);
namedRouter.get("notification.statusChange", '/notification/status-change/:id', request_param.any(), notificationController.statusChange);

//Export the express.Router() instance
module.exports = router;