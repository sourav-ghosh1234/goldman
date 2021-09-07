const artofdecorRepo = require('artofdecor/repositories/artofdecor.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');


class artOfDecorController {
    constructor() {
        this.artOfDecor = [];
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
            let artofdecor = await artofdecorRepo.getByField();
            
            // This is for language section //
			var translateArr = [];
			for (var i = 0; i < artofdecor.translate.length; i++) {
                translateArr[artofdecor.translate[i].language] = artofdecor.translate[i];
			}
			artofdecor.translate = translateArr
            if (!_.isEmpty(artofdecor)) {
                result.artofdecor_data = artofdecor;
                res.render('artofdecor/views/edit.ejs', {
                    page_name: 'artofdecor-management',
                    page_title: 'Art Decor Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry Home Content not found!");
                res.redirect(namedRouter.urlFor('artofdecor.edit'));
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
            const artofDecorId = req.body.id;
            let artOfDecor = await artofdecorRepo.getById(artofDecorId);
            let imageArr = artOfDecor.image;
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname.search('sectionImage') != -1) {
                        let fileIndex = file.fieldname.split('_')[1];
                        if (artOfDecor.sections[fileIndex]['image'] && artOfDecor.sections[fileIndex]['image'] != '' && fs.existsSync(`./public/uploads/artofdecor/${artOfDecor.sections[fileIndex]['image']}`)) {
                            fs.unlinkSync(`./public/uploads/artofdecor/${artOfDecor.sections[fileIndex]['image']}`);
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
                
            }
            req.body.image = imageArr; 

            let artOfDecorUpdateById = await artofdecorRepo.updateById(req.body, artofDecorId);
            if (artOfDecorUpdateById) {
                req.flash('success', "Art Of Decor Updated Successfully");
                res.redirect(namedRouter.urlFor('artofdecor.edit'));
            }
        } catch (e) {
            console.log(66, e);
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new artOfDecorController();