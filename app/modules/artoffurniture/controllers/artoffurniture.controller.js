const artOfFurnitureRepo = require('artoffurniture/repositories/artoffurniture.repository');
const furnitureCategoryRepo = require('furniture_category/repositories/furniture_category.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const { Console } = require('console');
const gm = require('gm').subClass({
    imageMagick: true
});
const languageRepo = require('language/repositories/language.repository');

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
            let furnitureCategory = await furnitureCategoryRepo.getAllByField({'isDeleted':false,'status':'Active'});

            let colourData = [];

            result.languages = languages;

            console.log(result.languages,furnitureCategory);

			res.render('artoffurniture/views/create.ejs', {
				page_name: 'artoffurniture-management',
				page_title: 'Create Art Of Furniture',
				user: req.user,
                response: { furnitureCategory,colourData},
                result: result
			});
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

	async store(req, res) {
		try {
			let art =  await artOfFurnitureRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,'isDeleted':false});
			
			if (_.isEmpty(art)) {
                if (req.files.length > 0) {
                   console.log(req.files,'req.files',req.body)
                   req.body.imageGallery = [];
                   req.files.forEach(file => {
                       if (file.fieldname.search('gallery') != -1) {
                           let fileIndex = file.fieldname.split('_')[1];
                           gm('./public/uploads/artoffurniture/' + file.filename).resize(200, 200, '!').write('./public/uploads/artoffurniture/thumb/' + file.filename, function (err, result) {
                               if (!err) console.log('done');
                           });
                           req.body.imageGallery.push(file.filename);
                       } else {
                           gm('./public/uploads/artoffurniture/' + file.filename).resize(200, 200, '!').write('./public/uploads/artoffurniture/thumb/' + file.filename, function (err, result) {
                               if (!err) console.log('done');
                           });
                           req.body[file.fieldname] = file.filename;
                       }
                   });
                }
				let artSave = await artOfFurnitureRepo.save(req.body); 

                console.log(artSave,'artSave')

				if(artSave){
					req.flash('success', "Art of furniture created successfully.");
					res.redirect(namedRouter.urlFor('artoffurniture.list'));
				}
			}
			else {
				req.flash('error', "This art of furniture already exist!");
				res.redirect(namedRouter.urlFor('artoffurniture.list'));
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
            let furnitureCategory = await furnitureCategoryRepo.getAllByField({'isDeleted':false,'status':'Active'});
            let artOfFurnitureInfo = await artOfFurnitureRepo.getById(req.params.id);

            let colourData = [];

            result.languages = languages;

            if (!_.isEmpty(artOfFurnitureInfo)) {
                result.artoffurniture_data = artOfFurnitureInfo;

                res.render('artoffurniture/views/edit.ejs', {
                    page_name: 'artoffurniture-management',
                    page_title: 'Edit Art Of Furniture',
                    user: req.user,
                    response: { furnitureCategory,colourData},
                    result: result
                });
            } else {
                req.flash('error', "Sorry art not found!");
                res.redirect(namedRouter.urlFor('artoffurniture.list')); 
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
            const artId = req.body.art_id;
           let art =  await artOfFurnitureRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,_id:{$ne:artId}});
            if (_.isEmpty(art)) {
                let artData = await artOfFurnitureRepo.getById(artId);
                if (req.files.length > 0) {


                 
                }
                    let artUpdate = await artOfFurnitureRepo.updateById(req.body,artId)
                    if(artUpdate) {
                        req.flash('success', "Art updated successfully");
                        res.redirect(namedRouter.urlFor('artoffurniture.list'));
                    }
                    
                }else{
                req.flash('error', "Art is already available!");
                res.redirect(namedRouter.urlFor('artoffurniture.edit', { id: artId }));
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
                res.render('artoffurniture/views/list.ejs', {
                    page_name: 'artoffurniture-management',
                    page_title: 'Art Of Furniture List',
                    user: req.user,
                    
                });
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }  
    };
   

	async getAll (req, res){
		try{
			let art = await artOfFurnitureRepo.getAll(req);
			
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
			let art = await artOfFurnitureRepo.getById(req.params.id);
			if(!_.isEmpty(art)){
				let artStatus = (art.status == "Active") ? "Inactive" : "Active";
				let artUpdate= await artOfFurnitureRepo.updateById({"status": artStatus }, req.params.id);
				req.flash('success', "Art status has changed successfully" );
				res.redirect(namedRouter.urlFor('artoffurniture.list'));
			}
			else {
				req.flash('error', "Sorry art not found");
				res.redirect(namedRouter.urlFor('artoffurniture.list')); 
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
            let artDelete = await artOfFurnitureRepo.updateById({ "isDeleted": true }, req.params.id);
            if(!_.isEmpty(artDelete)){
                if(artDelete.image !== ''){
                    if (fs.existsSync('./public/uploads/art/' + artDelete.image) && artDelete.image != '') {
                        fs.unlinkSync('./public/uploads/art/' + artDelete.image);
                    }
                    if (fs.existsSync('./public/uploads/art/thumb/' + artDelete.image) && artDelete.image != '') {
                        fs.unlinkSync('./public/uploads/art/thumb/' + artDelete.image);
                    }
                }
                req.flash('success','Art removed successfully');
                res.redirect(namedRouter.urlFor('artoffurniture.list'));
            } 
        }catch(e){
            return res.status(500).send({message: e.message});   
        } 
    };

}

module.exports = new ArtController();