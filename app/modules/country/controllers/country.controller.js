const countryRepo = require('country/repositories/country.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

class countryController {
	constructor() {
		this.country = [];
	}

	async create(req, res) {
		try {
			res.render('country/views/create.ejs', {
				page_name: 'country-management',
				page_title: 'Create Country',
				user: req.user,
			});
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

	async store(req, res) {
		try {
			let country =  await countryRepo.getByField({ 'country_name': { $regex: req.body.country_name, $options: 'i' } ,'isDeleted':false});
			//let country = await countryRepo.getByField({ 'country_name': req.body.title, 'isDeleted': false });
			//console.log("29>>",country); process.exit();
			
			if (_.isEmpty(country)) {
				let countrySave = await countryRepo.save(req.body); 
				if(countrySave){
					req.flash('success', "Country created successfully.");
					res.redirect(namedRouter.urlFor('country.list'));
				}    
			}
			else {
				req.flash('error', "This country already exist!");
				res.redirect(namedRouter.urlFor('country.list'));
			}
		}
		catch(e) {
			throw ({ message: e.message });
		}
	}

    
    /*
    // @Method: edit
    // @Description:  country update page
    */
    async edit (req, res){
        try
        {
            let result = {};
            let country = await countryRepo.getById(req.params.id);
            if (!_.isEmpty(country)) {
                result.country_data = country;
                res.render('country/views/edit.ejs', {
                    page_name: 'country-management',
                    page_title: 'Edit Country',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry country not found!");
                res.redirect(namedRouter.urlFor('country.list')); 
            }
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }
    };

    /* @Method: update
    // @Description: country update action
    */
    async update (req, res){
        try {
            const countryId = req.body.country_id;
          //  let country = await countryRepo.getByField({'country_name':req.body.country_name,_id:{$ne:countryId}});
           let country =  await countryRepo.getByField({ 'country_name': { $regex: req.body.country_name, $options: 'i' } ,_id:{$ne:countryId}});
            if (_.isEmpty(country)) {
                    let countryUpdate = await countryRepo.updateById(req.body,countryId)
                    if(countryUpdate) {
                        req.flash('success', "Country updated successfully");
                        res.redirect(namedRouter.urlFor('country.list'));
                    }
                    
                }else{
                req.flash('error', "Country is already available!");
                res.redirect(namedRouter.urlFor('country.edit', { id: countryId }));
            }    
        }catch(e){
            return res.status(500).send({message: e.message});  
        }      
            
    };



    /* @Method: list
    // @Description: To get all the countrys from DB
    */
    async list (req, res){
            try
            {
                res.render('country/views/list.ejs', {
                    page_name: 'country-management',
                    page_title: 'Country List',
                    user: req.user,
                    
                });
        } catch(e){
            return res.status(500).send({message: e.message}); 
        }  
    };
   

	async getAll (req, res){
		try{
			let country = await countryRepo.getAll(req);
            //console.log("country>>", country)
			
			if(_.has(req.body, 'sort')){
				var sortOrder = req.body.sort.sort;
				var sortField = req.body.sort.field;
			}
			else{
				var sortOrder = -1;
				var sortField = '_id';
			}
			let meta = {"page": req.body.pagination.page, "pages": country.pageCount, "perpage": req.body.pagination.perpage, "total": country.totalCount, "sort": sortOrder, "field": sortField};
			return {status: 200, meta: meta, data:country.data, message: `Data fetched succesfully.`};
		}
		catch(e){
			return {status: 500,data: [],message: e.message};
		}
	}
    /*
    // @Method: status_change
    // @Description: country status change action
    */
	async changeStatus (req, res){
		try {
			//console.log("147>>",req.params.id);
			let country = await countryRepo.getById(req.params.id);
			//console.log("149>>",country); process.exit();
			if(!_.isEmpty(country)){
				let countryStatus = (country.status == "Active") ? "Inactive" : "Active";
				let countryUpdate= await countryRepo.updateById({"status": countryStatus }, req.params.id);
				req.flash('success', "Country status has changed successfully" );
				res.redirect(namedRouter.urlFor('country.list'));
			}
			else {
				req.flash('error', "Sorry country not found");
				res.redirect(namedRouter.urlFor('country.list')); 
			}
		}
		catch(e){
			return res.status(500).send({message: e.message}); 
		}
	};

    /* @Method: delete
    // @Description: country delete
    */
    async destroy (req, res){
        try{
            //let countryDelete = await countryRepo.delete(req.params.id)
            let countryDelete = await countryRepo.updateById({ "isDeleted": true }, req.params.id);
            if(!_.isEmpty(countryDelete)){
                req.flash('success','Country removed successfully');
                res.redirect(namedRouter.urlFor('country.list'));
            } 
        }catch(e){
            return res.status(500).send({message: e.message});   
        } 
    };

}

module.exports = new countryController();