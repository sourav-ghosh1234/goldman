const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const servicesContentController = require('webservice/services_content.controller');
const request_param = multer();


/**
 * @api {get} /artofliving/content Service Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Living
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "60f6f2af1edb21accf43386f",
    "pageHeadingTitle": "BARNES services",
    "pageHeadingContent": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
    "image": [
      "image_1626797154200_7682_1.png",
      "image_1626797154213_bridal-jewellery-set-500x500.jpeg"
    ],
    "pageHeadingButtonText": "Discover",
    "pageHeadingButtonUrl": "https://www.google.com",
    "sections": [
      {
        "title": "Exclusive properties & private office",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "image": "sectionImage_0_1626797154215_7682_1.png",
        "button": "Discover",
        "_id": "60fad81a0cd63d417094f0d9"
      },
      {
        "title": "Investment Realty",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "image": "sectionImage_1_1626797154224_newbook2.png",
        "button": "Discover",
        "_id": "60fad81a0cd63d417094f0da"
      },
      {
        "title": "Life annuities",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "image": "sectionImage_2_1626797154227_st1.png",
        "button": "Discover",
        "_id": "60fad81a0cd63d417094f0db"
      },
      {
        "title": "Property management",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "image": "sectionImage_3_1626797154229_st2.png",
        "button": "Discover",
        "_id": "60fad81a0cd63d417094f0dc"
      },
      {
        "title": "Renovation - Interior design",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "image": "sectionImage_4_1626797154232_st3.png",
        "button": "Discover",
        "_id": "60fad81a0cd63d417094f0dd"
      }
    ],
    "translate": [
      {
        "language": "fr",
        "pageHeadingTitle": "Art Of Living FR",
        "pageHeadingContent": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
        "pageHeadingButtonText": "Discover FR",
        "_id": "60fad81a0cd63d417094f0de",
        "sections": [
          {
            "title": "Country Estate FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "60fad81a0cd63d417094f0df"
          },
          {
            "title": "Vineyards Estate FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "60fad81a0cd63d417094f0e0"
          },
          {
            "title": "Art of Luxury Furniture FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "60fad81a0cd63d417094f0e1"
          },
          {
            "title": "Art of Interior Design FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "60fad81a0cd63d417094f0e2"
          },
          {
            "title": "Yatching World FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "60fad81a0cd63d417094f0e3"
          }
        ]
      },
      {
        "language": "de",
        "pageHeadingTitle": "Art Of Living GR",
        "pageHeadingContent": "",
        "pageHeadingButtonText": "",
        "_id": "60fad81a0cd63d417094f0e4",
        "sections": [
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "60fad81a0cd63d417094f0e5"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "60fad81a0cd63d417094f0e6"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "60fad81a0cd63d417094f0e7"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "60fad81a0cd63d417094f0e8"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "60fad81a0cd63d417094f0e9"
          }
        ]
      }
    ],
    "updatedAt": "2021-07-23T14:54:18.771Z"
  },
  "message": "Text fetched successfully."
}
*/
namedRouter.get("api.services.content", '/services-content/content', async (req, res) => {
    try {
        const success = await servicesContentController.getContent(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


// Export the express.Router() instance
module.exports = router;