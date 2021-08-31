const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const agentController = require('agent/controllers/agent.controller');

const multer = require('multer');
const fs = require('fs');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./public/uploads/user/profile_pic")) {
            fs.mkdirSync("./public/uploads/user/profile_pic");
        }
        callback(null, "./public/uploads/user/profile_pic");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});
const request_param = multer();

//authentication section of agent
namedRouter.all('/agent*', auth.authenticate);

// admin agent list route

namedRouter.post("agent.getall", '/agent/getall', async(req, res) => {
    try {
        const success = await agentController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("agent.listing", '/agent/listing', agentController.list);
namedRouter.get("agent.create", '/agent/create', agentController.create);
namedRouter.post("agent.insert", '/agent/insert', uploadFile.any(), agentController.insert);
namedRouter.get("agent.edit", '/agent/edit/:id', agentController.edit);
namedRouter.post("agent.update", '/agent/update', uploadFile.any(), agentController.update);
namedRouter.get("agent.delete", '/agent/delete/:id', agentController.delete);
namedRouter.get("agent.statusChange", '/agent/status-change/:id', agentController.statusChange);



//Export the express.Router() instance
module.exports = router;