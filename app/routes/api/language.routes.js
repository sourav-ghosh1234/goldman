const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const languageController = require('webservice/language.controller');
const request_param = multer();


/**
 * @api {get} /language/list Language lists
 * @apiVersion 1.0.0
 * @apiGroup Language
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": [
    {
      "_id": "60c1e5d713641308a0197e2f",
      "title": "English",
      "shortcode": "en",
      "isDefault": true,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2021-06-10T10:13:43.339Z",
      "updatedAt": "2021-07-20T08:05:59.760Z",
      "__v": 0,
      "icon": "icon_1626768359665_748024_flag_kingdom_united_icon.png"
    },
    {
      "_id": "60f683db72e9c81e42af569d",
      "title": "France",
      "shortcode": "fr",
      "icon": "icon_1626768346951_748130_flag_france_icon.png",
      "isDefault": false,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2021-07-20T08:05:47.005Z",
      "updatedAt": "2021-07-20T08:05:47.005Z",
      "__v": 0
    },
    {
      "_id": "60f6bfa044546157431e2845",
      "title": "Germany",
      "shortcode": "de",
      "icon": "icon_1626783648665_748067_flag_germany_icon.png",
      "isDefault": false,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2021-07-20T12:20:48.717Z",
      "updatedAt": "2021-07-20T13:59:48.851Z",
      "__v": 0
    }
  ],
  "message": "List fetched successfully."
}
*/
namedRouter.get("api.language.list", '/language/list', async (req, res) => {
    try {
        const success = await languageController.getLanguages(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

// Export the express.Router() instance
module.exports = router;