const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const artoflivingController = require('webservice/artofliving.controller');
const request_param = multer();


/**
 * @api {get} /artofliving/content Art Of Living Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Living
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "60c34401026424da73cfd474",
    "pageHeadingTitle": "Art Of Living",
    "pageHeadingMainTitle": "Golden Prestige",
    "pageHeadingContent": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability.</p>\r\n",
    "image": [
      "pageHeadingImage_1623414319091_99919e181a6fdca7248c4905506c591c.png",
      "image_1626705877873_7682_1.png",
      "image_1626706039898_41i74R163ZL.jpeg",
      "image_1626706039911_default-pattern.jpg",
      "image_1626706039912_image_1626345882151_bridal-jewellery-set-500x500.jpeg",
      "image_1626786238164_newbook2.png"
    ],
    "pageHeadingButtonText": "Discover",
    "pageHeadingButtonUrl": "https://www.google.com",
    "sections": [
      {
        "title": "Country Estate",
        "description": "<p>Perched on rocky peaks or nestled on the edge of a winding river in a verdant valley, majestic or more sober, from English cottages to corrugated-iron clad houses, and from Victorian-era holiday homes to stone church conversions, country estate residential architecture reflects the changing face of Australia&rsquo;s landscape. Historical and architectural legacies, they are living witnesses of a centuries-old know-how. Go back in time and come live your fairy tale.</p>\r\n",
        "image": "sectionImage_0_1623415729064_download_(9).jpg",
        "button": "Discover",
        "_id": "610bb056be1344369b9d1077"
      },
      {
        "title": "Vineyards Investment",
        "description": "<p>Like stone, wine is at the crossroads of wealth management and the art of living. Grands crus or simpler vintages, all are synonymous with conviviality and elegance. Behind the shimmering reflections hide wine estates which are more than ever rare and sought after assets. Enter the world of wine through the right door.</p>\r\n",
        "image": "sectionImage_1_1623415729066_download_(10).jpg",
        "button": "Discover",
        "_id": "610bb056be1344369b9d1078"
      },
      {
        "title": "Art of Furniture",
        "description": "<p>Defining luxury is not easy, for some it is a certain feeling of aspiration or distinction. To others, it is an indicator of elegance or individuality. For many something that provokes this feeling in an unmatched way is luxury furniture. Think about the beautiful curves and timeless heritage of an exclusive and ornate french dressing table or the artistic lines of an exquisitely crafted contemporary coffee table.</p>\r\n",
        "image": "sectionImage_2_1623415729069_download_(11).jpg",
        "button": "Discover",
        "_id": "610bb056be1344369b9d1079"
      },
      {
        "title": "Art of Décor",
        "description": "<p>The art or process of designing the interior decoration of a room or building to create unique style and living environment. Home decor is the art of making your home look cozy and stylish. It refers to the aesthetic components used to make a home more attractive and visually appealing.</p>\r\n",
        "image": "sectionImage_3_1623415729072_download_(12).jpg",
        "button": "Discover",
        "_id": "610bb056be1344369b9d107a"
      },
      {
        "title": "Yatching World",
        "description": "<p>Buying a yacht is often the culmination of a dream, for novices to boating as well as for seasoned boaters. Make the sea your favorite place on earth. Please refer above style to Barnes international realty and insert discover under each section to divert to the according page.</p>\r\n",
        "image": "sectionImage_4_1623415729075_download_(13).jpg",
        "button": "Discover",
        "_id": "610bb056be1344369b9d107b"
      }
    ],
    "translate": [
      {
        "language": "fr",
        "pageHeadingTitle": "Art Of Living FR",
        "pageHeadingMainTitle": "Golden Prestige FR",
        "pageHeadingContent": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
        "pageHeadingButtonText": "Discover FR",
        "contactButtonText": "Contact Us for More Information FR",
        "_id": "610bb056be1344369b9d107c",
        "sections": [
          {
            "title": "Country Estate FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "610bb056be1344369b9d107d"
          },
          {
            "title": "Vineyards Estate FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "610bb056be1344369b9d107e"
          },
          {
            "title": "Art of Luxury Furniture FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "610bb056be1344369b9d107f"
          },
          {
            "title": "Art of Interior Design FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "610bb056be1344369b9d1080"
          },
          {
            "title": "Yatching World FR",
            "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable FR.</p>\r\n",
            "button": "Discover FR",
            "_id": "610bb056be1344369b9d1081"
          }
        ]
      },
      {
        "language": "de",
        "pageHeadingTitle": "Art Of Living GR",
        "pageHeadingMainTitle": "",
        "pageHeadingContent": "",
        "pageHeadingButtonText": "",
        "contactButtonText": "Contact Us for More Information GR",
        "_id": "610bb056be1344369b9d1082",
        "sections": [
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "610bb056be1344369b9d1083"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "610bb056be1344369b9d1084"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "610bb056be1344369b9d1085"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "610bb056be1344369b9d1086"
          },
          {
            "title": "",
            "description": "",
            "button": "",
            "_id": "610bb056be1344369b9d1087"
          }
        ]
      }
    ],
    "updatedAt": "2021-08-05T09:33:10.639Z",
    "contactButtonText": "Contact Us for More Information"
  },
  "message": "Text fetched successfully."
}
*/
namedRouter.get("api.artofliving.content", '/artofliving/content', async (req, res) => {
    try {
        const success = await artoflivingController.getContent(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /artofliving/country-estates Country Estates Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Living
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "611b75081edb21accf52e3fe",
    "bannerImage": "bannerImage_1629190947439_7682_1.png",
    "heading": "Test",
    "subHeading": "Testm Sub Head",
    "content": "<p>Test Content</p>\r\n",
    "imageHeading": "Image Heading",
    "image": [
      "image_1629191656384_41i74R163ZL.jpeg"
    ],
    "language": "en",
    "translate": [
      {
        "language": "fr",
        "heading": "Test FR",
        "subHeading": "Test Sub FR",
        "content": "<p>Test Content FR</p>\r\n",
        "imageHeading": "Image Heading FR",
        "_id": "611b9c9c42cf5b0ba7bc26c8"
      },
      {
        "language": "de",
        "heading": "Test DE",
        "subHeading": "Test Sub DE",
        "content": "<p>Test Content DE</p>\r\n",
        "imageHeading": "Image Heading DE",
        "_id": "611b9c9c42cf5b0ba7bc26c9"
      }
    ],
    "createdAt": "2021-08-16T10:18:10.138Z",
    "updatedAt": "2021-08-17T11:25:16.521Z",
    "__v": 0
  },
  "message": "Text fetched successfully."
}
*/

namedRouter.get("api.artofliving.country.estates", '/artofliving/country-estates', async (req, res) => {
  try {
      const success = await artoflivingController.getCountryEstates(req, res);
      res.status(success.status).send(success);
  } catch (error) {
      res.status(error.status).send(error);
  }
});


/**
 * @api {get} /artofliving/yachting-world Yachting World Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Living
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "611bd8481edb21accf69f842",
    "bannerImage": "bannerImage_1629216787909_pattern9.jpg",
    "heading": "Test fff",
    "subHeading": "Testm Sub Head",
    "content": "<p>Test Content</p>\r\n",
    "videoLink": "youtube1.com",
    "imageHeading": "Image Heading",
    "image": [
      
    ],
    "language": "en",
    "translate": [
      {
        "language": "fr",
        "heading": "Test FR",
        "subHeading": "Test Sub FR",
        "content": "<p>Test Content FR</p>\r\n",
        "imageHeading": "Image Heading FR",
        "_id": "611be013fdc7cc145e1baa2e"
      },
      {
        "language": "de",
        "heading": "Test DE",
        "subHeading": "Test Sub DE",
        "content": "<p>Test Content DE</p>\r\n",
        "imageHeading": "Image Heading DE",
        "_id": "611be013fdc7cc145e1baa2f"
      }
    ],
    "createdAt": "2021-08-16T10:18:10.138Z",
    "updatedAt": "2021-08-17T16:13:07.961Z",
    "__v": 0,
    "boat_charter_service": [
      {
        "bannerImage": "bannerImage_1629216787909_pattern9.jpg",
        "forMoreInfo": "Testm Sub Head",
        "contactUs": "contact",
        "heading": "Test",
        "content": "<p>test here</p>\r\n",
        "contactInfo": "<p>test info</p>\r\n",
        "language": "en",
        "status": "Active",
        "isDeleted": false,
        "_id": "611e67e41edb21accfcfbb25",
        "translate": [
          {
            "language": "fr",
            "forMoreInfo": "",
            "contactUs": "",
            "heading": "dffggg",
            "content": "<p>ffff</p>\r\n",
            "contactInfo": "",
            "_id": "611f6a9ad709bd2d7066e495"
          },
          {
            "language": "de",
            "forMoreInfo": "",
            "contactUs": "",
            "heading": "",
            "content": "",
            "contactInfo": "",
            "_id": "611f6a9ad709bd2d7066e496"
          }
        ],
        "createdAt": "2021-08-16T10:18:10.138Z",
        "updatedAt": "2021-08-20T08:54:10.219Z",
        "__v": 0
      },
      {
        "bannerImage": "bannerImage_1629447309327_pattern6.jpg",
        "forMoreInfo": "For More Info",
        "contactUs": "Contact Us",
        "heading": "Test Boat",
        "content": "Test",
        "contactInfo": "Contact Info",
        "language": "en",
        "status": "Active",
        "isDeleted": false,
        "_id": "611f648d86a960253184e710",
        "translate": [
          {
            "language": "fr",
            "forMoreInfo": "",
            "contactUs": "",
            "heading": "",
            "content": "",
            "contactInfo": "",
            "_id": "611f648d86a960253184e711"
          },
          {
            "language": "de",
            "forMoreInfo": "",
            "contactUs": "",
            "heading": "",
            "content": "",
            "contactInfo": "",
            "_id": "611f648d86a960253184e712"
          }
        ],
        "createdAt": "2021-08-20T08:15:09.383Z",
        "updatedAt": "2021-08-20T08:15:09.383Z",
        "__v": 0
      }
    ]
  },
  "message": "Text fetched successfully."
}
*/

namedRouter.get("api.artofliving.yachting.world", '/artofliving/yachting-world', async (req, res) => {
  try {
      const success = await artoflivingController.getYachtingWorld(req, res);
      res.status(success.status).send(success);
  } catch (error) {
      res.status(error.status).send(error);
  }
});


/**
 * @api {get} /artofliving/vineyards-investment Vineyards Investment Content
 * @apiVersion 1.0.0
 * @apiGroup Art Of Living
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "611bb2441edb21accf604491",
    "bannerImage": "bannerImage_1629206904526_pattern1.jpg",
    "heading": "Test fff",
    "subHeading": "Testm Sub Head",
    "content": "<p>Test Content</p>\r\n",
    "imageHeading": "Image Heading",
    "image": [
      "image_1629206904533_pattern6.jpg",
      "image_1629206904533_pattern7.jpg",
      "image_1629206904535_pattern8.jpg"
    ],
    "language": "en",
    "translate": [
      {
        "language": "fr",
        "heading": "Test FR",
        "subHeading": "Test Sub FR",
        "content": "<p>Test Content FR</p>\r\n",
        "imageHeading": "Image Heading FR",
        "_id": "611bb978470a870ff7545753"
      },
      {
        "language": "de",
        "heading": "Test DE",
        "subHeading": "Test Sub DE",
        "content": "<p>Test Content DE</p>\r\n",
        "imageHeading": "Image Heading DE",
        "_id": "611bb978470a870ff7545754"
      }
    ],
    "createdAt": "2021-08-16T10:18:10.138Z",
    "updatedAt": "2021-08-17T13:28:24.582Z",
    "__v": 0
  },
  "message": "Text fetched successfully."
}
*/

namedRouter.get("api.artofliving.vineyards.investment", '/artofliving/vineyards-investment', async (req, res) => {
  try {
      const success = await artoflivingController.getVineyardsInvestment(req, res);
      res.status(success.status).send(success);
  } catch (error) {
      res.status(error.status).send(error);
  }
});


// Export the express.Router() instance
module.exports = router;