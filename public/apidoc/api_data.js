define({ "api": [
  {
    "type": "get",
    "url": "/user/myprofile",
    "title": "Users Profile",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"607d49a63cc6d25ba089ce8e\",\n        \"first_name\": \"Kiley\",\n        \"last_name\": \"Caldarera\",\n        \"email\": \"kiley@yopmail.com\",\n        \"phone\": \"7894561236\",\n        \"password\": \"$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2\",\n        \"profile_image\": \"\",\n        \"user_name\": \"kiley123\",\n        \"address\": \"\",\n        \"social_id\": \"\",\n        \"register_type\": \"normal\",\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"role\": {\n            \"_id\": \"6076ab8c026424da7313d5f2\",\n            \"role\": \"commissioner\",\n            \"desc\": \"This is the commissioner role here\",\n            \"roleDisplayName\": \"Commissioner\"\n        },\n        \"createdAt\": \"2021-04-19T09:13:10.809Z\",\n        \"updatedAt\": \"2021-04-19T09:13:10.809Z\"\n    },\n    \"message\": \"Profile Fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "GetUserMyprofile"
  },
  {
    "type": "get",
    "url": "/user/profile/:id",
    "title": "Users Profile By Id",
    "version": "1.0.0",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"607d49a63cc6d25ba089ce8e\",\n        \"first_name\": \"Kiley\",\n        \"last_name\": \"Caldarera\",\n        \"email\": \"kiley@yopmail.com\",\n        \"phone\": \"7894561236\",\n        \"password\": \"$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2\",\n        \"profile_image\": \"\",\n        \"user_name\": \"kiley123\",\n        \"address\": \"\",\n        \"social_id\": \"\",\n        \"register_type\": \"normal\",\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"role\": {\n            \"_id\": \"6076ab8c026424da7313d5f2\",\n            \"role\": \"commissioner\",\n            \"desc\": \"This is the commissioner role here\",\n            \"roleDisplayName\": \"Commissioner\"\n        },\n        \"createdAt\": \"2021-04-19T09:13:10.809Z\",\n        \"updatedAt\": \"2021-04-19T09:13:10.809Z\"\n    },\n    \"message\": \"Profile Fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "GetUserProfileId"
  },
  {
    "type": "post",
    "url": "/user/changepassword",
    "title": "Change Password",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "currentPassword",
            "description": "<p>Current Password</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"James\",\n        \"last_name\": \"Smith\",\n        \"company_name\": \"ABC LTD\",\n        \"company_address\": \"San Jose\",\n        \"address\": \"San Jose\",\n        \"contact_name\": \"\",\n        \"no_of_trucks\": 1,\n        \"email\": \"james127@yopmail.com\",\n        \"phone\": 7894561236,\n        \"password\": \"$2a$08$/YbeyoLeDX3uOEaZmb8lr.UCWqZsaoi2gUk5INxsFfVoS8sIcX2D.\",\n        \"profile_image\": \"profile_image_1616074620185_img1.jpg\",\n        \"logo\": \"\",\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"per_car\": 0,\n        \"per_hour\": 0,\n        \"permit_number\": \"\",\n        \"license_number\": \"\",\n        \"gst_number\": \"\",\n        \"qst_number\": \"\",\n        \"rin_number\": \"\",\n        \"register_type\": \"normal\",\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"_id\": \"6053577c4f16609497a17e70\",\n        \"role\": \"60337560026424da73ecff88\",\n        \"createdAt\": \"2021-03-18T13:37:00.412Z\",\n        \"updatedAt\": \"2021-03-18T14:26:10.135Z\"\n    },\n    \"message\": \"Password updated Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserChangepassword"
  },
  {
    "type": "post",
    "url": "/user/forgotpassword",
    "title": "Forgot Password",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {},\n    \"message\": \"A email with new password has been sent to your email address.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserForgotpassword"
  },
  {
    "type": "post",
    "url": "/user/signin",
    "title": "User Signin",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"Kiley\",\n        \"last_name\": \"Caldarera\",\n        \"email\": \"kiley@yopmail.com\",\n        \"phone\": \"7894561236\",\n        \"password\": \"$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2\",\n        \"profile_image\": \"\",\n        \"user_name\": \"kiley123\",\n        \"address\": \"\",\n        \"social_id\": \"\",\n        \"register_type\": \"normal\",\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"_id\": \"607d49a63cc6d25ba089ce8e\",\n        \"role\": {\n            \"desc\": \"This is the commissioner role here\",\n            \"_id\": \"6076ab8c026424da7313d5f2\",\n            \"role\": \"commissioner\",\n            \"roleDisplayName\": \"Commissioner\",\n            \"id\": \"6076ab8c026424da7313d5f2\"\n        },\n        \"createdAt\": \"2021-04-19T09:13:10.809Z\",\n        \"updatedAt\": \"2021-04-19T09:13:10.809Z\"\n    },\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2Q0OWE2M2NjNmQyNWJhMDg5Y2U4ZSIsImlhdCI6MTYxODgyMzk1NiwiZXhwIjoxNjIxNDE1OTU2fQ.G_9xifGKhKEVQJr7tHYIR_2MTG9_NFQW9Zj6MxSXezA\",\n    \"message\": \"Login Successfull\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserSignin"
  },
  {
    "type": "post",
    "url": "/user/signup",
    "title": "User Signup",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_name",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>Fisrtname</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>Lastname</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>Role [member / commissioner]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"Kiley\",\n        \"last_name\": \"Caldarera\",\n        \"email\": \"kiley@yopmail.com\",\n        \"phone\": \"7894561236\",\n        \"password\": \"$2a$08$vQok9LE95JiR83nmSr/ULuysJtW/PVoxYmbFBzcI.9DaGe6ylxLMe\",\n        \"profile_image\": \"\",\n        \"user_name\": \"kiley123\",\n        \"address\": \"\",\n        \"social_id\": \"\",\n        \"register_type\": \"normal\",\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"_id\": \"607d483437b125585ac9c0ca\",\n        \"role\": \"6076ab8c026424da7313d5f2\",\n        \"createdAt\": \"2021-04-19T09:07:00.952Z\",\n        \"updatedAt\": \"2021-04-19T09:07:00.952Z\"\n    },\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2Q0ODM0MzdiMTI1NTg1YWM5YzBjYSIsImlhdCI6MTYxODgyMzIyMSwiZXhwIjoxNjIxNDE1MjIxfQ.h10xLUE9wEEJpPOBFUn8lv35fGmQJoLTQtA_lEHqE7c\",\n    \"message\": \"Registration Successfull\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserSignup"
  },
  {
    "type": "post",
    "url": "/user/update/profile",
    "title": "Users Update Profile",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "user_name",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "profile_iamge",
            "description": "<p>Profile Image</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"Kiley1\",\n        \"last_name\": \"Caldarera1\",\n        \"email\": \"kiley@yopmail.com\",\n        \"phone\": \"7894561236\",\n        \"password\": \"$2a$08$hKMeXDseJJ06dqDOdVwCOuWSy8C9JT4a943Qkk6LUpgfx0kgnEJE2\",\n        \"profile_image\": \"profile_image_1618829292259_f2.png\",\n        \"user_name\": \"kiley1234\",\n        \"address\": \"\",\n        \"social_id\": \"\",\n        \"register_type\": \"normal\",\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"_id\": \"607d49a63cc6d25ba089ce8e\",\n        \"role\": \"6076ab8c026424da7313d5f2\",\n        \"createdAt\": \"2021-04-19T09:13:10.809Z\",\n        \"updatedAt\": \"2021-04-19T10:48:12.516Z\"\n    },\n    \"message\": \"Profile updated Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserUpdateProfile"
  }
] });
