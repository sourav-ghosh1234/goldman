const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const Cryptr = require('cryptr');

const userRepo = require('user/repositories/user.repository');
const roleRepo = require('role/repositories/role.repository');
const userModel = require('user/models/user.model');
const config = require('../../config');
const cryptr = new Cryptr(config.jwtSecret);

class userController {

    constructor() {
        this.user = [];
    }


    async signup(req, res) {
        try {
            const User = new userModel();
            let isEmailExists = await userRepo.getByField({ email: req.body.email, isDeleted: false });
            if (isEmailExists) {
                return { status: 201, data: [], message: 'Email Id already exists with the same account' };
            }
            let role = await roleRepo.getByField({ role: req.body.role });
            req.body.role = role._id;

           /*  let random_pass = Math.random().toString(36).substr(2, 9);
            const readable_pass = random_pass; */

           // random_pass = User.generateHash(random_pass);
            let random_pass = User.generateHash(req.body.password);

            let isMailSend = await transporter.sendMail({
                from: `Admin<${process.env.MAIL_USERNAME}>`,
                to: req.body.email,
                subject: 'Temporary Password',
                html: 'Hello ' + req.body.first_name + ',<br><br>Your Password is : ' + req.body.password + ' <br><br>Thank you.'
            });

           // console.log("isMailSend>>", isMailSend);

           //let updatePassword = await userRepo.updateById({ password: random_pass }, user._id);

            if (isMailSend){
                req.body.password = random_pass;
                let userData = await userRepo.save(req.body);
                let user_id = userData._id;

                if (!_.isEmpty(userData)) {
                    // let emaildata = await this.sendVerificationEmail(req);

                    const payload = { id: user_id };
                    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });

                    return { status: 200, data: userData, token, message: 'Registration Successfull' };
                }
                else {
                    return { status: 200, data: [], message: 'Somethig went wrong.' };
                }
            }
        } 
        catch (e) {
            // console.log(40, e);
            return { status: 500, "message": e.message };
        }
    }

    async signin(req, res) {
        try {
            let user = await userRepo.getByField({ email: req.body.email, isDeleted: false });
            if (user.isActive == false) {
                return { status: 201, data: [], message: 'User is Blocked' };
            }
            let role = await roleRepo.getByField({ '_id': user.role });
            /* if (role.role != 'agency') {
                return { status: 201, data: [], message: 'Insuffcient Access' };
            } */
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return { status: 201, data: [], message: 'Wrong Password' };
            }
            const payload = { id: user._id };
            const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });
            user.role = role;
            return { status: 200, data: user, token, message: 'Login Successfull' };
        } catch (e) {
            return { status: 500, "message": e.message };
        }
    }

    /* @Method: forgotPassword
     // @Description: Password resent mail will be sent
     */
    //
    
    async forgotPassword(req, res) {
        try {

            let user = await userRepo.getByField({ email: req.body.email });

           // let role = await roleRepo.getByField({ role: 'user' });

            //if (user && role._id.toString() == user.role.toString()) {
            if (user) {

                let random_pass = Math.random().toString(36).substr(2, 9);
                const readable_pass = random_pass;

                random_pass = user.generateHash(random_pass);

                await transporter.sendMail({
                    from: `Admin<${process.env.MAIL_USERNAME}>`,
                    to: req.body.email,
                    subject: 'Reset Password Request',
                    html: 'Hello ' + user.first_name + ',<br><br>Your New Password is : ' + readable_pass + '. <br><br>Thank you.'
                });
                let updatePassword = await userRepo.updateById({ password: random_pass }, user._id);

                return { status: 200, data: {}, "message": 'A email with new password has been sent to your email address.' };

            } else {
                return { status: 201, data: {}, message: `No user found.` };
            }
        } catch (e) {
            return { status: 500, data: {}, message: e.message };
        }
    }

    
   

    /* @Method: updatePassword
    // @Description: Will reset the password
    */
    //
    async updatePassword(req, res) {
        try {
            var d = new Date();
            var obj = JSON.parse(cryptr.decrypt(req.body.code));
            let customer_id = obj.id;
            let userData = await userRepo.getById(customer_id);
            if (!_.isEmpty(userData) && userData.isActive == true && userData.isDeleted == false) {
                const User = new userModel();
                let newPassword = User.generateHash(req.body.password);
                let updatedUser = await userRepo.updateById({ password: newPassword }, customer_id);
                if (updatedUser) {
                    return { status: 200, data: updatedUser, message: 'Password Changed Successfully.' }
                }
            } else {
                return { status: 201, data: [], message: 'User not Found.' };
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    async myProfile(req, res) {
        try {
            let user = await userRepo.getByIdWithPopulate(req.user._id);
            if (!user) {
                return { status: 201, data: user, message: 'User Not Found' };
            }
            return { status: 200, data: user, message: 'Profile Fetched Successfully' };
        } catch (e) {
            return { status: 500, message: e.message };
        }
    }


    async getUserProfile(req, res) {
        try {
            let user = await userRepo.getByIdWithPopulate(req.params.id);
            if (!user) {
                return { status: 201, data: user, message: 'User Not Found' };
            }
            return { status: 200, data: user, message: 'Profile Fetched Successfully' };
        } catch (e) {
            return { status: 500, message: e.message };
        }
    }

    async updateProfile(req, res) {
        try {
            let user = await userRepo.getById(req.user._id);
            if (!user) {
                return { status: 201, data: user, message: 'User Not Found' };
            }
            if (req.body.email && req.body.email != '') {
                let userExists = await userRepo.getByField({ email: req.body.email, isDeleted: false, _id: { $ne: req.user._id } });
                if (userExists) {
                    return { status: 201, data: [], message: 'Email already taken' };
                }
            }
            let role = await roleRepo.getByField({ '_id': user.role });
            if (req.files.length > 0) {
                req.body.profile_image = req.files[0].filename;
                if (user.profile_image && user.profile_image != '' && fs.existsSync(`./public/uploads/user/${user.profile_image}`)) {
                    fs.unlinkSync(`./public/uploads/user/${user.profile_image}`);
                }
            }
            else{
                req.body.profile_image = user.profile_image;
            }

            let updateUser = await userRepo.updateById(req.body, req.user._id);
            if (!updateUser) {
                return { status: 201, data: [], message: 'Something went Wrong' };
            }
            return { status: 200, data: updateUser, message: 'Profile updated Successfully' };
        } 
        catch (e) {
            return { status: 500, message: e.message };
        }
    }

    async changePassword(req, res) {
        try {
            //let user = await userRepo.getByField({ email: req.body.email, isDeleted: false });
            let user = await userRepo.getById(req.user._id);
            if (!bcrypt.compareSync(req.body.currentPassword, user.password)) {
                return { status: 201, data: [], message: 'Wrong current Password' };
            }
            let User = new userModel();
            req.body.password = User.generateHash(req.body.newPassword);

            let updateUser = await userRepo.updateById(req.body, req.user._id);
            if (!updateUser) {
                return { status: 201, data: [], message: 'Something went Wrong' };
            }
            return { status: 200, data: updateUser, message: 'Password updated Successfully' };
        } catch (e) {
            return { status: 500, message: e.message };
        }
    }

}

module.exports = new userController();