const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const contactusController = require('contactus/controllers/contactus.controller');
//const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of contactus
namedRouter.all('/contactus*', auth.authenticate);

// admin contactus list route
namedRouter.post("contactus.getall", '/contactus/getall', async(req, res) => {
    try {
        const success = await contactusController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("contactus.list", '/contactus/list', contactusController.list);
namedRouter.get("contactus.create", '/contactus/create', contactusController.create);
namedRouter.post("contactus.store", '/contactus/store', request_param.any(), contactusController.store);
namedRouter.get("contactus.edit", '/contactus/edit/:id', contactusController.edit);
namedRouter.get("contactus.delete", '/contactus/delete/:id', contactusController.destroy);
namedRouter.post("contactus.update", '/contactus/update', request_param.any(), contactusController.update);
namedRouter.get("contactus.statusChange", '/contactus/status-change/:id', request_param.any(), contactusController.changeStatus);

namedRouter.get("contactcontent.edit", "/contactus/content-edit", contactusController.editContent);
namedRouter.post("contactcontent.update", '/contactus/content-update', request_param.any(), contactusController.updateContent);

//Export the express.Router() instance
module.exports = router;