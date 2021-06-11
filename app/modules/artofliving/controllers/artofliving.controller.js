const artoflivingRepo = require('artofliving/repositories/artofliving.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class artOfLivingController {
    constructor() {
        this.artOfLiving = [];
    }

    /*
    // @Method: edit
    // @Description:  Coupon update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let artofliving = await artoflivingRepo.getByField();
            if (!_.isEmpty(artofliving)) {
                result.artofliving_data = artofliving;
                res.render('artofliving/views/edit.ejs', {
                    page_name: 'artofliving-management',
                    page_title: 'Home Content Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('artofliving.edit'));
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
            const artOfLivingId = req.body.id;
            let artOfLiving = await artoflivingRepo.getById(artOfLivingId);
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname.search('sectionImage') != -1) {
                        let fileIndex = file.fieldname.split('_')[1];
                        if (artOfLiving.sections[fileIndex]['image'] && artOfLiving.sections[fileIndex]['image'] != '' && fs.existsSync(`./public/uploads/artofliving/${artOfLiving.sections[fileIndex]['image']}`)) {
                            fs.unlinkSync(`./public/uploads/artofliving/${artOfLiving.sections[fileIndex]['image']}`);
                        }
                        req.body.sections[fileIndex]['image'] = file.filename;
                    } else {
                        if (artOfLiving[file.fieldname] && artOfLiving[file.fieldname] != '' && fs.existsSync(`./public/uploads/artofliving/${artOfLiving[file.fieldname]}`)) {
                            fs.unlinkSync(`./public/uploads/artofliving/${artOfLiving[file.fieldname]}`);
                        }
                        req.body[file.fieldname] = file.filename;
                    }
                });
            }

            let artOfLivingUpdateById = await artoflivingRepo.updateById(req.body, artOfLivingId);
            if (artOfLivingUpdateById) {
                req.flash('success', "Art Of Living Updated Successfully");
                res.redirect(namedRouter.urlFor('artofliving.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new artOfLivingController();