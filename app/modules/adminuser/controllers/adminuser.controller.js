const adminuserRepo = require('adminuser/repositories/adminuser.repository');
const roleRepo = require('role/repositories/role.repository');
const User = require('user/models/user.model');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const errorHandler = require('../../../errorHandler');


class adminuserController {

    /* @Method: create
    // @Description: create adminuser action
    */
    async create(req, res) {
        try {
            let adminRoles = await roleRepo.getAllByField({ rolegroup: "backend" });
            res.render('adminuser/views/add.ejs', {
                page_name: 'adminuser-management',
                page_title: 'Admin User Create',
                user: req.user,
                response: adminRoles
            });
        } catch (e) {
            throw (e);
        }
    };

    /* @Method: insert
    // @Description: save adminuser action
    */
    async insert(req, res) {
        try {
            let checkEmailQuery = { "isDeleted": false, 'email': { $regex: req.body.email.toLowerCase(), $options: "i" } };

            let checkEmail = await adminuserRepo.getByField(checkEmailQuery);
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', 'Admin User already available.');
                res.redirect(namedRouter.urlFor('adminuser.listing'));
            } else {
                let originalPassword = req.body.password;
                const newadminuser = new User();
                req.body.password = newadminuser.generateHash(req.body.password);

                if (req.files && req.files.length > 0) {
                    for (let i = 0; i < req.files.length; i++) {
                        req.body.profile_image = req.files[i].filename;
                    }
                }
                let saveadminuser = await adminuserRepo.save(req.body);

                // let fullName = req.body.first_name + ' ' + req.body.last_name;
                // let welcomeEmailWithCredentials = await emailTemplateRepo.getByField({ slug: 'welcome-email-with-login-credentials' })
                // let emailContent = welcomeEmailWithCredentials.content.replace('[fullName]', fullName)
                //     .replace('[email]', req.body.email)
                //     .replace('[password]', originalPassword)
                // var mailOptions = {
                //     from: `AllFive<${process.env.MAIL_USERNAME}>`,
                //     to: req.body.email,
                //     subject: welcomeEmailWithCredentials.subject,
                //     html: emailContent
                // };
                // let sendWelcomeEmail = await transporter.sendMail(mailOptions);

                req.flash('success', 'Admin User created successfully.');
                res.redirect(namedRouter.urlFor('adminuser.listing'));
            }
        } catch (e) {
            console.log(e);
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('adminuser.create'));
        }
    };

    /*
    // @Method: edit
    // @Description:  adminuser edit page
    */
    async edit(req, res) {
        try {
            let adminRoles = await roleRepo.getAllByField({ rolegroup: "backend" });
            let adminUser = await adminuserRepo.getById(req.params.id);
            if (!_.isEmpty(adminUser)) {
                res.render('adminuser/views/edit.ejs', {
                    page_name: 'adminuser-management',
                    page_title: 'Admin User Edit',
                    user: req.user,
                    response: { adminUser, adminRoles }
                });
            } else {
                req.flash('error', "Sorry Admin User not found!");
                res.redirect(namedRouter.urlFor('adminuser.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: adminuser update action
    */
    async update(req, res) {
        try {
            const adminuserId = req.body.adminuser_id;

            // console.log(req.files);
            let adminuserValue = await adminuserRepo.getById(req.body.adminuser_id);
            if (req.files && req.files.length > 0) {

                if (fs.existsSync('./public/uploads/adminuser/' + adminuserValue.profile_image) && adminuserValue.profile_image) {
                    fs.unlinkSync('./public/uploads/adminuser/' + adminuserValue.profile_image);
                }

                for (let i = 0; i < req.files.length; i++) {
                    req.body.profile_image = req.files[i].filename;
                }
                // console.log("k");
            }
            //  console.log("k1");

            let adminuserUpdate = await adminuserRepo.updateById(req.body, adminuserId);
            // console.log(adminuserUpdate);
            if (adminuserUpdate) {
                req.flash('success', "Admin User Updated Successfully");
                res.redirect(namedRouter.urlFor('adminuser.listing'));
            } else {
                res.redirect(namedRouter.urlFor('adminuser.edit', { id: adminuserId }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('adminuser.edit', { id: req.body.adminuser_id }));
        }
    };

    /* @Method: list
    // @Description: To list all the adminuser from DB
    */
    async list(req, res) {
        try {
            let adminRoles = await roleRepo.getAllByField({ rolegroup: "backend" });
            res.render('adminuser/views/list.ejs', {
                page_name: 'adminuser-management',
                page_title: 'adminuser List',
                user: req.user,
                response: adminRoles
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the adminuser from DB
    */
    async getAll(req, res) {
        try {
            let adminuserRole = await roleRepo.getAllByField({ rolegroup: "backend" });
            let allowedRoles = adminuserRole.map(role => {
                return role._id;
            });
            req.body.role = allowedRoles;

            let adminuserDetails = await adminuserRepo.getAll(req);

            // console.log(' <><> ', adminuserDetails);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = 1;
                var sortField = 'name';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": adminuserDetails.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": adminuserDetails.totalCount,
                "sort": sortOrder,
                "field": sortField
            };
            return {
                status: 200,
                meta: meta,
                data: adminuserDetails.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: delete
    // @Description: adminuser delete
    */
    async delete(req, res) {
        try {
            let adminuserValue = await adminuserRepo.getById(req.params.id);
            if (fs.existsSync('./public/uploads/adminuser/' + adminuserValue.profile_image) && adminuserValue.profile_image) {
                fs.unlinkSync('./public/uploads/adminuser/' + adminuserValue.profile_image);
            }
            let adminuserDelete = await adminuserRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'Admin User removed successfully');
            res.redirect(namedRouter.urlFor('adminuser.listing'));
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /*
    // @Method: statusChange
    // @Description: adminuser status change action
    */
    async statusChange(req, res) {
        try {
            let adminuser = await adminuserRepo.getById(req.params.id);
            if (!_.isEmpty(adminuser)) {
                let adminuserStatus = (adminuser.isActive == true) ? false : true;
                let adminuserUpdate = adminuserRepo.updateById({ 'isActive': adminuserStatus }, req.params.id);
                req.flash('success', "Admin User status has changed successfully");
                res.redirect(namedRouter.urlFor('adminuser.listing'));
                //res.send(adminuserUpdate);
            } else {
                req.flash('error', "Sorry Admin User data not found");
                res.redirect(namedRouter.urlFor('adminuser.listing'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new adminuserController();