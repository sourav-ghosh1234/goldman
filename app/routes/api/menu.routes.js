const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const menuController = require('webservice/menu.controller');
const request_param = multer();


/**
 * @api {get} /menu/:menu_type Get Header & Footer Menu
 * @apiVersion 1.0.0
 * @apiGroup Menu
 * @apiParam {String} menu_type [header/footer]
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": [
    {
      "_id": "5d011e3bc1891efa1abf375e",
      "title": "Home",
      "translate": [
        {
          "title": "Home FR",
          "language": "fr"
        },
        {
          "title": "Home DE",
          "language": "de"
        }
      ],
      "menu_order": 1,
      "child_details": [
        
      ]
    },
    {
      "_id": "60febf5f1edb21accf5dec00",
      "title": "Real Estate",
      "translate": [
        {
          "title": "Real Estate FR",
          "language": "fr"
        },
        {
          "title": "Real Estate DE",
          "language": "de"
        }
      ],
      "menu_order": 2,
      "child_details": [
        {
          "_id": "60fec0691edb21accf5e26db",
          "title": "Sold",
          "parent_id": "60febf5f1edb21accf5dec00",
          "slug": "sold",
          "menu_type": "header",
          "menu_order": 2,
          "language": "en",
          "translate": [
            {
              "title": "Sold FR",
              "language": "fr"
            },
            {
              "title": "Sold DE",
              "language": "de"
            }
          ],
          "status": "Active",
          "isDeleted": false
        },
        {
          "_id": "60fec09b1edb21accf5e3071",
          "title": "New Developments",
          "parent_id": "60febf5f1edb21accf5dec00",
          "slug": "new-developments",
          "menu_type": "header",
          "menu_order": 2,
          "language": "en",
          "translate": [
            {
              "title": "New Developments FR",
              "language": "fr"
            },
            {
              "title": "New Developments DE",
              "language": "de"
            }
          ],
          "status": "Active",
          "isDeleted": false
        },
        {
          "_id": "60febfc91edb21accf5e0081",
          "title": "For Sale",
          "parent_id": "60febf5f1edb21accf5dec00",
          "slug": "for-sale",
          "menu_type": "header",
          "menu_order": 2,
          "language": "en",
          "translate": [
            {
              "title": "For Sale FR",
              "language": "fr"
            },
            {
              "title": "For Sale DE",
              "language": "de"
            }
          ],
          "status": "Active",
          "isDeleted": false
        },
        {
          "_id": "60fec02b1edb21accf5e1d8b",
          "title": "For Rent",
          "parent_id": "60febf5f1edb21accf5dec00",
          "slug": "for-rent",
          "menu_type": "header",
          "menu_order": 2,
          "language": "en",
          "translate": [
            {
              "title": "For Rent FR",
              "language": "fr"
            },
            {
              "title": "For Rent DE",
              "language": "de"
            }
          ],
          "status": "Active",
          "isDeleted": false
        }
      ]
    },
    {
      "_id": "60fec0e51edb21accf5e432e",
      "title": "Art Of Living",
      "translate": [
        {
          "title": "Art Of Living FR",
          "language": "fr"
        },
        {
          "title": "Art Of Living DE",
          "language": "de"
        }
      ],
      "menu_order": 3,
      "child_details": [
        
      ]
    },
    {
      "_id": "60fec1071edb21accf5e4e4d",
      "title": "Services",
      "translate": [
        {
          "title": "Services FR",
          "language": "fr"
        },
        {
          "title": "Services DE",
          "language": "de"
        }
      ],
      "menu_order": 4,
      "child_details": [
        
      ]
    },
    {
      "_id": "60fec11b1edb21accf5e56d0",
      "title": "News",
      "translate": [
        {
          "title": "News FR",
          "language": "fr"
        },
        {
          "title": "News DE",
          "language": "de"
        }
      ],
      "menu_order": 5,
      "child_details": [
        
      ]
    },
    {
      "_id": "60fec1621edb21accf5e71b8",
      "title": "Contact",
      "translate": [
        {
          "title": "Contact FR",
          "language": "fr"
        },
        {
          "title": "Contact DE",
          "language": "de"
        }
      ],
      "menu_order": 6,
      "child_details": [
        
      ]
    }
  ],
  "message": "Menu fetched successfully."
}
*/
namedRouter.get("api.menu", '/menu/:menu_type', async (req, res) => {
    try {
        const success = await menuController.getAllMenus(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// Export the express.Router() instance
module.exports = router;