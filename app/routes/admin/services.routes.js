const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const servicesController = require('services/controllers/services.controller');
//const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of services
namedRouter.all('/services*', auth.authenticate);

// admin services list route
namedRouter.post("services.getall", '/services/getall', async (req, res) => {
	try {
		const success = await servicesController.getAll(req, res);
		res.send({"meta": success.meta, "data": success.data});
	}
	catch (error) {
		res.status(error.status).send(error);
	}
});
namedRouter.get("services.list", '/services/list',servicesController.list);
namedRouter.get("services.create", '/services/create', servicesController.create);
namedRouter.post("services.store", '/services/store', request_param.any(),servicesController.store);
namedRouter.get("services.edit", '/services/edit/:id',servicesController.edit);
namedRouter.get("services.delete", '/services/delete/:id',servicesController.destroy);
namedRouter.post("services.update", '/services/update',request_param.any(),servicesController.update);
namedRouter.get("services.statusChange", '/services/status-change/:id', request_param.any(),servicesController.changeStatus);

//Export the express.Router() instance
module.exports = router;