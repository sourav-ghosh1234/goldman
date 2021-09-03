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
 * @apiParam {string} _id Property Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "612e48ce9c9232380f5ef1ad",
            "landlord": {
                "name": "gbjhbh",
                "email": "test@yopmail.com",
                "phone": "1234567890"
            },
            "propertyAddress": {
                "country": "60b4fd33b86e3eca18590369",
                "city": "61169e68fda0501a65f1e5e6",
                "street_address_number": "20",
                "street_address": "jgvghjv",
                "unit": "768",
                "suburb": "kghbk"
            },
            "parking": {
                "garage_spaces": 45,
                "carport_spaces": 65,
                "open_spaces": 1234
            },
            "houseSize": {
                "size": 1234,
                "sizeBy": "squares"
            },
            "landSize": {
                "size": 1234,
                "sizeBy": "squares"
            },
            "title": "Test Property",
            "subTitle": "sdfsdf",
            "propertyType": {
                "_id": "60b50317d506b6d2142eabdf",
                "isDeleted": false,
                "status": "Active",
                "title": "Apartment and unit",
                "language": "en",
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
                "description": "Apartment and unit",
                "updatedAt": "2021-08-23T11:15:48.659Z"
            },
            "establishedNew": "established",
            "landAgent": {
                "_id": "6128dc1703e0436b87fc3b7d",
                "first_name": "",
                "last_name": "",
                "full_name": "Agent One",
                "email": "agent@mail.com",
                "phone": "1234556678",
                "password": "",
                "profile_image": "1630069488376_default-pattern.jpg",
                "user_name": "",
                "address": "533 kings highway, Brooklyn New York 11223",
                "social_id": "",
                "register_type": "normal",
                "deviceToken": "",
                "deviceType": "",
                "isVerified": false,
                "isDeleted": false,
                "isActive": true,
                "isBlock": false,
                "role": "6128ce4c1edb21accfdc29df",
                "createdAt": "2021-08-27T12:35:35.938Z",
                "updatedAt": "2021-08-27T13:05:12.531Z"
            },
            "dualAgent": "fgdf",
            "rentalPerWeek": 45645,
            "rentalPerMonth": 45645,
            "securityBond": 12,
            "priceDisplay": "price",
            "price": 452,
            "priceText": "",
            "availableDate": "20/02/2022",
            "totalRooms": 5,
            "noOfBedRooms": 2,
            "noOfBathRooms": 2,
            "noOfKitchens": 1,
            "totalFloors": 56,
            "floor": "456",
            "totalArea": "1234",
            "characteristics": [
                "612388bbc0b2e90c83939885"
            ],
            "amenities": [
                "61238852c0b2e90c83939879"
            ],
            "description": "Test",
            "image": "",
            "imageGallery": [
                "1630593182798_london-town-garden.jpg",
                "1630593182806_KLK-IMAGES-826x550-Hunting.jpg",
                "1630593182807_Desktop-free-building-wallpaper.jpg",
                "1630593182837_03_Marina.jpg"
            ],
            "yearBuilt": 0,
            "WC": 0,
            "DPE": "",
            "GES": "",
            "propertyFor": "rent",
            "language": "en",
            "status": "Active",
            "isDeleted": false,
            "translate": [
                {
                    "landlord": {
                        "name": "Test",
                        "email": "",
                        "phone": ""
                    },
                    "propertyAddress": {
                        "unit": "234",
                        "street_address_number": "2332",
                        "street_address": "lorem Test",
                        "suburb": "Test",
                        "municipality": ""
                    },
                    "houseSize": {
                        "size": "21313",
                        "sizeBy": ""
                    },
                    "landSize": {
                        "size": "123123",
                        "sizeBy": "squares"
                    },
                    "title": "Test",
                    "subTitle": "sub Test qq",
                    "leadAgent": "",
                    "dualAgent": "",
                    "priceText": "Test Text",
                    "language": "fr",
                    "totalArea": "45896",
                    "description": "Test Desc..",
                    "_id": "6131ceb27853887489f852b5"
                }
            ],
            "createdAt": "2021-08-31T15:20:46.200Z",
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