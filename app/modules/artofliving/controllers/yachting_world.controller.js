const yachtingWorldRepo = require('artofliving/repositories/yachting_world.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class yachtingWorldController {
    constructor() {
        this.yachtingWorld = [];
    }

    /*
    // @Method: edit
    // @Description:  Coupon update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({ 'status': 'Active',isDeleted:false});
			result.languages = languages;
            let yachtingWorld = await yachtingWorldRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < yachtingWorld.translate.length; i++) {
                translateArr[yachtingWorld.translate[i].language] = yachtingWorld.translate[i];
			}
			yachtingWorld.translate = translateArr
            if (!_.isEmpty(yachtingWorld)) {
                result.yachting_world_data = yachtingWorld;
                res.render('artofliving/views/edit_yachting_world.ejs', {
                    page_name: 'yachting-world-management',
                    page_title: 'Yachting World Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Yachting World not found!");
                res.redirect(namedRouter.urlFor('yachting.World.edit'));
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
            const yachtingWorldId = req.body.id;
            let yachtingWorld = await yachtingWorldRepo.getById(yachtingWorldId);
            let imageArr = yachtingWorld.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname == 'bannerImage') {
                        if (yachtingWorld.bannerImage && yachtingWorld.bannerImage != '' && fs.existsSync(`./public/uploads/yachting_world/${yachtingWorld.bannerImage}`)) {
                            fs.unlinkSync(`./public/uploads/yachting_world/${yachtingWorld.bannerImage}`);
                        }
                        req.body.bannerImage = file.filename;
                    } else {
                        imageArr.push(file.filename);
                    } 
                });
            }
            
            // For delete image //
            if (req.body.delImgIds) {
                var delimageList = req.body.delImgIds.split(',');
                imageArr = imageArr.filter(item => !delimageList.includes(item));
                req.body.image = imageArr; 
            } else {
                req.body.image = imageArr; 
            }
            
            let yachtingWorldUpdateById = await yachtingWorldRepo.updateById(req.body, yachtingWorldId);
            if (yachtingWorldUpdateById) {
                req.flash('success', "Vineyard Yachting World Updated Successfully");
                res.redirect(namedRouter.urlFor('yachting.world.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new yachtingWorldController();