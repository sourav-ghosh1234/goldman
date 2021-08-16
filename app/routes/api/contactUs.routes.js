const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const contactUsController = require('webservice/contactUs.controller');
const multer = require('multer');
const request_param = multer();



/**
 * @api {post} /contact-us/save Store
 * @apiVersion 1.0.0
 * @apiGroup Contact Us
 * @apiParam {string} name User Name
 * @apiParam {string} email User Email
 * @apiParam {string} phone User Phone
 * @apiParam {string} message User Message
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "name": "Subrata",
        "email": "subrata007@yopmail.com",
        "phone": "1234567890",
        "message": "This is test message for contact us api",
        "status": "Active",
        "isDeleted": false,
        "_id": "611a5e17c901c6d4155dcdb8",
        "createdAt": "2021-08-16T12:46:15.572Z",
        "updatedAt": "2021-08-16T12:46:15.572Z",
        "__v": 0
    },
    "message": "Thank you for contacting us."
}
*/
namedRouter.post("api.contactus.list", '/contact-us/save', request_param.any(), async(req, res) => {
    try {
        const success = await contactUsController.save(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// Export the express.Router() instance
module.exports = router;