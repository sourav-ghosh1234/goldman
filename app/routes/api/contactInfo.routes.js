const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const contactInfoController = require('webservice/contactInfo.controller');
const multer = require('multer');
const request_param = multer();

/**
 * @api {post} /contact-info/save Store
 * @apiVersion 1.0.0
 * @apiGroup Contact Info
 * @apiParam {string} isFirstVisit First Visit ["Yes","No"]
 * @apiParam {string} isAlreadyClient Already Client ["Yes","No"]
 * @apiParam {string} prefix Prefix ["Mr","Mrs"]
 * @apiParam {string} first_name User First Name
 * @apiParam {string} last_name User Last Name
 * @apiParam {string} email User Email
 * @apiParam {string} phone_number User Phone
 * @apiParam {string} phone_code Phone Code
 * @apiParam {string} want_to_do want To Do
 * @apiParam {string} message User Message
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "isFirstVisit": "Yes",
        "isAlreadyClient": "No",
        "prefix": "Mr",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@yopmail.com",
        "code": "+91",
        "phone": "2185784124",
        "want_to_do": "Test",
        "message": "Test",
        "status": "Active",
        "isDeleted": false,
        "_id": "6132229fa90257e8824f2529",
        "__v": 0
    },
    "message": "Thank you for contacting us."
}
*/
namedRouter.post("api.contact-info.save", '/contact-info/save', request_param.any(), async (req, res) => {
    try {
        const success = await contactInfoController.save(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// Export the express.Router() instance
module.exports = router;