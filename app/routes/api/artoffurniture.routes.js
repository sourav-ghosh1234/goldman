const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const artOfFurnitureController = require('webservice/artoffurniture.controller');
const request_param = multer();


/**
 * @api {post} /art-of-furniture/list Art Of Furniture List
 * @apiVersion 1.0.0
 * @apiGroup Art Of Furniture
 * @apiParam {number} page Page
 * @apiParam {number} limit Limit
 * @apiParam {string} slug Category Slug [living-room, bedroom, dining-room, ourdoor, house-of-europe]
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "6137569300734a6b6a253cbe",
            "title": "New Service",
            "company_name": "New Service",
            "category": "613722cb87378713e2306bf5",
            "price": 4532,
            "dimensions": "New Service",
            "colour": "New Service",
            "description": "New Service",
            "image": "1631022949632_Desktop-free-building-wallpaper.jpg",
            "imageGallery": [
                "1631016595849_business-structure-which-type-is-best-for-your-business.png",
                "1631022949660_KLK-IMAGES-826x550-Hunting.jpg"
            ],
            "language": "en",
            "status": "Active",
            "isDeleted": false,
            "translate": [
                {
                    "title": "Test 5 FR",
                    "description": "<p>Test 5 FR</p>\r\n",
                    "company_name": "Test 5 FR",
                    "language": "fr",
                    "_id": "613772b4c3e7be8d2f667dcc"
                }
            ],
            "createdAt": "2021-09-07T12:09:55.910Z",
            "__v": 0,
            "categoryDetails": {
                "_id": "613722cb87378713e2306bf5",
                "name": "Ourdoor",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2019-04-15T08:24:40.827Z",
                "updatedAt": "2020-10-21T14:05:01.039Z",
                "slug": "ourdoor"
            }
        }
    ],
    "pageCount": 1,
    "totalCount": 1,
    "message": "Art Of Furniture fetched successfully."
}
*/
namedRouter.post("api.art-of-furniture.list", '/art-of-furniture/list', async (req, res) => {
    try {
        const success = await artOfFurnitureController.getArtFurnitureList(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /art-of-furniture/details/:id Art Of Furniture Details By id
 * @apiVersion 1.0.0
 * @apiGroup Art Of Furniture
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [
        {
            "_id": "613755ea00734a6b6a253c9e",
            "title": "Test",
            "company_name": "Test",
            "category": "613722a887378713e2306bf4",
            "price": 4432,
            "dimensions": "Test",
            "colour": "Test",
            "description": "Test",
            "image": "1631029637402_03_Marina.jpg",
            "imageGallery": [
                "1631016426466_shutterstock.png",
                "1631016426506_03_Marina.jpg"
            ],
            "language": "en",
            "status": "Active",
            "isDeleted": false,
            "translate": [
                {
                    "title": "Test FR",
                    "description": "<p>Test FR</p>\r\n",
                    "company_name": "Test FR",
                    "language": "fr",
                    "_id": "613789855ccd54a236d94a96"
                }
            ],
            "createdAt": "2021-09-07T12:07:06.610Z",
            "__v": 0,
            "categoryDetails": {
                "_id": "613722a887378713e2306bf4",
                "name": "Dining room",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2019-04-15T08:24:40.827Z",
                "updatedAt": "2020-10-21T14:05:01.039Z",
                "slug": "dining-room"
            }
        }
    ],
    "message": "Art Of Furniture fetched successfully."
}
 **/
namedRouter.get("api.art-of-furniture.details", '/art-of-furniture/details/:id', request_param.any(), async (req, res) => {
    try {
        const success = await artOfFurnitureController.getArtFurnitureDetails(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// Export the express.Router() instance
module.exports = router;