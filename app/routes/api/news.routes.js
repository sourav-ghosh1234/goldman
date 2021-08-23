const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const newsController = require('webservice/news.controller');
const request_param = multer();


/**
 * @api {get} /news News All
 * @apiVersion 1.0.0
 * @apiGroup News
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": [
    {
      "title": "GOLDMAN PRESTIGE Magazine (Spring-Summer 2021)",
      "content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of</p>\r\n",
      "author_name": "GOLDMAN PRESTIGE",
      "date": "05/05/2021",
      "image": "1627560158796_7682_1.png",
      "isDeleted": false,
      "status": "Active",
      "_id": "60ffc53ad0e6c234cc04b4ba",
      "createdAt": "2021-07-27T08:35:06.342Z",
      "updatedAt": "2021-07-29T12:02:39.430Z"
    },
    {
      "title": "Test News",
      "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
      "author_name": "John Doe",
      "date": "03/07/2021",
      "image": "1627560241094_contact.png",
      "isDeleted": false,
      "status": "Active",
      "_id": "610299314f7ee46eab53a83f",
      "createdAt": "2021-07-29T12:04:01.331Z",
      "updatedAt": "2021-07-29T13:39:53.961Z"
    }
  ],
  "message": "News fetched successfully."
}
*/
namedRouter.get("api.news", '/news', async (req, res) => {
    try {
        const success = await newsController.getAll(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /news/:id News Details
 * @apiVersion 1.0.0
 * @apiGroup News
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "60ffc53ad0e6c234cc04b4ba",
    "title": "GOLDMAN PRESTIGE Magazine (Spring-Summer 2021)",
    "content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of</p>\r\n",
    "author_name": "GOLDMAN PRESTIGE",
    "date": "05/05/2021",
    "image": "1627560158796_7682_1.png",
    "isDeleted": false,
    "status": "Active",
    "createdAt": "2021-07-27T08:35:06.342Z",
    "updatedAt": "2021-07-29T12:02:39.430Z"
  },
  "message": "News fetched successfully."
}
*/

namedRouter.get("api.news.details", '/news/:id', async (req, res) => {
    try {
        const success = await newsController.detail(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// Export the express.Router() instance
module.exports = router;