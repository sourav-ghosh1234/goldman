const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const countryController = require('country/controllers/country.controller');
//const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of country
namedRouter.all('/country*', auth.authenticate);

// admin country list route
namedRouter.post("country.getall", '/country/getall', async (req, res) => {
	try {
		const success = await countryController.getAll(req, res);
		res.send({"meta": success.meta, "data": success.data});
	}
	catch (error) {
		res.status(error.status).send(error);
	}
});
namedRouter.get("country.list", '/country/list',countryController.list);
namedRouter.get("country.create", '/country/create', countryController.create);
namedRouter.post("country.store", '/country/store', request_param.any(),countryController.store);
namedRouter.get("country.edit", '/country/edit/:id',countryController.edit);
namedRouter.get("country.delete", '/country/delete/:id',countryController.destroy);
namedRouter.post("country.update", '/country/update',request_param.any(),countryController.update);
namedRouter.get("country.statusChange", '/country/status-change/:id', request_param.any(),countryController.changeStatus);

//Export the express.Router() instance
module.exports = router;