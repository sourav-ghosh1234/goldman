const cityRepo = require('city/repositories/city.repository');
const countryRepo = require('country/repositories/country.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

class cityController {
    constructor() {
        this.city = [];
    }

    async create(req, res) {
        try {
            let countries = await countryRepo.getAllByField({ status: 'Active', isDeleted: false });
            res.render('city/views/create.ejs', {
                page_name: 'city-management',
                page_title: 'Create City',
                user: req.user,
                response: { countries }
            });
        } catch (e) {
            throw ({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            let city = await cityRepo.getByField({ 'city': { $regex: req.body.city, $options: 'i' }, 'isDeleted': false });
            if (_.isEmpty(city)) {
                let citySave = await cityRepo.save(req.body);
                if (citySave) {
                    req.flash('success', "City created successfully.");
                    res.redirect(namedRouter.urlFor('city.list'));
                }
            } else {
                req.flash('error', "This City already exist!");
                res.redirect(namedRouter.urlFor('city.list'));
            }
        } catch (e) {
            throw ({ message: e.message });
        }
    }


    /*
    // @Method: edit
    // @Description:  city update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let city = await cityRepo.getById(req.params.id);
            let countries = await countryRepo.getAllByField({ status: 'Active', isDeleted: false });
            if (!_.isEmpty(city)) {
                result.city_data = city;
                res.render('city/views/edit.ejs', {
                    page_name: 'city-management',
                    page_title: 'Edit City',
                    user: req.user,
                    response: { city_data: city, countries }
                });
            } else {
                req.flash('error', "Sorry City not found!");
                res.redirect(namedRouter.urlFor('city.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: city update action
    */
    async update(req, res) {
        try {
            const cityId = req.body.city_id;
            let city = await cityRepo.getByField({ 'city': { $regex: req.body.city, $options: 'i' }, _id: { $ne: cityId } });
            if (_.isEmpty(city)) {
                let cityUpdate = await cityRepo.updateById(req.body, cityId)
                if (cityUpdate) {
                    req.flash('success', "City updated successfully");
                    res.redirect(namedRouter.urlFor('city.list'));
                }

            } else {
                req.flash('error', "City is already available!");
                res.redirect(namedRouter.urlFor('city.edit', { id: cityId }));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };



    /* @Method: list
    // @Description: To get all the citys from DB
    */
    async list(req, res) {
        try {
            res.render('city/views/list.ejs', {
                page_name: 'city-management',
                page_title: 'City List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async getAll(req, res) {
            try {
                let city = await cityRepo.getAll(req);
                //console.log("city>>", city)

                if (_.has(req.body, 'sort')) {
                    var sortOrder = req.body.sort.sort;
                    var sortField = req.body.sort.field;
                } else {
                    var sortOrder = -1;
                    var sortField = '_id';
                }
                let meta = { "page": req.body.pagination.page, "pages": city.pageCount, "perpage": req.body.pagination.perpage, "total": city.totalCount, "sort": sortOrder, "field": sortField };
                return { status: 200, meta: meta, data: city.data, message: `Data fetched succesfully.` };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
        }
        /*
        // @Method: status_change
        // @Description: city status change action
        */
    async changeStatus(req, res) {
        try {
            //console.log("147>>",req.params.id);
            let city = await cityRepo.getById(req.params.id);
            //console.log("149>>",city); process.exit();
            if (!_.isEmpty(city)) {
                let cityStatus = (city.status == "Active") ? "Inactive" : "Active";
                let cityUpdate = await cityRepo.updateById({ "status": cityStatus }, req.params.id);
                req.flash('success', "City status has changed successfully");
                res.redirect(namedRouter.urlFor('city.list'));
            } else {
                req.flash('error', "Sorry City not found");
                res.redirect(namedRouter.urlFor('city.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: delete
    // @Description: city delete
    */
    async destroy(req, res) {
        try {
            //let cityDelete = await cityRepo.delete(req.params.id)
            let cityDelete = await cityRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(cityDelete)) {
                req.flash('success', 'City removed successfully');
                res.redirect(namedRouter.urlFor('city.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new cityController();