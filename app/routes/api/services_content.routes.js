const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const servicesContentController = require('webservice/services_content.controller');
const request_param = multer();


/**
 * @api {get} /services-content/content Service Content
 * @apiVersion 1.0.0
 * @apiGroup Service Content
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


/**
 * @api {get} /services/properties-private Exclusive properties & private office
 * @apiVersion 1.0.0
 * @apiGroup Service Content
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "612cda2c1edb21accf0f0f98",
    "bannerImage": "bannerImage_1630330354478_photo-1505843513577-22bb7d21e455.jpeg",
    "heading": "Exclusive properties & private office",
    "subHeading": "Your investment projects in France and internationally",
    "content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
    "imageHeading": "The world of BARNES Exclusive properties & private office",
    "image": [
      "image_1630330354483_download_(1).jpeg",
      "image_1630330354483_pexels-photo-186077.jpeg",
      "image_1630330354484_photo-1560518883-ce09059eeffa.jpeg",
      "image_1630330354484_slide1.png"
    ],
    "language": "en",
    "translate": [
      {
        "language": "fr",
        "heading": "Propriétés exclusives & bureau privé",
        "subHeading": "Vos projets d'investissement en France et à l'international",
        "content": "<p>FR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nFR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nFR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "imageHeading": "L'univers BARNES Propriétés exclusives & bureau privé",
        "_id": "612cddf26769eb72b0406c01"
      }
    ],
    "createdAt": "2021-08-16T10:18:10.138Z",
    "updatedAt": "2021-08-30T13:32:34.543Z",
    "__v": 0
  },
  "message": "Text fetched successfully."
}
*/

namedRouter.get("api.services.properties.private", '/services/properties-private', async (req, res) => {
  try {
      const success = await servicesContentController.getPropertiesPrivate(req, res);
      res.status(success.status).send(success);
  } catch (error) {
      res.status(error.status).send(error);
  }
});


/**
 * @api {get} /services/investment-realty Investment Realty
 * @apiVersion 1.0.0
 * @apiGroup Service Content
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "612ce2571edb21accf0ffdda",
    "bannerImage": "bannerImage_1630332023838_l22.png",
    "heading": "Investment Realty",
    "subHeading": "Our expertise in commercial and residential building transactions",
    "content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
    "imageHeading": "The world of BARNES Investment realty",
    "image": [
      "image_1630332023847_l11.png",
      "image_1630332023850_large-beautiful-bedroom.jpeg",
      "image_1630332023852_pexels-photo-186077.jpeg",
      "image_1630332023853_photo-1505843513577-22bb7d21e455.jpeg"
    ],
    "language": "en",
    "translate": [
      {
        "language": "fr",
        "heading": "Investissement immobilier",
        "subHeading": "Notre expertise en transactions immobilières commerciales et résidentielles",
        "content": "<p>FR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nFR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nFR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "imageHeading": "L'univers de BARNES Investment Realty",
        "_id": "612ce477dd593a7f28ef914a"
      }
    ],
    "createdAt": "2021-08-16T10:18:10.138Z",
    "updatedAt": "2021-08-30T14:00:23.909Z",
    "__v": 0
  },
  "message": "Text fetched successfully."
}
*/

namedRouter.get("api.services.investment.realty", '/services/investment-realty', async (req, res) => {
  try {
      const success = await servicesContentController.getInvestmentRealty(req, res);
      res.status(success.status).send(success);
  } catch (error) {
      res.status(error.status).send(error);
  }
});


/**
 * @api {get} /services/life-annuities Life Annuities
 * @apiVersion 1.0.0
 * @apiGroup Service Content
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "612ceb3d1edb21accf113ae5",
    "bannerImage": "bannerImage_1630335015533_photo-1560518883-ce09059eeffa.jpeg",
    "heading": "Life annuities",
    "subHeading": "A forward-looking asset strategy",
    "content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
    "imageHeading": "Discover our life annuity with BARNES viager for sale",
    "image": [
      "image_1630335015538_download_(1).jpeg",
      "image_1630335015538_image_1626352936129_7682_1.png",
      "image_1630335015553_l11.png",
      "image_1630335015557_l22.png"
    ],
    "language": "en",
    "translate": [
      {
        "language": "fr",
        "heading": "Rentes viagères",
        "subHeading": "Une stratégie patrimoniale tournée vers l'avenir",
        "content": "<p>FR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nFR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />\r\n<br />\r\nFR Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "imageHeading": "Découvrez notre viager avec BARNES viager à vendre",
        "_id": "612cf0279cbbaf89e5816b43"
      }
    ],
    "createdAt": "2021-08-16T10:18:10.138Z",
    "updatedAt": "2021-08-30T14:50:15.614Z",
    "__v": 0
  },
  "message": "Text fetched successfully."
}
*/

namedRouter.get("api.services.life.annuities", '/services/life-annuities', async (req, res) => {
  try {
      const success = await servicesContentController.getLifeAnnuities(req, res);
      res.status(success.status).send(success);
  } catch (error) {
      res.status(error.status).send(error);
  }
});


// Export the express.Router() instance
module.exports = router;