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


// Export the express.Router() instance
module.exports = router;