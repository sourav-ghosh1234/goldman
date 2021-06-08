const servicesRepo = require('services/repositories/services.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

class servicesController {
	constructor() {
		this.services = [];
	}

	async create(req, res) {
		try {
			res.render('services/views/create.ejs', {
				page_name: 'services-management',
				page_title: 'Create Services',
				user: req.user,
			});
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

	async store(req, res) {
		try {
			let services =  await servicesRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,'isDeleted':false});
			
			if (_.isEmpty(services)) {
				let servicesSave = await servicesRepo.save(req.body); 
				if(servicesSave){
					req.flash('success', "Services created successfully.");
					res.redirect(namedRouter.urlFor('services.list'));
				}
			}
			else {
				req.flash('error', "This services already exist!");
				res.redirect(namedRouter.urlFor('services.list'));
			}
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

    
    /*
    // @Method: edit
    // @Description:  services update page
    */
    async edit (req, res){
        try
        {
            let result = {};
            let services = await servicesRepo.getById(req.params.id);
            if (!_.isEmpty(services)) {
                result.services_data = services;
                res.render('services/views/edit.ejs', {
                    page_name: 'Services-management',
                    page_title: 'Edit Services',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry services not found!");
                res.redirect(namedRouter.urlFor('services.list')); 
            }
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }
    };

    /* @Method: update
    // @Description: services update action
    */
    async update (req, res){
        try {
            const servicesId = req.body.services_id;
           let services =  await servicesRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' } ,_id:{$ne:servicesId}});
            if (_.isEmpty(services)) {
                    let servicesUpdate = await servicesRepo.updateById(req.body,servicesId)
                    if(servicesUpdate) {
                        req.flash('success', "Services updated successfully");
                        res.redirect(namedRouter.urlFor('services.list'));
                    }
                    
                }else{
                req.flash('error', "Services is already available!");
                res.redirect(namedRouter.urlFor('services.edit', { id: servicesId }));
            }    
        }catch(e){
            return res.status(500).send({message: e.message});  
        }      
            
    };



    /* @Method: list
    // @Description: To get all the servicess from DB
    */
    async list (req, res){
            try{
                res.render('services/views/list.ejs', {
                    page_name: 'services-management',
                    page_title: 'Services List',
                    user: req.user
                });
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }  
    };
   

	async getAll (req, res){
		try{
			let services = await servicesRepo.getAll(req);
			
			if(_.has(req.body, 'sort')){
				var sortOrder = req.body.sort.sort;
				var sortField = req.body.sort.field;
			}
			else{
				var sortOrder = -1;
				var sortField = '_id';
			}
			let meta = {"page": req.body.pagination.page, "pages": services.pageCount, "perpage": req.body.pagination.perpage, "total": services.totalCount, "sort": sortOrder, "field": sortField};
			return {status: 200, meta: meta, data:services.data, message: `Data fetched succesfully.`};
		}
		catch(e){
			return {status: 500,data: [],message: e.message};
		}
	}
    /*
    // @Method: status_change
    // @Description: services status change action
    */
	async changeStatus (req, res){
		try {
			let services = await servicesRepo.getById(req.params.id);
			if(!_.isEmpty(services)){
				let servicesStatus = (services.status == "Active") ? "Inactive" : "Active";
				let servicesUpdate= await servicesRepo.updateById({"status": servicesStatus }, req.params.id);
				req.flash('success', "Services status has changed successfully" );
				res.redirect(namedRouter.urlFor('services.list'));
			}
			else {
				req.flash('error', "Sorry services not found");
				res.redirect(namedRouter.urlFor('services.list')); 
			}
		}
		catch(e){
			return res.status(500).send({message: e.message}); 
		}
	};

    /* @Method: delete
    // @Description: services delete
    */
    async destroy (req, res){
        try{
            let servicesDelete = await servicesRepo.updateById({ "isDeleted": true }, req.params.id);
            if(!_.isEmpty(servicesDelete)){
                req.flash('success','Services removed successfully');
                res.redirect(namedRouter.urlFor('services.list'));
            } 
        }catch(e){
            return res.status(500).send({message: e.message});   
        } 
    };

}

module.exports = new servicesController();