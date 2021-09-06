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
 * @apiParam {string} search_text Search Text [title, subtitle, suburb etc.]
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
            "_id": "612e48ce9c9232380f5ef1ad",
            "landlord": {
                "name": "Rimma PIGNET",
                "email": "rimma@yopmail.com",
                "phone": "590590353899"
            },
            "propertyAddress": {
                "country": "Australia",
                "city": "Melbourne",
                "street_address_number": "19",
                "street_address": "rue du Roi Oscar II, Gustavia",
                "suburb": "Saint-Barthélemy, France"
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
                "size": 12615,
                "sizeBy": "squares"
            },
            "title": "Three bedroom Villa in Flamands",
            "subTitle": "HOUSE FOR SALE 12615 SQ FT SAINT-BARTHÉLEMY - € 5,300,000",
            "propertyType": "Townhouse and villa",
            "establishedNew": "established",
            "landAgent": "Agent One",
            "dualAgent": "0",
            "rentalPerWeek": 0,
            "rentalPerMonth": 0,
            "securityBond": 0,
            "priceDisplay": "price",
            "price": 5300000,
            "priceText": "",
            "availableDate": "20/02/2022",
            "totalRooms": 5,
            "noOfBedRooms": 2,
            "noOfBathRooms": 2,
            "noOfKitchens": 1,
            "totalFloors": 12615,
            "floor": "456",
            "totalArea": "12615",
            "characteristics": [
                "City view",
                "Oceanview"
            ],
            "amenities": [
                "Pool",
                "Gym",
                "Spa & Sauna",
                "Cafe and restaurant"
            ],
            "description": "Ideally situated near Gustavia on the way to Flamand beaches, close to Hôtel Cheval Blanc, villa Datcha with its modern architecture will meet your needs. The three bedrooms are totally independent, each with its own terrasse with long chairs and ocean view. The spacious living with the large kitchen incorporated is easy to live with friends. From its infinity pool you will enjoy the beautiful sunsets. The listed price is inclusive of agency fees, at the seller's cost.",
            "image": "",
            "imageGallery": [
                "1630684328299_71885108606cd717eb8ff2.26011386_4c42ae094d_1920.jpg",
                "1630684328442_143380515606cd734971899.66823608_368dd234b0_1919.jpg",
                "1630684328535_210988754606cd798d79f57.30333454_81da227e15_1920.jpg",
                "1630684328573_783539319606cd76dbdcc80.80546837_2bc103868c_1920.jpg",
                "1630684328581_1390255606606cd70acf7620.14323576_20f8e31b47_1920.jpg",
                "1630684328627_1807853483606cd74600e256.71679732_56f7fec71f_1920.jpg"
            ],
            "yearBuilt": 0,
            "WC": 0,
            "DPE": "",
            "GES": "",
            "propertyFor": "rent",
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
                    "_id": "613244a8d84b191b5f4a8dcd"
                }
            ]
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