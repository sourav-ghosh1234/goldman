const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const contactController = require('webservice/contact.controller');
const request_param = multer();


/**
 * @api {get} /contact/content Contact Content
 * @apiVersion 1.0.0
 * @apiGroup Contact
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": [
    {
      "contact_one": {
        "heading": "Goldman Prestige Art Advisory",
        "address": "47 South Cleveland Dr.South El Monte, CA 91733",
        "phone": "+033 1245-6790"
      },
      "contact_two": {
        "heading": "Goldman Prestige Art Advisory",
        "address": "47 South Cleveland Dr.South El Monte, CA 91733",
        "phone": "+033 1245-6790"
      },
      "contact_three": {
        "heading": "Goldman Prestige Art Advisory",
        "address": "47 South Cleveland Dr.South El Monte, CA 91733",
        "phone": "+033 1245-6790"
      },
      "contact_four": {
        "heading": "Goldman Prestige Art Advisory",
        "address": "47 South Cleveland Dr.South El Monte, CA 91733",
        "phone": "+033 1245-6790"
      },
      "heading": "An Integrated Network",
      "address": "47 South Cleveland Dr.South El Monte, CA 91733",
      "subHeading": "Lorem Ipsum Has Been The Industry's Standard",
      "_id": "610d61d71edb21accf6cd9e3",
      "translate": [
        {
          "contact_one": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "contact_two": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "contact_three": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "contact_four": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "language": "fr",
          "heading": "An Integrated Network FR",
          "address": "",
          "subHeading": "",
          "_id": "610d72f3da2f247b9d23fe4d"
        },
        {
          "contact_one": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "contact_two": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "contact_three": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "contact_four": {
            "heading": "",
            "address": "",
            "phone": ""
          },
          "language": "de",
          "heading": "DE Test",
          "address": "",
          "subHeading": "DE Here",
          "_id": "610d72f3da2f247b9d23fe4e"
        }
      ],
      "updatedAt": "2021-08-06T17:35:47.714Z"
    }
  ],
  "message": "Text fetched successfully."
}
*/
namedRouter.get("api.contact.statictext", '/contact/content', async (req, res) => {
    try {
        const success = await contactController.getContactContent(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /contact/save store contact us
 * @apiVersion 1.0.0
 * @apiGroup Contact
 * @apiParam {String} subject Subject
 * @apiParam {String} full_name Full Name
 * @apiParam {String} company Company
 * @apiParam {String} phone Phone Number
 * @apiParam {String} email Email
 * @apiParam {String} message Message
 * @apiParam {String} how_did_you_find How Did You Find
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "subject": "test",
        "full_name": "Alokozay",
        "company": "Alokozay",
        "phone": "986655553",
        "email": "abc@gmail.com",
        "message": "hello",
        "how_did_you_find": "option1",
        "isDeleted": false,
        "status": "Active",
        "_id": "5da5d1b6c37c7a7a041d5145",
        "createdAt": "2019-10-15T14:03:34.348Z",
        "__v": 0
    },
    "message": "Form Submitted and Email Send Successfully."
}
*/
namedRouter.post("api.contact.form.save", '/contact/save',request_param.any(), async (req, res) => {
    try {
        const success = await contactController.contactSave(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// Export the express.Router() instance
module.exports = router;