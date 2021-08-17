const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const homecontentController = require('webservice/homecontent.controller');
const request_param = multer();


/**
 * @api {get} /home/content Home Content
 * @apiVersion 1.0.0
 * @apiGroup Home Content
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
    "_id": "60c20127026424da739df72e",
    "bannerText": "All about Australian fine home and luxury lifestyle",
    "bannerImage": "bannerImage_1628158989585_banner.png",
    "content": "<p>Committed to accompanying you in all aspects of your real estate projects, GOLDMAN PRESTIGE has a team of experts on hand to provide personalised assistance in their area of expertise.</p>\r\n",
    "realEstateService": {
      "title": "Real estate service",
      "description": "<p>GOLDMAN PRESTIGE proposes a comprehensive service to market your fine home, from prestigious styling to exclusive selling marketing campaign, renting out and manage your properties. Whether administrative and accounting monitoring or technical assistance, we manage all aspects to ensure hassle-free and efficient selling and rental matters.</p>\r\n",
      "image": "realEstateService_image_1628159015370_l11.png"
    },
    "artOfLiving": {
      "title": "Art of living",
      "description": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability.</p>\r\n",
      "image": "artOfLiving_image_1628159035192_l22.png"
    },
    "currentPropertiesHeading": "Current Properties",
    "currentPropertiesText": "<p>Global service for an international clientele GOLDMAN PRESTIGE offers sophisticated service to international clientele for their real estate matters by offering all the services essential to the achievement of a perfect solution. From the legal arrangement to the final decoration, including financing, insurance, or rental management, we have brought together the professionals who will be able to assist you.</p>\r\n",
    "contactusHeading": "Contact us for more information",
    "translate": [
      {
        "realEstateService": {
          "title": "Real estate service FR",
          "description": "<p>GOLDMAN PRESTIGE proposes a comprehensive service to market your fine home, from prestigious styling to exclusive selling marketing campaign, renting out and manage your properties. Whether administrative and accounting monitoring or technical assistance, we manage all aspects to ensure hassle-free and efficient selling and rental matters FR</p>\r\n"
        },
        "artOfLiving": {
          "title": "Art of living FR",
          "description": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability FR.</p>\r\n"
        },
        "language": "fr",
        "bannerText": "All about Australian fine home and luxury lifestyle FR",
        "content": "<p>Committed to accompanying you in all aspects of your real estate projects, GOLDMAN PRESTIGE has a team of experts on hand to provide personalised assistance in their area of expertise FR.</p>\r\n",
        "currentPropertiesHeading": "Current Properties FR",
        "currentPropertiesText": "<p>Global service for an international clientele GOLDMAN PRESTIGE offers sophisticated service to international clientele for their real estate matters by offering all the services essential to the achievement of a perfect solution. From the legal arrangement to the final decoration, including financing, insurance, or rental management, we have brought together the professionals who will be able to assist you FR.</p>\r\n",
        "contactusHeading": "Contact us for more information FR",
        "_id": "610bbc3b31ce4f3eb8f721f8"
      },
      {
        "realEstateService": {
          "title": "Real estate service DE",
          "description": "<p>GOLDMAN PRESTIGE proposes a comprehensive service to market your fine home, from prestigious styling to exclusive selling marketing campaign, renting out and manage your properties. Whether administrative and accounting monitoring or technical assistance, we manage all aspects to ensure hassle-free and efficient selling and rental matters DE.</p>\r\n"
        },
        "artOfLiving": {
          "title": "Art of living DE",
          "description": "<p>To bring the lovely into the home, to bring out the subtle pleasures of everyday life, to treat yourself to something magnificent as part of definition of art of living. GOLDMAN PRESITGE has always striven to celebrate this heritage. This extends to numerous domains, whether fine architecture and properties, fine art, luxurious furniture, yachting or vineyards. We invite you to embark on this journey accompanied by our teams, who are on hand to provide expertise and consultancy services to ensure your projects combine pleasure and profitability DE.</p>\r\n"
        },
        "language": "de",
        "bannerText": "All about Australian fine home and luxury lifestyle DE",
        "content": "<p>Committed to accompanying you in all aspects of your real estate projects, GOLDMAN PRESTIGE has a team of experts on hand to provide personalised assistance in their area of expertise DE.</p>\r\n",
        "currentPropertiesHeading": "Current Properties DE",
        "currentPropertiesText": "<p>Global service for an international clientele GOLDMAN PRESTIGE offers sophisticated service to international clientele for their real estate matters by offering all the services essential to the achievement of a perfect solution. From the legal arrangement to the final decoration, including financing, insurance, or rental management, we have brought together the professionals who will be able to assist you DE.</p>\r\n",
        "contactusHeading": "Contact us for more information DE",
        "_id": "610bbc3b31ce4f3eb8f721f9"
      }
    ],
    "updatedAt": "2021-08-05T10:23:55.244Z"
  },
  "message": "Text fetched successfully."
}
*/
namedRouter.get("api.home.content", '/home/content', async (req, res) => {
    try {
        const success = await homecontentController.getContent(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


// Export the express.Router() instance
module.exports = router;