const artRepo = require('art/repositories/art.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});

class ArtController {
	constructor() {
		this.art = [];
	}

	async create(req, res) {
		try {
			res.render('art/views/create.ejs', {
				page_name: 'art-management',
				page_title: 'Create Art',
				user: req.user,
			});
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

	async store(req, res) {
		try {
			let art =  await artRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,'isDeleted':false});
			
			if (_.isEmpty(art)) {
                if (req.files.length > 0) {
                    gm('./public/uploads/art/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/art/thumb/' + req.files[0].filename, function (err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename;
                }
				let artSave = await artRepo.save(req.body); 
				if(artSave){
					req.flash('success', "Art created successfully.");
					res.redirect(namedRouter.urlFor('art.list'));
				}
			}
			else {
				req.flash('error', "This art already exist!");
				res.redirect(namedRouter.urlFor('art.list'));
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
            let art = await artRepo.getById(req.params.id);
            if (!_.isEmpty(art)) {
                result.art_data = art;
                res.render('art/views/edit.ejs', {
                    page_name: 'art-management',
                    page_title: 'Edit Art',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry art not found!");
                res.redirect(namedRouter.urlFor('art.list')); 
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
           let art =  await artRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,_id:{$ne:artId}});
            if (_.isEmpty(art)) {
                let artData = await artRepo.getById(artId);
                if (req.files.length > 0) {
                    if (fs.existsSync('./public/uploads/art/' + artData.image) && artData.image != '') {
                        fs.unlinkSync('./public/uploads/art/' + artData.image);
                    }
                    if (fs.existsSync('./public/uploads/art/thumb/' + artData.image) && artData.image != '') {
                        fs.unlinkSync('./public/uploads/art/thumb/' + artData.image);
                    }
                    gm('./public/uploads/art/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/art/thumb/' + req.files[0].filename, function (err, result) {
                        if (!err) console.log('done');
                    });
                    req.body.image = req.files[0].filename;
                }
                    let artUpdate = await artRepo.updateById(req.body,artId)
                    if(artUpdate) {
                        req.flash('success', "Art updated successfully");
                        res.redirect(namedRouter.urlFor('art.list'));
                    }
                    
                }else{
                req.flash('error', "Art is already available!");
                res.redirect(namedRouter.urlFor('art.edit', { id: artId }));
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
                res.render('art/views/list.ejs', {
                    page_name: 'art-management',
                    page_title: 'Art List',
                    user: req.user,
                    
                });
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }  
    };
   

	async getAll (req, res){
		try{
			let art = await artRepo.getAll(req);
			
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
			let art = await artRepo.getById(req.params.id);
			if(!_.isEmpty(art)){
				let artStatus = (art.status == "Active") ? "Inactive" : "Active";
				let artUpdate= await artRepo.updateById({"status": artStatus }, req.params.id);
				req.flash('success', "Art status has changed successfully" );
				res.redirect(namedRouter.urlFor('art.list'));
			}
			else {
				req.flash('error', "Sorry art not found");
				res.redirect(namedRouter.urlFor('art.list')); 
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
            let artDelete = await artRepo.updateById({ "isDeleted": true }, req.params.id);
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
                res.redirect(namedRouter.urlFor('art.list'));
            } 
        }catch(e){
            return res.status(500).send({message: e.message});   
        } 
    };

}

module.exports = new ArtController();