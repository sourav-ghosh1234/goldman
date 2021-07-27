const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const menuController = require('menu/controllers/menu.controller');
const multer = require('multer');
const request_param = multer();


//authentication section of menu
namedRouter.all('/menu*', auth.authenticate);

// admin menu list route

namedRouter.post("menu.getall", '/menu/getall', async (req, res) => {
    try {
        const success = await menuController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("menu.list", '/menu/list', menuController.list);
namedRouter.get("menu.edit", '/menu/edit/:id', menuController.edit);
namedRouter.get("menu.delete", '/menu/delete/:id', menuController.destroy);
namedRouter.post("menu.update", '/menu/update', request_param.any(), menuController.update);
namedRouter.post("menu.statusChange", '/menu/status-change', request_param.any(), menuController.statusChange);




//Export the express.Router() instance
module.exports = router;