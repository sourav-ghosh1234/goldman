const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const realEstateController = require('webservice/real_estate.controller');
const request_param = multer();





/**
 * @api {get} /real-estate/content Real Estate Content
 * @apiVersion 1.0.0
 * @apiGroup Real Estate
 * @apiParam { string } type Type [buy, rent, sale]
 * @apiParam { string } cityId City Id [Default: '']
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "_id": "6139bbf80caa6b370c0eaa93",
        "title": "Test",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "language": "en",
        "isDeleted": false,
        "status": "Active",
        "cityId": "60c73b101257932fd09232f2",
        "translate": [
            {
                "language": "fr",
                "title": "BUY CONTENT FR",
                "description": "<p>FR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&nbsp;</p>\r\n",
                "_id": "613a1afc9cf62660bf39a153"
            }
        ],
        "createdAt": "2021-09-09T07:47:04.099Z",
        "updatedAt": "2021-09-09T14:32:28.686Z",
        "__v": 0
    },
    "message": "Records fetched successfully."
}
*/
namedRouter.post("api.real-estate.content", '/real-estate/content', request_param.any(), async (req, res) => {
    try {
        const success = await realEstateController.realEstateContent(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

// Export the express.Router() instance
module.exports = router;