const mongoose = require('mongoose');
const User = require('user/models/user.model');
const userRepo = require('user/repositories/user.repository');
const roleRepo = require('role/repositories/role.repository');
const cmsRepo = require('cms/repositories/cms.repository');

const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const gm = require('gm').subClass({
    imageMagick: true
});
const fs = require('fs');
const jwt = require('jsonwebtoken');
//mail send 
const { join } = require('path');
const ejs = require('ejs');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
var request = require('request');
const newUser = new User();




class UserController {
    constructor() {
        this.users = [];

    }

    /* @Method: login
    // @Description: user Login Render
    */
    async login(req, res) {
        res.render('user/views/login.ejs');
    };

    /* @Method: signin
    // @Description: user Login
    */
    async signin(req, res) {
        try {
            let userData = await userRepo.fineOneWithRole(req.body);

            if (userData.status == 500) {
                req.flash('error', userData.message);
                res.redirect('/');
                //return res.redirect(namedRouter.urlFor('user.login'));
            }
            let user = userData.data;
            if (!_.isEmpty(user.role) && user.role.role == 'admin') {
                const payload = {
                    id: user._id
                };

                let token = jwt.sign(payload, config.jwtSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                req.session.token = token;
                req.user = user;
                let user_details = {};

                user_details.id = user._id;
                user_details.name = user.first_name + ' ' + user.last_name;
                user_details.email = user.email;
                // return the information including token as JSON
                req.flash('success', "You have successfully logged in");
                res.redirect(namedRouter.urlFor('user.dashboard'));
            } else {
                req.flash('error', 'Authentication failed. You are not a valid user.');
                res.redirect('/');
                //res.redirect(namedRouter.urlFor('user.login'));
            }
        } catch (e) {
            throw e;
        }
    };


    /* @Method: Dashboard
    // @Description: User Dashboard
    */
    async dashboard(req, res) {
        try {
            let user = await userRepo.getLimitUserByField({
                'isDeleted': false,
                'role.role': 'admin'
            });
            let resultall = {
                'user': user
            };

            let role = await roleRepo.getByField({ "role": "admin" });

            // let userCount = await userRepo.getCount({ "role": { "$ne": mongoose.Types.ObjectId(role._id) }, "isDeleted": false, "isActive": true });

            let cmsCount = await cmsRepo.getCmsCount({ "isDeleted": false });
            let commissioners = await userRepo.getAllWithoutPaginate({ isDeleted: false, 'roleDetails.role': 'commissioner' });
            let members = await userRepo.getAllWithoutPaginate({ isDeleted: false, 'roleDetails.role': 'member' });
            
            let notifications = await notificationRepo.getAllWithoutPaginate({ isDeleted: false });
            


            res.render('user/views/dashboard.ejs', {
                page_name: 'user-dashboard',
                page_title: 'Dashboard',
                user: req.user,
                cmsCount: (cmsCount >0)?cmsCount:0,
                memberCount:(members.length >0 )?members.length:0,
                commissionerCount:(commissioners.length >0 )?commissioners.length:0,
               
                notificationCount: (notifications.length > 0) ? notifications.length : 0,
               
            });

        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };



    /* @Method: Logout
    // @Description: User Logout
    */
    async logout(req, res) {
        req.session.destroy(function(err) {
            //res.redirect('/' + process.env.ADMIN_FOLDER_NAME);
            res.redirect('/');
        });
        // req.session.token = "";
        // req.session.destroy();
        // return res.redirect('/');
    };

    /* @Method: viewmyprofile
    // @Description: To get Profile Info from db
    */
    async viewmyprofile(req, res) {
        try {
            const id = req.params.id;
            let user = await userRepo.getById(id);
            if (!_.isEmpty(user)) {
                res.render('user/views/myprofile.ejs', {
                    page_name: 'user-profile',
                    page_title: 'My Profile',
                    user: req.user,
                    response: user
                });

            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    }

    /* @Method: updateprofile
    // @Description: Update My Profile 
    */
    async updateprofile(req, res) {
        try {
            const id = req.body.id;
            var chkEmail = {
                isDeleted: false,
                email: req.body.email,
                _id: { $ne: mongoose.Types.ObjectId(id) }
            };
            let checkEmail = await userRepo.getByField(chkEmail);
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', "Email already exist.");
                res.redirect(namedRouter.urlFor('admin.profile', {id: id}));
            } 
            else {
                let userUpdate = await userRepo.updateById(req.body, id)
                if (!_.isEmpty(userUpdate)) {
                    req.flash('success', "Profile updated successfully.");
                    res.redirect(namedRouter.urlFor('user.dashboard'));
                }
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: changepassword
    // @Description: user changepassword Render
    */
    async adminChangePassword(req, res) {
        var user = await userRepo.getById(req.user._id);
        if (user) {
            res.render('user/views/change_password.ejs', {
                page_name: 'user-changepassword',
                page_title: 'Change Password',
                response: user,
                user: req.user
            });
        } else {
            req.flash('error', "sorry user not found.");
            res.redirect(namedRouter.urlFor('user.dashboard'));
        }

    };

    /*
    // @Method: updatepassword
    // @Description: User password change
    */

    async adminUpdatePassword(req, res) {
        try {
            let user = await userRepo.getById(req.user._id);
            if (!_.isEmpty(user)) {
                // check if password matches
                if (req.body.old_password == req.body.password){
                    req.flash('error', "Sorry old password and new password can't be same!");
                    res.redirect(namedRouter.urlFor('admin.changepassword'));
                }
                else{
                    if (!newUser.validPassword(req.body.old_password, user.password)) {
                        req.flash('error', "Sorry old password mismatch!");
                        res.redirect(namedRouter.urlFor('admin.changepassword'));
                    }
                    else {
                        if (req.body.password == req.body.password_confirm) {
                            // if user is found and password is right, check if he is an admin
                            let new_password = req.user.generateHash(req.body.password);
                            let userUpdate = await userRepo.updateById({
                                "password": new_password
                            }, req.body.id);

                            if (userUpdate) {
                                req.flash('success', "Your password has been changed successfully.");
                                res.redirect(namedRouter.urlFor('user.dashboard'));
                            }
                        }
                        else {
                            req.flash('error', "Your New Password And Confirm Password does not match.");
                            res.redirect(namedRouter.urlFor('admin.changepassword'));
                        }
                    }
                }        
            } 
            else {
                req.flash('error', "Authentication failed. Wrong credentials.");
                res.redirect(namedRouter.urlFor('admin.changepassword'));
            }
        } 
        catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: forgotPassword
    // @Description: User forgotPassword
    */

    async forgotPassword(req, res) {

        try {
            let roleDetails = await roleRepo.getByField({ role: "admin" });
            let result = {};
            let user = await User.findOne({ email: req.body.email, role: mongoose.Types.ObjectId(roleDetails._id) }).exec();
            if (!user) {
                result.status = 500;
                return res.status(201).send({ "result": result, "message": "User not found", "status": false });
            } else {
                let random_pass = Math.random().toString(36).substr(2, 9);
                let readable_pass = random_pass;
                random_pass = user.generateHash(random_pass);
                let user_details = await User.findByIdAndUpdate(user._id, { password: random_pass }).exec();
                if (!user_details) {
                    result.status = 500;
                    return res.status(201).send({ "result": result, "message": "User not found", "status": false });
                } else {
                    var mailOptions = {
                        from: `Goldman Prestige Admin<${process.env.MAIL_USERNAME}>`,
                        to: req.body.email,
                        subject: "Forget Password",
                        html: 'Hello ' + '<b>' + user.first_name + '</b>' + ',<br><br>We have received a request to reset your password.<br><br>Here is your new password: <span><b>' + readable_pass + '</b></span><br><br>Thank You'
                    };
                    let sendMail = await transporter.sendMail(mailOptions);
                    if (sendMail) {
                        result.status = 200;
                        return res.status(200).send({ "result": result, "message": "Mail is sending to your mail id with new password", "status": false });
                    }
                }
            }
        } catch (e) {

            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new UserController();