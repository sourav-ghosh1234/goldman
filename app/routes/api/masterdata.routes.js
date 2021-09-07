const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const masterController = require('webservice/masterdata.controller');
const request_param = multer();


/**
 * @api {get} /city/list City List
 * @apiVersion 1.0.0
 * @apiGroup Master
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "60c73b101257932fd09232f2",
            "city": "Adelaide",
            "status": "Active",
            "isDeleted": false,
            "countryId": {
                "_id": "60b4fd33b86e3eca18590369",
                "country_name": "Australia",
                "code": "",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2021-05-31T15:13:55.131Z",
                "__v": 0
            },
            "createdAt": "2021-06-14T11:18:40.981Z",
            "__v": 0
        }
    ],
    "message": "City fetched successfully."
}
*/
namedRouter.get("api.city.list", '/city/list', async (req, res) => {
    try {
        const success = await masterController.cityData(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /country/list Country List
 * @apiVersion 1.0.0
 * @apiGroup Master
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "60b4f7a3026424da73e8aba4",
            "code": "+1",
            "country_name": "Japan",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2019-04-15T08:24:40.827Z",
            "updatedAt": "2020-10-22T06:14:39.804Z"
        }
    ],
    "message": "Country fetched successfully."
}
*/
namedRouter.get("api.country.list", '/country/list', async (req, res) => {
    try {
        const success = await masterController.countryData(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});



/**
 * @api {get} /property-type/list Property Type List
 * @apiVersion 1.0.0
 * @apiGroup Master
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Apartment and unit",
            "description": "Apartment and unit",
            "language": "en",
            "isDeleted": false,
            "status": "Active",
            "_id": "60b50317d506b6d2142eabdf",
            "translate": [
                {
                    "title": "Apartment FR",
                    "description": "Apartment FR",
                    "language": "fr",
                    "_id": "61238364c0b2e90c8393986c"
                },
                {
                    "title": "Apartment DE",
                    "description": "Apartment DE",
                    "language": "de",
                    "_id": "61238364c0b2e90c8393986d"
                }
            ],
            "__v": 0,
            "updatedAt": "2021-08-23T11:15:48.659Z"
        }
    ],
    "message": "Property Type fetched successfully."
}
*/
namedRouter.get("api.property-type.list", '/property-type/list', async (req, res) => {
    try {
        const success = await masterController.propertyTypeData(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /characteristic/list Characteristic List
 * @apiVersion 1.0.0
 * @apiGroup Master
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "description": "Parkview",
            "language": "en",
            "isDeleted": false,
            "status": "Active",
            "_id": "612388e0c0b2e90c8393988a",
            "title": "Parkview",
            "translate": [
                {
                    "title": "",
                    "description": "",
                    "language": "fr",
                    "_id": "612388e0c0b2e90c8393988b"
                },
                {
                    "title": "",
                    "description": "",
                    "language": "de",
                    "_id": "612388e0c0b2e90c8393988c"
                }
            ],
            "__v": 0
        }
    ],
    "message": "Characteristics fetched successfully."
}
*/
namedRouter.get("api.characteristic.list", '/characteristic/list', async (req, res) => {
    try {
        const success = await masterController.characteristicData(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /amenitie/list Amenitie List
 * @apiVersion 1.0.0
 * @apiGroup Master
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Cafe and restaurant",
            "icon": "",
            "description": "Cafe and restaurant",
            "language": "en",
            "isDeleted": false,
            "status": "Active",
            "_id": "612388a3c0b2e90c83939882",
            "translate": [
                {
                    "title": "",
                    "description": "",
                    "language": "fr",
                    "_id": "612388a3c0b2e90c83939883"
                },
                {
                    "title": "",
                    "description": "",
                    "language": "de",
                    "_id": "612388a3c0b2e90c83939884"
                }
            ],
            "__v": 0
        }
    ],
    "message": "Amenities fetched successfully."
}
*/
namedRouter.get("api.amenitie.list", '/amenitie/list', async (req, res) => {
    try {
        const success = await masterController.amenitieData(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


// Export the express.Router() instance
module.exports = router;