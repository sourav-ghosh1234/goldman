const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const artofdecorController = require('webservice/artofdecor.controller');
const request_param = multer();


/**
 * @api {get} /artofdecor/content Art Of Decor Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Decor
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "_id": "613632781edb21accfa88a91",
        "pageHeadingTitle": "Art of interior design",
        "pageHeadingMainTitle": "GOLDMAN PRESTIGE",
        "pageHeadingContent": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability.</p>\r\n",
        "image": [
            "image_1631027261465_Interior.jpg",
            "image_1631027287008_Interior2.jpeg",
            "image_1631030404568_Interior4.jpg",
            "image_1631030404622_Interior5.jpg"
        ],
        "pageHeadingButtonText": "Discover",
        "pageHeadingButtonUrl": "https://www.google.com",
        "sections": [
            {
                "title": "Living Room",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
                "image": "sectionImage_0_1631010563226_Living_Room.jfif",
                "button": "Discover",
                "_id": "6138568e0b60f70480b88fea"
            },
            {
                "title": "Bed Room",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\r\n",
                "image": "sectionImage_1_1631010563246_Bed_Room.jfif",
                "button": "Discover",
                "_id": "6138568e0b60f70480b88feb"
            },
            {
                "title": "Dining Room",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\r\n",
                "image": "sectionImage_2_1631010563258_Dining_Room.jpg",
                "button": "Discover",
                "_id": "6138568e0b60f70480b88fec"
            },
            {
                "title": "Ourdoor",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\r\n",
                "image": "sectionImage_3_1631010563263_Outdoor.jpg",
                "button": "Discover",
                "_id": "6138568e0b60f70480b88fed"
            },
            {
                "title": "House of Europe",
                "description": "<p>Buying a yacht is often the culmination of a dream, for novices to boating as well as for seasoned boaters. Make the sea your favorite place on earth.<br />\r\n<br />\r\nPlease refer above style to Barnes international realty and insert discover under each section to divert to the according page.</p>\r\n",
                "image": "sectionImage_4_1631010563569_House_of_Europe.jpg",
                "button": "Discover",
                "_id": "6138568e0b60f70480b88fee"
            }
        ],
        "language": "en",
        "translate": [
            {
                "language": "fr",
                "pageHeadingTitle": "Art of interior design FR",
                "pageHeadingMainTitle": "GOLDMAN PRESTIGE FR",
                "pageHeadingContent": "<p>FR To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability.</p>\r\n",
                "pageHeadingButtonText": "Discover FR",
                "contactButtonText": "Contact Us for More Information FR",
                "_id": "6138568e0b60f70480b88fef",
                "sections": [
                    {
                        "title": "Living Room FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
                        "button": "Discover FR",
                        "_id": "6138568e0b60f70480b88ff0"
                    },
                    {
                        "title": "Bed Room FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\r\n",
                        "button": "Discover FR",
                        "_id": "6138568e0b60f70480b88ff1"
                    },
                    {
                        "title": "Dining Room FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\r\n",
                        "button": "Discover FR",
                        "_id": "6138568e0b60f70480b88ff2"
                    },
                    {
                        "title": "Ourdoor FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\r\n",
                        "button": "Discover FR",
                        "_id": "6138568e0b60f70480b88ff3"
                    },
                    {
                        "title": "House of Europe FR",
                        "description": "<p>Buying a yacht is often the culmination of a dream, for novices to boating as well as for seasoned boaters. Make the sea your favorite place on earth.<br />\r\n<br />\r\nPlease refer above style to Barnes international realty and insert discover under each section to divert to the according page.</p>\r\n",
                        "button": "Discover FR",
                        "_id": "6138568e0b60f70480b88ff4"
                    }
                ]
            }
        ],
        "updatedAt": "2021-09-08T06:22:06.061Z",
        "contactButtonText": "Contact Us for More Information"
    },
    "message": "Text fetched successfully."
}
*/

namedRouter.get("api.artofdecor.content", '/artofdecor/content', async (req, res) => {
    try {
        const success = await artofdecorController.getContentEdit(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /art-of-decor/list Art Of Decor List
 * @apiVersion 1.0.0
 * @apiGroup Art Of Decor
 * @apiParam {number} page Page
 * @apiParam {number} limit Limit
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
namedRouter.post("api.art-of-decor.list", '/art-of-decor/list', async (req, res) => {
    try {
        const success = await artofdecorController.getArtdecorList(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /art-of-decor/details/:id Art Of Decor Details By id
 * @apiVersion 1.0.0
 * @apiGroup Art Of Furniture
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "_id": "6139dd112af033396e3eb79e",
        "title": "Sienna Mini Vase",
        "company_name": "LUXDECO",
        "price": 30,
        "dimensions": "20",
        "colour": [
            "Green"
        ],
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "slug": "sienna-mini-vase",
        "image": "1631182097833_dd1.png",
        "imageGallery": [
            "1631182097835_dd11.png",
            "1631182097837_dd2.png",
            "1631182097837_dd3.png",
            "1631182097838_dd4.png"
        ],
        "status": "Active",
        "isDeleted": false,
        "translate": [
            {
                "title": "Sienna Mini Vase",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
                "company_name": "LUXDECO",
                "language": "fr",
                "_id": "6139de0d2af033396e3eb7f5"
            }
        ]
    },
    "message": "Records fetched successfully."
}
 **/
namedRouter.get("api.art-of-decor.details", '/art-of-decor/details/:id', request_param.any(), async (req, res) => {
    try {
        const success = await artofdecorController.getArtdecorDetails(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// Export the express.Router() instance
module.exports = router;