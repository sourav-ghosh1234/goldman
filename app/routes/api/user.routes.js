const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
// const querystring = require('querystring');
const multer = require('multer');
const userController = require('webservice/user.controller');
const fs = require('fs');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === 'profile_image') {
            if (!fs.existsSync('./public/uploads/user')) {
                fs.mkdirSync('./public/uploads/user');
            }
            callback(null, "./public/uploads/user");
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});
const request_param = multer();


// User List
// namedRouter.get("user.listing", '/user/listing', userController.list);

/**
 * @api {post} /user/signup User Signup
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} user_name Username
 * @apiParam {string} first_name Fisrtname
 * @apiParam {string} last_name Lastname
 * @apiParam {string} email Email
 * @apiParam {string} phone Phone
 * @apiParam {string} password Password
 * @apiParam {string} role Role [member / commissioner]
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "Kiley",
        "last_name": "Caldarera",
        "email": "kiley@yopmail.com",
        "phone": "7894561236",
        "password": "$2a$08$vQok9LE95JiR83nmSr/ULuysJtW/PVoxYmbFBzcI.9DaGe6ylxLMe",
        "profile_image": "",
        "user_name": "kiley123",
        "address": "",
        "social_id": "",
        "register_type": "normal",
        "deviceToken": "",
        "deviceType": "",
        "isVerified": false,
        "isDeleted": false,
        "isActive": true,
        "_id": "607d483437b125585ac9c0ca",
        "role": "6076ab8c026424da7313d5f2",
        "createdAt": "2021-04-19T09:07:00.952Z",
        "updatedAt": "2021-04-19T09:07:00.952Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2Q0ODM0MzdiMTI1NTg1YWM5YzBjYSIsImlhdCI6MTYxODgyMzIyMSwiZXhwIjoxNjIxNDE1MjIxfQ.h10xLUE9wEEJpPOBFUn8lv35fGmQJoLTQtA_lEHqE7c",
    "message": "Registration Successfull"
}
*/

