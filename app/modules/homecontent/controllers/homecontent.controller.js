const homecontentRepo = require('homecontent/repositories/homecontent.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class homeContentController {
    constructor() {
        this.homeContent = [];
    }

    /*
    // @Method: edit
    // @Description:  Coupon update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let homecontent = await homecontentRepo.getByField();
            if (!_.isEmpty(homecontent)) {
                result.homecontent_data = homecontent;
                res.render('homecontent/views/edit.ejs', {
                    page_name: 'homecontent-management',
                    page_title: 'Home Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('homecontent.edit'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: update
    // @Description: coupon update action
    */
    async update(req, res) {
        try {
            const homecontentId = req.body.id;
            let homeContent = await homecontentRepo.getById(homecontentId);
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname.search('banner') != -1) {
                        let fileIndex = file.fieldname.split('_')[1];
                        if (homeContent.banners[fileIndex]['image'] && homeContent.banners[fileIndex]['image'] != '' && fs.existsSync(`./public/uploads/homecontent/${homeContent.banners[fileIndex]['image']}`)) {
                            fs.unlinkSync(`./public/uploads/homecontent/${homeContent.banners[fileIndex]['image']}`);
                        }
                        req.body.banners[fileIndex]['image'] = file.filename;
                    } else {
                        if (homeContent.banners[file.fieldname] && homeContent.banners[file.fieldname] != '' && fs.existsSync(`./public/uploads/homecontent/${homeContent.banners[file.fieldname]}`)) {
                            fs.unlinkSync(`./public/uploads/homecontent/${homeContent.banners[file.fieldname]}`);
                        }
                        req.body[file.fieldname] = file.filename;
                    }
                });
            }

            let homecontentIdUpdate = await homecontentRepo.updateById(req.body, homecontentId);
            if (homecontentIdUpdate) {
                req.flash('success', "Home Content Updated Successfully");
                res.redirect(namedRouter.urlFor('homecontent.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new homeContentController();