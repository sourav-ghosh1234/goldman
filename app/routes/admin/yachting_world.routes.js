const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const fs = require('fs');
const yachtingWorldController = require('artofliving/controllers/yachting_world.controller');
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        if (!fs.existsSync('./public/uploads/yachting_world')) {
            fs.mkdirSync('./public/uploads/yachting_world');
        }
        callback(null, "./public/uploads/yachting_world");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });


const request_param = multer();

namedRouter.all('/yachting-world*', auth.authenticate);

namedRouter.get("yachting.world.edit", "/yachting-world/edit", yachtingWorldController.edit);
namedRouter.post("yachting.world.update", '/yachting-world/update', uploadFile.any(), yachtingWorldController.update);
namedRouter.post("yachting.world.boat.charter.getall", '/yachting-world/boat-charter-getall', async (req, res) => {
    try {
        const success = await yachtingWorldController.getAllBoatCharter(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("yachting.world.boat.charter.list", '/yachting-world/boat-charter-list', yachtingWorldController.BoatCharterlist);
namedRouter.get("yachting.world.boat.charter.create", '/yachting-world/boat-charter-create', yachtingWorldController.createBoatCharter);
namedRouter.post("yachting.world.boat.charter.store", '/yachting-world/boat-charter-store', uploadFile.any(), yachtingWorldController.storeBoatCharter);
namedRouter.get("yachting.world.boat.charter.edit", '/yachting-world/boat-charter-edit/:id', yachtingWorldController.editBoatCharter);
namedRouter.post("yachting.world.boat.charter.update", '/yachting-world/boat-charter-update', uploadFile.any(), yachtingWorldController.updateBoatCharter);
namedRouter.get("yachting.world.boat.charter.statusChange", '/yachting-world/boat-charter-status-change/:id', yachtingWorldController.statusChangeBoatCharter);
namedRouter.get("yachting.world.boat.charter.delete", '/yachting-world/boat-charter-delete/:id', yachtingWorldController.destroyBoatCharter);

module.exports = router;