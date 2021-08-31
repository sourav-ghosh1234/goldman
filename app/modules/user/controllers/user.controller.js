const mongoose = require('mongoose');
const UserModel = require('user/models/user.model');
const userRepo = require('user/repositories/user.repository');
const roleRepo = require('role/repositories/role.repository');
const cmsRepo = require('cms/repositories/cms.repository');
const mailer = require('../../../helper/mailer.js');

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
const newUser = new UserModel();




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
           // console.log("userData>>", userData)

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
            let members = await userRepo.getAllWithoutPaginate({ isDeleted: false, 'roleDetails.role': 'user' });
            let agents = await userRepo.getAllWithoutPaginate({ isDeleted: false, 'roleDetails.role': 'agent' });
           
            res.render('user/views/dashboard.ejs', {
                page_name: 'user-dashboard',
                page_title: 'Dashboard',
                user: req.user,
                cmsCount: (cmsCount >0)?cmsCount:0,
                memberCount:(members.length >0 )?members.length:0,
                agentCount:(agents.length >0 )?agents.length:0
                
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
                req.flash('error', "Email Already Exist.");
                res.redirect(namedRouter.urlFor('admin.profile', {id: id}));
            } 
            else {
                let userUpdate = await userRepo.updateById(req.body, id)
                if (!_.isEmpty(userUpdate)) {
                    req.flash('success', "Profile Updated Successfully.");
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
            req.flash('error', "Sorry User Not Found.");
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
                    req.flash('error', "Sorry Old Password and New Password Can't be Same!");
                    res.redirect(namedRouter.urlFor('admin.changepassword'));
                }
                else{
                    if (!newUser.validPassword(req.body.old_password, user.password)) {
                        req.flash('error', "Sorry Old Password Mismatch!");
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
                                req.flash('success', "Your Password Has Been Changed Successfully.");
                                res.redirect(namedRouter.urlFor('user.dashboard'));
                            }
                        }
                        else {
                            req.flash('error', "Your New Password and Confirm Password Does Not Match.");
                            res.redirect(namedRouter.urlFor('admin.changepassword'));
                        }
                    }
                }        
            } 
            else {
                req.flash('error', "Authentication Failed. Wrong Credentials.");
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
                        from: `My ISI-OMA Admin<${process.env.MAIL_USERNAME}>`,
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


    async list(req, res) {
        try {
            let users = await userRepo.getAllWithoutPaginate({ 'roleDetails.role': 'user', isDeleted: false, isActive: true });

            res.render('user/views/list.ejs', {
                page_name: 'user-management',
                page_title: 'User List',
                user: req.user,
                response: { users }
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAll
    // @Description: To get all the member from DB
    */
    async getAll(req, res) {
        try {
            req.body.role = 'user';
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }

            if (!_.has(req.body, 'pagination')) {
                req.body.pagination.page = 1;
                req.body.pagination.perpage = config.PAGINATION_PERPAGE;
            }
            let user = await userRepo.getAll(req);
            let meta = {
                "page": req.body.pagination.page,
                "pages": user.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": user.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: user.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            return {
                status: 500,
                data: [],
                message: e.message
            };
        }
    }


    async statusChange(req, res) {
        try {
            let user = await userRepo.getById(req.params.id);
            if (!_.isEmpty(user)) {
                let userStatus = (user.isActive == true) ? false : true;
                let userUpdate = await userRepo.updateById({ "isActive": userStatus }, req.params.id);
                req.flash('success', "User status has changed successfully.");
                res.redirect(namedRouter.urlFor('user.listing'));
            } 
            else {
                req.flash('error', "Sorry user not found");
                res.redirect(namedRouter.urlFor('user.listing'));
            }
        } 
        catch (e) {
            return res.status(500).send({message: e.message});
        }
    }


    async edit(req, res) {
        try {
            let result = {};
            let userData = await userRepo.getById(req.params.id);
           // let agencies = await memberRepo.getAllWithoutPaginate({ 'roleDetails.role': 'user', isDeleted: false, isActive: true });
            if (!_.isEmpty(userData)) {
                result.user_data = userData;
               // result.agency_data = agencies;
                res.render('user/views/edit.ejs', {
                    page_name: 'user-management',
                    page_title: 'Update User',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry user not found!");
                res.redirect(namedRouter.urlFor('user.listing'));
            }
        } catch (e) {
            throw e;
        }
    };


    async update(req, res) {
        try {
            //console.log(req.body)
            let userExists = await userRepo.getByField({ email: req.body.email, isDeleted: false, _id: { $ne: req.body.uid } });
            if (userExists) {
                req.flash('error', 'User exists with same email.');
                res.redirect(namedRouter.urlFor('user.listing'));
            }
            let userNameExists = await userRepo.getByField({ user_name: req.body.user_name, _id: { $ne: req.body.uid } });
            if (userNameExists) {
                req.flash('error', 'User exists with same username.');
                res.redirect(namedRouter.urlFor('user.listing'));
            }
            else {
                //console.log("req.files>>",req.files);
                let user = await userRepo.getById(req.body.uid);
                if (req.files.length > 0) {
                    req.body.profile_image = req.files[0].filename;
                    if (user.profile_image && user.profile_image != '' && fs.existsSync(`./public/uploads/user/${user.profile_image}`)) {
                        fs.unlinkSync(`./public/uploads/user/${user.profile_image}`);
                    }
                }
                let obj = {};
                if (_.has(req.body, 'password') && req.body.password == "") {
                    req.body.password = user.password;
                }
                else {
                    let User = new UserModel();
                    req.body.password = User.generateHash(user.password);
                }
                /*  req.body.per_car = parseFloat(req.body.per_car);
                req.body.per_hour = parseFloat(req.body.per_hour); */


                //console.log(req.body)
               // process.exit();


                let userUpdate = await userRepo.updateById(req.body, req.body.uid);

                //console.log("userUpdate>>", userUpdate)

                if (userUpdate) {

                    obj = {
                        'Name': userUpdate.first_name + ' ' + userUpdate.last_name,
                        'Email': userUpdate.email,
                    }

                    var mailOptions = {
                        from: `Admin<${process.env.MAIL_USERNAME}>`,
                        to: userUpdate.email,
                        subject: "Update your profile | My ISI-OMA",
                        html: `Hello ${userUpdate.first_name}, <br>
                        Your profile has been updated. check your details below:<br><br>
                        ${obj.Name}<br>${obj.Email}<br><br> Thank You`
                    };
                    let sendMail = await transporter.sendMail(mailOptions);

                   // console.log("sendMail>>", sendMail);

                    req.flash('success', 'User updated successfully.');
                    res.redirect(namedRouter.urlFor('user.listing'));
                }
                else {
                    res.redirect(namedRouter.urlFor('user.edit', {
                        id: req.body.uid
                    }));
                }
            }
        }
        catch (e) {
            console.log(e)
            throw e;
        }
    };


    async delete(req, res) {
        try {
            let userDelete = await userRepo.updateById({
                "isDeleted": true
            }, req.params.id)
            if (!_.isEmpty(userDelete)) {
                req.flash('success', 'User Removed Successfully');
                res.redirect(namedRouter.urlFor('user.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    async create(req, res) {
        try {
            let success = {};
            let roles = await roleRepo.getAll({});
            let agencies = await userRepo.getAllWithoutPaginate({ 'roleDetails.role': 'user', isDeleted: false, isActive: true });
            success = { roles, agencies };
            res.render('user/views/add.ejs', {
                page_name: 'user-management',
                page_title: 'Create User',
                user: req.user,
                response: success
            });
        } 
        catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    }

    async insert(req, res) {
        try {
            console.log(req.body);
            let pass;
            let role = await roleRepo.getByField({ role: 'user' });
           // console.log("role>>",role);
            let user = await userRepo.getByField({ 'email': req.body.email, 'isDeleted': false, 'role': role._id });
           // console.log("user>>", user);
            
            if (_.isEmpty(user)) {
               // console.log("csacsdac")
                let userUname = await userRepo.getByField({ 'user_name': req.body.user_name });
                if (_.isEmpty(userUname)) {
                    if (req.files.length > 0) {
                        req.body.profile_image = req.files[0].filename;
                    }
                    pass = req.body.password;
                    let usermodel = new UserModel();
                  //  console.log("usermodel>>", usermodel)
                    req.body.password = usermodel.generateHash(req.body.password);
                    req.body.role = role._id;
                  //  console.log(req.body);
                    let save = await userRepo.save(req.body);
                    if (save) {
                        let locals = {
                            role: 'user',
                            name: req.body.first_name,
                            email: req.body.email,
                            password: pass
                        };
                        let isMailSend = await mailer.sendMail(`Admin<${process.env.MAIL_USERNAME}>`, req.body.email, 'Account Created', 'account-creation', locals);

                        req.flash('success', 'The user has been created successfully.');
                        res.redirect(namedRouter.urlFor('user.listing'));
                    }
                }
                else {
                    req.flash('error', "Username Already Exists");
                    res.redirect(namedRouter.urlFor('user.create'));
                }
            }
            else {
                req.flash('error', "Email Already Exists");
                res.redirect(namedRouter.urlFor('user.create'));
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: e.message
            });
        }
    }

}

module.exports = new UserController();