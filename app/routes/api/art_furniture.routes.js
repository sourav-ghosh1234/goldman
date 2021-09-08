const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const art_furnitureController = require('webservice/art_furniture.controller');
const request_param = multer();

/**
 * @api {get} /art_furniture/content Art Of Furniture Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Furniture
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "_id": "613623921edb21accfa76e3d",
        "pageHeadingTitle": "Art Of Furniture",
        "pageHeadingMainTitle": "GOLDMAN PRESITGE",
        "pageHeadingContent": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability.</p>\r\n",
        "image": [
            "image_1631019300026_artfurniture.png",
            "image_1631025295753_bedfurniture.jpg",
            "image_1631025295877_housefurniture.jpg"
        ],
        "pageHeadingButtonText": "Discover",
        "pageHeadingButtonUrl": "https://www.google.com",
        "sections": [
            {
                "title": "Living Room",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
                "image": "sectionImage_0_1631003423644_livfurniture.jpg",
                "button": "Discover",
                "_id": "61377890f4bf452561319792"
            },
            {
                "title": "Bed Room",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\r\n",
                "image": "sectionImage_1_1631003423677_bedfurniture.jpg",
                "button": "Discover",
                "_id": "61377890f4bf452561319793"
            },
            {
                "title": "Dining Room",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\r\n",
                "image": "sectionImage_2_1631003310207_dinfurniture.jpg",
                "button": "Discover",
                "_id": "61377890f4bf452561319794"
            },
            {
                "title": "Ourdoor",
                "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\r\n",
                "image": "sectionImage_3_1631003310269_odoorfurniture.jpg",
                "button": "Discover",
                "_id": "61377890f4bf452561319795"
            },
            {
                "title": "House of Europe",
                "description": "<p>Buying a yacht is often the culmination of a dream, for novices to boating as well as for seasoned boaters. Make the sea your favorite place on earth.<br />\r\n<br />\r\nPlease refer above style to Barnes international realty and insert discover under each section to divert to the according page.</p>\r\n",
                "image": "sectionImage_4_1631003310289_housefurniture.jpg",
                "button": "Discover",
                "_id": "61377890f4bf452561319796"
            }
        ],
        "language": "en",
        "translate": [
            {
                "language": "fr",
                "pageHeadingTitle": "Art Of Furniture FR",
                "pageHeadingMainTitle": "Goldman Prestige FR",
                "pageHeadingContent": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability.</p>\r\n",
                "pageHeadingButtonText": "Discover FR",
                "contactButtonText": "Contact Us for More Information FR",
                "_id": "61377890f4bf452561319797",
                "sections": [
                    {
                        "title": "Living Room FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
                        "button": "Discover FR",
                        "_id": "61377890f4bf452561319798"
                    },
                    {
                        "title": "Bed Room",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\r\n",
                        "button": "Discover FR",
                        "_id": "61377890f4bf452561319799"
                    },
                    {
                        "title": "Dining Room FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\r\n",
                        "button": "Discover FR",
                        "_id": "61377890f4bf45256131979a"
                    },
                    {
                        "title": "Ourdoor FR",
                        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\r\n",
                        "button": "Discover FR",
                        "_id": "61377890f4bf45256131979b"
                    },
                    {
                        "title": "House of Europe",
                        "description": "<p>Buying a yacht is often the culmination of a dream, for novices to boating as well as for seasoned boaters. Make the sea your favorite place on earth.<br />\r\n<br />\r\nPlease refer above style to Barnes international realty and insert discover under each section to divert to the according page.</p>\r\n",
                        "button": "Discover FR",
                        "_id": "61377890f4bf45256131979c"
                    }
                ]
            }
        ],
        "updatedAt": "2021-09-07T14:34:56.531Z",
        "contactButtonText": "Contact Us for More Information"
    },
    "message": "Text fetched successfully."
}
*/

namedRouter.get("api.art_furniture.content", '/art_furniture/content', async (req, res) => {
    try {
        const success = await art_furnitureController.getContent(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});




// Export the express.Router() instance
module.exports = router;