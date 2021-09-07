const art_furnitureRepo = require('art_furniture/repositories/art_furniture.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class art_FurnitureController {
    constructor() {
        this.art_Furniture = [];
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
            let art_furniture = await art_furnitureRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < art_furniture.translate.length; i++) {
                translateArr[art_furniture.translate[i].language] = art_furniture.translate[i];
			}
			art_furniture.translate = translateArr
            if (!_.isEmpty(art_furniture)) {
                result.art_furniture_data = art_furniture;
                res.render('art_furniture/views/edit.ejs', {
                    page_name: 'art_furniture-management',
                    page_title: 'Art Furniture Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Art Furniture not found!");
                res.redirect(namedRouter.urlFor('art_furniture.edit'));
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
            const art_FurnitureId = req.body.id;
            let art_Furniture = await art_furnitureRepo.getById(art_FurnitureId);
            let imageArr = art_Furniture.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname.search('sectionImage') != -1) {
                        let fileIndex = file.fieldname.split('_')[1];
                        if (art_Furniture.sections[fileIndex]['image'] && art_Furniture.sections[fileIndex]['image'] != '' && fs.existsSync(`./public/uploads/art_furniture/${art_Furniture.sections[fileIndex]['image']}`)) {
                            fs.unlinkSync(`./public/uploads/art_furniture/${art_Furniture.sections[fileIndex]['image']}`);
                        }
                        req.body.sections[fileIndex]['image'] = file.filename;
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
            }
            
            let art_FurnitureUpdateById = await art_furnitureRepo.updateById(req.body, art_FurnitureId);
            if (art_FurnitureUpdateById) {
                req.flash('success', "Art Of Furniture Updated Successfully");
                res.redirect(namedRouter.urlFor('art_furniture.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new art_FurnitureController();