namedRouter.post("api.user.signup", '/user/signup', request_param.any(), async(req, res) => {
    try {
        const success = await userController.signup(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /user/signin User Signin
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "Kiley",
        "last_name": "Caldarera",
        "email": "kiley@yopmail.com",
        "phone": "7894561236",
        "password": "$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2",
        "profile_image": "",
        "user_name": "kiley123",
        "address": "",
        "social_id": "",
        "register_type": "normal",
        "deviceToken": "",
        "deviceType": "",
        "isVerified": false,
        "isDeleted": false,
        "isActive": true,
        "_id": "607d49a63cc6d25ba089ce8e",
        "role": {
            "desc": "This is the commissioner role here",
            "_id": "6076ab8c026424da7313d5f2",
            "role": "commissioner",
            "roleDisplayName": "Commissioner",
            "id": "6076ab8c026424da7313d5f2"
        },
        "createdAt": "2021-04-19T09:13:10.809Z",
        "updatedAt": "2021-04-19T09:13:10.809Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2Q0OWE2M2NjNmQyNWJhMDg5Y2U4ZSIsImlhdCI6MTYxODgyMzk1NiwiZXhwIjoxNjIxNDE1OTU2fQ.G_9xifGKhKEVQJr7tHYIR_2MTG9_NFQW9Zj6MxSXezA",
    "message": "Login Successfull"
}
*/

namedRouter.post("api.user.signin", '/user/signin', request_param.any(), async(req, res) => {
    try {
        console.log("api routes");
        const success = await userController.signin(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /user/forgotpassword Forgot Password
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {},
    "message": "A email with new password has been sent to your email address."
}
*/
namedRouter.post("api.user.forgotpassword", '/user/forgotpassword', request_param.any(), async(req, res) => {
    try {
        const success = await userController.forgotPassword(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


namedRouter.post("api.user.updatepassword", '/user/updatepassword/:code', request_param.any(), async(req, res) => {
    try {
        const success = await userController.updatePassword(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /user/profile/:id Users Profile By Id
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "_id": "607d49a63cc6d25ba089ce8e",
        "first_name": "Kiley",
        "last_name": "Caldarera",
        "email": "kiley@yopmail.com",
        "phone": "7894561236",
        "password": "$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2",
        "profile_image": "",
        "user_name": "kiley123",
        "address": "",
        "social_id": "",
        "register_type": "normal",
        "deviceToken": "",
        "deviceType": "",
        "isVerified": false,
        "isDeleted": false,
        "isActive": true,
        "role": {
            "_id": "6076ab8c026424da7313d5f2",
            "role": "commissioner",
            "desc": "This is the commissioner role here",
            "roleDisplayName": "Commissioner"
        },
        "createdAt": "2021-04-19T09:13:10.809Z",
        "updatedAt": "2021-04-19T09:13:10.809Z"
    },
    "message": "Profile Fetched Successfully"
}
*/

namedRouter.get("api.user.userprofile", '/user/profile/:id', async (req, res) => {
    try {
        const success = await userController.getUserProfile(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});



namedRouter.all('/user*', auth.authenticate);

/**
 * @api {get} /user/myprofile Users Profile
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiHeader x-access-token Access Token
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "_id": "607d49a63cc6d25ba089ce8e",
        "first_name": "Kiley",
        "last_name": "Caldarera",
        "email": "kiley@yopmail.com",
        "phone": "7894561236",
        "password": "$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2",
        "profile_image": "",
        "user_name": "kiley123",
        "address": "",
        "social_id": "",
        "register_type": "normal",
        "deviceToken": "",
        "deviceType": "",
        "isVerified": false,
        "isDeleted": false,
        "isActive": true,
        "role": {
            "_id": "6076ab8c026424da7313d5f2",
            "role": "commissioner",
            "desc": "This is the commissioner role here",
            "roleDisplayName": "Commissioner"
        },
        "createdAt": "2021-04-19T09:13:10.809Z",
        "updatedAt": "2021-04-19T09:13:10.809Z"
    },
    "message": "Profile Fetched Successfully"
}
*/
namedRouter.get("api.user.myprofile", '/user/myprofile', async(req, res) => {
    try {
        const success = await userController.myProfile(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /user/update/profile Users Update Profile
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiHeader x-access-token Access Token
 * @apiParam first_name First Name 
 * @apiParam last_name Last Name 
 * @apiParam email Email 
 * @apiParam phone Phone 
 * @apiParam user_name User Name 
 * @apiParam profile_iamge Profile Image
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "first_name": "Kiley1",
        "last_name": "Caldarera1",
        "email": "kiley@yopmail.com",
        "phone": "7894561236",
        "password": "$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2",
        "profile_image": "profile_image_1618829292259_f2.png",
        "user_name": "kiley1234",
        "address": "",
        "social_id": "",
        "register_type": "normal",
        "deviceToken": "",
        "deviceType": "",
        "isVerified": false,
        "isDeleted": false,
        "isActive": true,
        "_id": "607d49a63cc6d25ba089ce8e",
        "role": "6076ab8c026424da7313d5f2",
        "createdAt": "2021-04-19T09:13:10.809Z",
        "updatedAt": "2021-04-19T10:48:12.516Z"
    },
    "message": "Profile updated Successfully"
}
*/

namedRouter.post("api.user.updateprofile", '/user/update/profile', uploadFile.any(), async(req, res) => {
    try {
        const success = await userController.updateProfile(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {post} /user/changepassword Change Password
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiHeader x-access-token Access Token
 * @apiParam currentPassword Current Password
 * @apiParam newPassword New Password
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "James",
        "last_name": "Smith",
        "company_name": "ABC LTD",
        "company_address": "San Jose",
        "address": "San Jose",
        "contact_name": "",
        "no_of_trucks": 1,
        "email": "james127@yopmail.com",
        "phone": 7894561236,
        "password": "$2a$08$/YbeyoLeDX3uOEaZmb8lr.UCWqZsaoi2gUk5INxsFfVoS8sIcX2D.",
        "profile_image": "profile_image_1616074620185_img1.jpg",
        "logo": "",
        "deviceToken": "",
        "deviceType": "",
        "per_car": 0,
        "per_hour": 0,
        "permit_number": "",
        "license_number": "",
        "gst_number": "",
        "qst_number": "",
        "rin_number": "",
        "register_type": "normal",
        "isDeleted": false,
        "isActive": true,
        "_id": "6053577c4f16609497a17e70",
        "role": "60337560026424da73ecff88",
        "createdAt": "2021-03-18T13:37:00.412Z",
        "updatedAt": "2021-03-18T14:26:10.135Z"
    },
    "message": "Password updated Successfully"
}
*/
namedRouter.post("api.user.changepassword", '/user/changepassword', uploadFile.any(), async(req, res) => {
    try {
        const success = await userController.changePassword(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


// Export the express.Router() instance
module.exports = router;