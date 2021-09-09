const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const countryController = require('webservice/country.controller');
const request_param = multer();


/**
 * @api {get} /country/list Country lists
 * @apiVersion 1.0.0
 * @apiGroup Country
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "60b4fd33b86e3eca18590369",
            "country_name": "Australia",
            "code": "",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2021-05-31T15:13:55.131Z",
            "__v": 0
        },
        {
            "_id": "612380d6c0b2e90c83939864",
            "country_name": "China",
            "code": "",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2021-08-23T11:04:54.629Z",
            "__v": 0
        },
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
    "message": "Country list fetched successfully."
}
*/
namedRouter.get("api.country.list", '/country/list', async (req, res) => {
    try {
        const success = await countryController.getCountryList(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /city/list/:countryId City list By Country
 * @apiVersion 1.0.0
 * @apiGroup Country
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "60c73b101257932fd09232f2",
            "city": "Adelaide",
            "status": "Active",
            "isDeleted": false,
            "countryId": "60b4fd33b86e3eca18590369",
            "createdAt": "2021-06-14T11:18:40.981Z",
            "__v": 0
        },
        {
            "_id": "61168e85618786174108680f",
            "city": "Brisbane",
            "status": "Active",
            "isDeleted": false,
            "countryId": "60b4fd33b86e3eca18590369",
            "createdAt": "2021-08-13T15:23:49.313Z",
            "__v": 0
        },
        {
            "_id": "61169e5efda0501a65f1e5d0",
            "city": "Melbourne",
            "status": "Active",
            "isDeleted": false,
            "countryId": "60b4fd33b86e3eca18590369",
            "createdAt": "2021-08-13T16:31:26.244Z",
            "__v": 0
        },
        {
            "_id": "61238136c0b2e90c83939865",
            "city": "Perth",
            "status": "Active",
            "isDeleted": false,
            "countryId": "60b4fd33b86e3eca18590369",
            "createdAt": "2021-08-23T11:06:30.176Z",
            "__v": 0
        },
        {
            "_id": "61169e68fda0501a65f1e5e6",
            "city": "Sydney",
            "status": "Active",
            "isDeleted": false,
            "countryId": "60b4fd33b86e3eca18590369",
            "createdAt": "2021-08-13T16:31:36.383Z",
            "__v": 0
        }
    ],
    "message": "City list fetched successfully."
}
*/
namedRouter.get("api.city-by-country.list", '/city/list/:countryId', async (req, res) => {
    try {
        const success = await countryController.getCityByCountry(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

// Export the express.Router() instance
module.exports = router;