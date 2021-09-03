const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const contactinfoController = require('contactinfo/controllers/contactinfo.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'site_logo') {
			callback(null, "./public/uploads/contactinfos/sitelogo")
		} else {
			callback(null, "./public/uploads/contactinfos/sitelogo");
		}
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/contactinfo*', auth.authenticate);

/*
// @Route: contactinfo List
*/
namedRouter.get("contactinfo.listing", '/contactinfo/listing', contactinfoController.list);

namedRouter.post("contactinfo.getall", '/contactinfo/getall', async (req, res) => {
	try {
		const success = await contactinfoController.getAllData(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});

/*
// @Route: Render Edit contactinfo
*/

namedRouter.get("contactinfo.edit", "/contactinfo/edit/:id", contactinfoController.edit);


/*
// @Route: Update contactinfo Action
*/
namedRouter.post("contactinfo.update", '/contactinfo/update', request_param.any(), contactinfoController.update);


namedRouter.get("contactinfo.delete", '/contactinfo/delete/:id', contactinfoController.destroy);

namedRouter.get("contactinfo.statusChange", '/contactinfo/status-change/:id', request_param.any(), contactinfoController.changeStatus);


// Export the express.Router() instance
module.exports = router;