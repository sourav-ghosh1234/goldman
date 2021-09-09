const artDecorRepo = require('art_decor/repositories/art_decor.repository');
const furnitureCategoryRepo = require('furniture_category/repositories/furniture_category.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});
const languageRepo = require('language/repositories/language.repository');
const colorRepo = require('color/repositories/color.repository');

class ArtController {
	constructor() {
		this.art = [];
	}

	async create(req, res) {
		try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active', isDeleted: false
            });
            let colourData = await colorRepo.getAllByField({'isDeleted':false,'status':'Active'});

            result.languages = languages;

			res.render('art_decor/views/create.ejs', {
				page_name: 'artDecor-management',
				page_title: 'Create Art Of Decor',
				user: req.user,
                response: colourData,
                result: result
			});
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

	async store(req, res) {
		try {
			let art =  await artDecorRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,'isDeleted':false});
			
			if (_.isEmpty(art)) {
                if (req.files.length > 0) {
                   req.body.imageGallery = [];
                   req.files.forEach(file => {
                       if (file.fieldname.search('gallery') != -1) {
                           let fileIndex = file.fieldname.split('_')[1];
                           gm('./public/uploads/artdecor/' + file.filename).resize(200, 200, '!').write('./public/uploads/artdecor/thumb/' + file.filename, function (err, result) {
                               if (!err) console.log('done');
                           });
                           req.body.imageGallery.push(file.filename);
                       } else {
                           gm('./public/uploads/artdecor/' + file.filename).resize(200, 200, '!').write('./public/uploads/artdecor/thumb/' + file.filename, function (err, result) {
                               if (!err) console.log('done');
                           });
                           req.body[file.fieldname] = file.filename;
                       }
                   });
                }
				let artSave = await artDecorRepo.save(req.body); 

				if(artSave){
					req.flash('success', "Art of decor created successfully.");
					res.redirect(namedRouter.urlFor('art-decor.list'));
				}
			}
			else {
				req.flash('error', "This art of decor already exist!");
				res.redirect(namedRouter.urlFor('art-decor.list'));
			}
		}
		catch(e) {
            console.log(e)
			throw ({ message: e.message });
		}
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
            
            let artDecorInfo = await artDecorRepo.getById(req.params.id);

            let colourData = await colorRepo.getAllByField({'isDeleted':false,'status':'Active'});;
            var translateArr = [];
            for (var i = 0; i < artDecorInfo.translate.length; i++) {
                translateArr[artDecorInfo.translate[i].language] = artDecorInfo.translate[i]
            }
            artDecorInfo.translate = translateArr;
            result.languages = languages;

            if (!_.isEmpty(artDecorInfo)) {
                result.artDecor_data = artDecorInfo;

                res.render('art_decor/views/edit.ejs', {
                    page_name: 'artDecor-management',
                    page_title: 'Edit Art Of Decor',
                    user: req.user,
                    response: colourData,
                    result: result
                });
            } else {
                req.flash('error', "Sorry art not found!");
                res.redirect(namedRouter.urlFor('artDecor.list')); 
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
            const artId = req.body.art_furniture_id;
           let artData =  await artDecorRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,_id:{$ne:artId}});

            if (_.isEmpty(artData)) {
                let artFurnitureData = await artDecorRepo.getById(artId);

                let imageArray = artFurnitureData.imageGallery;

                if (req.files && req.files.length > 0) {

                    req.files.forEach(file => {
                        if (file.fieldname.search('gallery') != -1) {
                            let fileIndex = file.fieldname.split('_')[1];
                            gm('./public/uploads/artdecor/' + file.filename).resize(200, 200, '!').write('./public/uploads/artdecor/thumb/' + file.filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            imageArray.push(file.filename);
                        } else {
                            gm('./public/uploads/artdecor/' + file.filename).resize(200, 200, '!').write('./public/uploads/artdecor/thumb/' + file.filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            req.body[file.fieldname] = file.filename;
                            if (artFurnitureData.image != null && artFurnitureData.image != '' && fs.existsSync(`./public/uploads/artdecor/${artFurnitureData.image}`)) {
                                fs.unlinkSync('./public/uploads/artdecor/' + artFurnitureData.image);
                            }
                        }
                    });
                }

                if (req.body.delImgIds) {
                    var delimageList = req.body.delImgIds.split(',');
                    imageArray = imageArray.filter(item => !delimageList.includes(item));
                    req.body.imageGallery = imageArray;

                    for (let i in delimageList) {
                        if (fs.existsSync(`./public/uploads/artdecor/${delimageList[i]}`)) {
                            fs.unlinkSync('./public/uploads/artdecor/' + delimageList[i]);
                        }
                        if (fs.existsSync(`./public/uploads/artdecor/thumb/${delimageList[i]}`)) {
                            fs.unlinkSync('./public/uploads/artdecor/thumb/' + delimageList[i]);
                        }
                    }
                } else {
                    req.body.imageGallery = imageArray;
                }
                    let artUpdate = await artDecorRepo.updateById(req.body,artId)
                    if(artUpdate) {
                        req.flash('success', "Art of Decor updated successfully");
                        res.redirect(namedRouter.urlFor('art-decor.list'));
                    }
                    
                }else{
                req.flash('error', "Art of furniture is already available!");
                res.redirect(namedRouter.urlFor('art-decor.edit', { id: artId }));
            }    
        }catch(e){
            return res.status(500).send({message: e.message});  
        }      
            
    };

    /* @Method: list
    // @Description: To get all the arts from DB
    */
    async list (req, res){
            try
            {
                let response = {};
                // //let furnitureCategory = await furnitureCategoryRepo.getAllByField({'isDeleted':false,'status':'Active'});
                // response.CategoryData = furnitureCategory;
                res.render('art_decor/views/list.ejs', {
                    page_name: 'artDecor-management',
                    page_title: 'Art Of Decor List',
                    user: req.user,
                    //response:response
                    
                });
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }  
    };
   

	async getAll (req, res){
		try{
			let art = await artDecorRepo.getAll(req);
			
			if(_.has(req.body, 'sort')){
				var sortOrder = req.body.sort.sort;
				var sortField = req.body.sort.field;
			}
			else{
				var sortOrder = -1;
				var sortField = '_id';
			}
			let meta = {"page": req.body.pagination.page, "pages": art.pageCount, "perpage": req.body.pagination.perpage, "total": art.totalCount, "sort": sortOrder, "field": sortField};
            return {status: 200, meta: meta, data:art.data, message: `Data fetched succesfully.`};
		}
		catch(e){
			return {status: 500,data: [],message: e.message};
		}
	}
    /*
    // @Method: status_change
    // @Description: art status change action
    */
	async changeStatus (req, res){
		try {
			let art = await artDecorRepo.getById(req.params.id);
			if(!_.isEmpty(art)){
				let artStatus = (art.status == "Active") ? "Inactive" : "Active";
				let artUpdate= await artDecorRepo.updateById({"status": artStatus }, req.params.id);
				req.flash('success', "Art of decor status has changed successfully" );
				res.redirect(namedRouter.urlFor('art-decor.list'));
			}
			else {
				req.flash('error', "Sorry art not found");
				res.redirect(namedRouter.urlFor('art-decor.list')); 
			}
		}
		catch(e){
			return res.status(500).send({message: e.message}); 
		}
	};

    /* @Method: delete
    // @Description: art delete
    */
    async destroy (req, res){
        try{
            let artDelete = await artDecorRepo.updateById({ "isDeleted": true }, req.params.id);
            if(!_.isEmpty(artDelete)){
                if(artDelete.image !== ''){
                    if (fs.existsSync('./public/uploads/artdecor/' + artDelete.image) && artDelete.image != '') {
                        fs.unlinkSync('./public/uploads/artdecor/' + artDelete.image);
                    }
                    if (fs.existsSync('./public/uploads/artdecor/thumb/' + artDelete.image) && artDelete.image != '') {
                        fs.unlinkSync('./public/uploads/artdecor/thumb/' + artDelete.image);
                    }
                }
                req.flash('success','Art of decor removed successfully');
                res.redirect(namedRouter.urlFor('art-decor.list'));
            } 
        }catch(e){
            return res.status(500).send({message: e.message});   
        } 
    };

}

module.exports = new ArtController();