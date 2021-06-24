const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const adminuserController = require('adminuser/controllers/adminuser.controller');
const fs = require('fs');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (!fs.existsSync("./public/uploads/adminuser")) {
			fs.mkdirSync("./public/uploads/adminuser");
		}
		callback(null, "./public/uploads/adminuser");
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/adminuser*', auth.authenticate);

namedRouter.get("adminuser.listing", '/adminuser/listing', adminuserController.list);

// Get All adminusers
namedRouter.post("adminuser.getall", '/adminuser/getall', async (req, res) => {
	try {
		const success = await adminuserController.getAll(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});

namedRouter.get("adminuser.create", '/adminuser/create', adminuserController.create);

namedRouter.post("adminuser.insert", '/adminuser/insert', uploadFile.any(), adminuserController.insert);

// adminuser Edit Route
namedRouter.get("adminuser.edit", "/adminuser/edit/:id", adminuserController.edit);

// adminuser Update Route
namedRouter.post("adminuser.update", '/adminuser/update', uploadFile.any(), adminuserController.update);

// adminuser Delete Route
namedRouter.get("adminuser.delete", "/adminuser/delete/:id", adminuserController.delete);

namedRouter.get("adminuser.statusChange", '/adminuser/status-change/:id', request_param.any(), adminuserController.statusChange);

// Export the express.Router() instance
module.exports = router;