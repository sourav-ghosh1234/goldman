const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const newsController = require('news/controllers/news.controller');
const multer = require('multer');
const request_param = multer();

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/news/");
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});

namedRouter.all('/news*', auth.authenticate);
namedRouter.get("news.list", '/news/list', newsController.list);
namedRouter.post("news.getall", '/news/getall', async (req, res) => {
    try {
        const success = await newsController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("news.create", '/news/create', newsController.create);
namedRouter.post("news.store", '/news/insert', uploadFile.any(), newsController.store);
namedRouter.get("news.edit", "/news/edit/:id", newsController.edit);
namedRouter.post("news.update", '/news/update', uploadFile.any(), newsController.update);
namedRouter.get("news.delete", "/news/delete/:id", newsController.delete);
namedRouter.get("news.statusChange", '/news/status-change/:id',request_param.any(), newsController.statusChange);

// Export the express.Router() instance
module.exports = router;