const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const propertyController = require('webservice/property.controller');
const request_param = multer();

/**
 * @api {post} /property/list Property List
 * @apiVersion 1.0.0
 * @apiGroup Property
 * @apiParam {number} page Page
 * @apiParam {number} limit Limit
 * @apiParam {string} property_for Property For ["sale", "rent"] 
 * @apiParam {string} property_type Property Type Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "6130f45b3aa7dd72e6fb7be8",
            "landlord": {
                "name": "Dev Test",
                "email": "Dev Test",
                "phone": "3242342134"
            },
            "propertyAddress": {
                "country": "60b4f7a3026424da73e8aba4",
                "city": "61238136c0b2e90c83939865",
                "street_address_number": "12312",
                "street_address": "Dev Test",
                "unit": "24",
                "suburb": "Dev Test"
            },
            "parking": {
                "garage_spaces": 234,
                "carport_spaces": 44,
                "open_spaces": 44
            },
            "houseSize": {
                "size": 23,
                "sizeBy": "squares"
            },
            "landSize": {
                "size": 34,
                "sizeBy": "squares"
            },
            "title": "Dev Test",
            "subTitle": "Dev Test",
            "propertyType": {
                "_id": "60be1fc0fde29e4322dafab2",
                "isDeleted": false,
                "status": "Active",
                "title": "Townhouse and villa",
                "language": "en",
                "translate": [
                    {
                        "title": "Property FR",
                        "description": "House FR",
                        "language": "fr",
                        "_id": "6123834cc0b2e90c8393986a"
                    },
                    {
                        "title": "Property DE",
                        "description": "House DE",
                        "language": "de",
                        "_id": "6123834cc0b2e90c8393986b"
                    }
                ],
                "__v": 0,
                "description": "Townhouse and villa",
                "updatedAt": "2021-08-23T11:15:24.618Z"
            },
            "establishedNew": "established",
            "landAgent": {
                "_id": "6128f78c9336c987a798a5a4",
                "first_name": "",
                "last_name": "",
                "full_name": "Agent Two",
                "email": "agent2@mail.com",
                "phone": "273839404",
                "password": "",
                "profile_image": "1630074764552_7682_1.png",
                "user_name": "",
                "address": "test address",
                "social_id": "",
                "register_type": "normal",
                "deviceToken": "",
                "deviceType": "",
                "isDeleted": false,
                "isActive": true,
                "role": "6128ce4c1edb21accfdc29df",
                "createdAt": "2021-08-27T14:32:44.654Z",
                "updatedAt": "2021-08-27T14:32:44.654Z"
            },
            "dualAgent": "Dev Test",
            "rentalPerWeek": 45,
            "rentalPerMonth": 45,
            "securityBond": 3421,
            "priceDisplay": "price",
            "price": 2312,
            "priceText": "",
            "availableDate": "20/02/2022",
            "totalRooms": 5,
            "noOfBedRooms": 3,
            "noOfBathRooms": 1,
            "noOfKitchens": 1,
            "totalFloors": 5,
            "floor": "23",
            "totalArea": "44",
            "characteristics": [
                "612388bbc0b2e90c83939885"
            ],
            "amenities": [
                "61238882c0b2e90c8393987f"
            ],
            "description": "Dev Test",
            "image": "",
            "imageGallery": [
                "1630598235556_03_Marina.jpg"
            ],
            "yearBuilt": 0,
            "WC": 0,
            "DPE": "",
            "GES": "",
            "propertyFor": "sale",
            "language": "en",
            "status": "Active",
            "isDeleted": false,
            "translate": [
                {
                    "landlord": {
                        "name": "Dev Test",
                        "email": "",
                        "phone": ""
                    },
                    "propertyAddress": {
                        "unit": "2342",
                        "street_address_number": "3424",
                        "street_address": "Dev Test",
                        "suburb": "Dev Test",
                        "municipality": ""
                    },
                    "houseSize": {
                        "size": "345345",
                        "sizeBy": "squares"
                    },
                    "landSize": {
                        "size": "345345",
                        "sizeBy": "squares"
                    },
                    "title": "Dev Test",
                    "subTitle": "Dev Test",
                    "leadAgent": "",
                    "dualAgent": "",
                    "priceText": "Dev Test",
                    "language": "fr",
                    "totalArea": "45354",
                    "description": "Dev Test",
                    "_id": "6130f6b63aa7dd72e6fb7df0"
                }
            ],
            "createdAt": "2021-09-02T15:57:15.665Z",
            "__v": 0
        }
    ],
    "pageCount": 1,
    "totalCount": 1,
    "message": "Property fetched successfully."
}
*/
namedRouter.post("api.property.list", '/property/list', request_param.any(), async (req, res) => {
    try {
        const success = await propertyController.propertyList(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


/**
 * @api {get} /property/details/:id Property Details By id
 * @apiVersion 1.0.0
 * @apiGroup Property
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [
        {
            "_id": "6130f45b3aa7dd72e6fb7be8",
            "landlord": {
                "name": "Dev Test",
                "email": "Dev Test",
                "phone": "3242342134"
            },
            "propertyAddress": {
                "country": {
                    "_id": "60b4f7a3026424da73e8aba4",
                    "code": "+1",
                    "country_name": "Japan",
                    "status": "Active",
                    "isDeleted": false,
                    "createdAt": "2019-04-15T08:24:40.827Z",
                    "updatedAt": "2020-10-22T06:14:39.804Z"
                },
                "city": {
                    "_id": "61238136c0b2e90c83939865",
                    "city": "Perth",
                    "status": "Active",
                    "isDeleted": false,
                    "countryId": "60b4fd33b86e3eca18590369",
                    "createdAt": "2021-08-23T11:06:30.176Z",
                    "__v": 0
                },
                "street_address_number": "12312",
                "street_address": "Dev Test",
                "unit": "24",
                "suburb": "Indore, Madhya Pradesh, India"
            },
            "parking": {
                "garage_spaces": 234,
                "carport_spaces": 44,
                "open_spaces": 44
            },
            "houseSize": {
                "size": 23,
                "sizeBy": "squares"
            },
            "landSize": {
                "size": 34,
                "sizeBy": "squares"
            },
            "title": "Dev Test",
            "subTitle": "Dev Test",
            "propertyType": {
                "_id": "60be1fc0fde29e4322dafab2",
                "isDeleted": false,
                "status": "Active",
                "title": "Townhouse and villa",
                "language": "en",
                "translate": [
                    {
                        "title": "Property FR",
                        "description": "House FR",
                        "language": "fr",
                        "_id": "6123834cc0b2e90c8393986a"
                    },
                    {
                        "title": "Property DE",
                        "description": "House DE",
                        "language": "de",
                        "_id": "6123834cc0b2e90c8393986b"
                    }
                ],
                "__v": 0,
                "description": "Townhouse and villa",
                "updatedAt": "2021-08-23T11:15:24.618Z"
            },
            "establishedNew": "established",
            "landAgent": {
                "_id": "6128f78c9336c987a798a5a4",
                "first_name": "",
                "last_name": "",
                "full_name": "Agent Two",
                "email": "agent2@mail.com",
                "phone": "273839404",
                "password": "",
                "profile_image": "1630074764552_7682_1.png",
                "user_name": "",
                "address": "test address",
                "social_id": "",
                "register_type": "normal",
                "deviceToken": "",
                "deviceType": "",
                "isDeleted": false,
                "isActive": true,
                "role": "6128ce4c1edb21accfdc29df",
                "createdAt": "2021-08-27T14:32:44.654Z",
                "updatedAt": "2021-08-27T14:32:44.654Z"
            },
            "dualAgent": "Dev Test",
            "rentalPerWeek": 45,
            "rentalPerMonth": 45,
            "securityBond": 3421,
            "priceDisplay": "price",
            "price": 2312,
            "priceText": "",
            "availableDate": "20/02/2022",
            "totalRooms": 5,
            "noOfBedRooms": 3,
            "noOfBathRooms": 1,
            "noOfKitchens": 1,
            "totalFloors": 5,
            "floor": "23",
            "totalArea": "44",
            "characteristics": [
                {
                    "_id": "612388bbc0b2e90c83939885",
                    "description": "City view",
                    "language": "en",
                    "isDeleted": false,
                    "status": "Active",
                    "title": "City view",
                    "translate": [
                        {
                            "title": "",
                            "description": "",
                            "language": "fr",
                            "_id": "612388bbc0b2e90c83939886"
                        },
                        {
                            "title": "",
                            "description": "",
                            "language": "de",
                            "_id": "612388bbc0b2e90c83939887"
                        }
                    ],
                    "__v": 0
                },
                {
                    "_id": "61152a410c85891243a58c21",
                    "description": "Oceanview",
                    "language": "en",
                    "isDeleted": false,
                    "status": "Active",
                    "title": "Oceanview",
                    "translate": [
                        {
                            "title": "Caretaker FR",
                            "description": "",
                            "language": "fr",
                            "_id": "612388cec0b2e90c83939888"
                        },
                        {
                            "title": "Caretaker DE",
                            "description": "",
                            "language": "de",
                            "_id": "612388cec0b2e90c83939889"
                        }
                    ],
                    "__v": 0
                }
            ],
            "amenities": [
                {
                    "_id": "612388a3c0b2e90c83939882",
                    "title": "Cafe and restaurant",
                    "icon": "",
                    "description": "Cafe and restaurant",
                    "language": "en",
                    "isDeleted": false,
                    "status": "Active",
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
                },
                {
                    "_id": "61238882c0b2e90c8393987f",
                    "title": "public transport",
                    "icon": "",
                    "description": "public transport",
                    "language": "en",
                    "isDeleted": false,
                    "status": "Active",
                    "translate": [
                        {
                            "title": "",
                            "description": "",
                            "language": "fr",
                            "_id": "61238882c0b2e90c83939880"
                        },
                        {
                            "title": "",
                            "description": "",
                            "language": "de",
                            "_id": "61238882c0b2e90c83939881"
                        }
                    ],
                    "__v": 0
                },
                {
                    "_id": "612383cfc0b2e90c83939872",
                    "title": "Spa & Sauna",
                    "icon": "",
                    "description": "Spa & Sauna",
                    "language": "en",
                    "isDeleted": false,
                    "status": "Active",
                    "translate": [
                        {
                            "title": "",
                            "description": "",
                            "language": "fr",
                            "_id": "612383cfc0b2e90c83939873"
                        },
                        {
                            "title": "",
                            "description": "",
                            "language": "de",
                            "_id": "612383cfc0b2e90c83939874"
                        }
                    ],
                    "__v": 0
                }
            ],
            "description": "Dev Test",
            "image": "",
            "imageGallery": [
                "1630598235556_03_Marina.jpg"
            ],
            "yearBuilt": 0,
            "WC": 0,
            "DPE": "",
            "GES": "",
            "propertyFor": "sale",
            "language": "en",
            "status": "Active",
            "isDeleted": false,
            "translate": [
                {
                    "landlord": {
                        "name": "Dev Test",
                        "email": "",
                        "phone": ""
                    },
                    "propertyAddress": {
                        "unit": "2342",
                        "street_address_number": "3424",
                        "street_address": "Dev Test",
                        "suburb": "Dev Test",
                        "municipality": ""
                    },
                    "houseSize": {
                        "size": "345345",
                        "sizeBy": "squares"
                    },
                    "landSize": {
                        "size": "345345",
                        "sizeBy": "squares"
                    },
                    "title": "Dev Test",
                    "subTitle": "Dev Test",
                    "leadAgent": "",
                    "dualAgent": "",
                    "priceText": "Dev Test",
                    "language": "fr",
                    "totalArea": "45354",
                    "description": "Dev Test",
                    "_id": "613203b76973ab5e178dfd98"
                }
            ],
            "createdAt": "2021-09-02T15:57:15.665Z",
            "__v": 0
        }
    ],
    "message": "Property details fetched successfully."
}
 **/
namedRouter.get("api.property.details", '/property/details/:id', request_param.any(), async (req, res) => {
    try {
        const success = await propertyController.propertyDetails(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// Export the express.Router() instance
module.exports = router;