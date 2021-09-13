const propertyContentRepo = require('property_content/repositories/property_content.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});
const languageRepo = require('language/repositories/language.repository');

class PropertyContentController {
	constructor() {
		this.property = [];
	}

    /*
    // @Method: edit
    // @Description:  art update page
    */
    async edit (req, res){
        try
        {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active', isDeleted: false
            });
            
            let propertyContentInfo = await propertyContentRepo.getByField({'status':'Active', 'isDeleted': false});

            var translateArr = [];
            for (var i = 0; i < propertyContentInfo.translate.length; i++) {
                translateArr[propertyContentInfo.translate[i].language] = propertyContentInfo.translate[i]
            }
            propertyContentInfo.translate = translateArr;
            result.languages = languages;

            if (!_.isEmpty(propertyContentInfo)) {
                result.propertyContent_data = propertyContentInfo;

                res.render('property_content/views/edit.ejs', {
                    page_name: 'propertyContent-management',
                    page_title: 'Edit Property Content',
                    user: req.user,
                    result: result
                });
            } else {
                req.flash('error', "Sorry art not found!");
                res.redirect(namedRouter.urlFor('propertyContent.list')); 
            }
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }
    };

    /* @Method: update
    // @Description: art update action
    */
    async update (req, res){
        try {

           let propertyContent = await propertyContentRepo.getById(req.body.property_content_id);
            if (!_.isEmpty(propertyContent)) {

                if (req.files && req.files.length > 0) {

                    if(propertyContent.image !== ''){
                        if (fs.existsSync(`./public/uploads/propertyContent/${propertyContent.image}`)) {
                            fs.unlinkSync('./public/uploads/propertyContent/' + propertyContent.image);
                        }
                        if (fs.existsSync(`./public/uploads/propertyContent/thumb/${propertyContent.image}`)) {
                            fs.unlinkSync('./public/uploads/propertyContent/thumb/'+ propertyContent.image);
                        }
                    }
                    gm('./public/uploads/propertyContent/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/propertyContent/thumb/' + req.files[0].filename, function (err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename
                }
                let propertyContentUpdate = await propertyContentRepo.updateById(req.body,propertyContent._id)
                if(propertyContentUpdate) {
                    req.flash('success', "Property content updated successfully");
                    res.redirect(namedRouter.urlFor('property-content.edit'));
                }
                    
                }else{
                req.flash('error', "Property content is already available!");
                res.redirect(namedRouter.urlFor('property-content.edit'));
            }    
        }catch(e){
            return res.status(500).send({message: e.message});  
        }      
            
    };


}

module.exports = new PropertyContentController();