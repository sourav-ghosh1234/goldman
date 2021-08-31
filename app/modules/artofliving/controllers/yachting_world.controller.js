const yachtingWorldRepo = require('artofliving/repositories/yachting_world.repository');
const languageRepo = require('language/repositories/language.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const mongoose = require('mongoose');


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
                res.redirect(namedRouter.urlFor('yachting.world.edit'));
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

    /* @Method: boatCharterlist
    // @Description: To get all the boat hire and charter services from DB
    */
    async BoatCharterlist(req, res) {
        try {
            res.render('artofliving/views/yachting_world_boat_charter_list.ejs', {
                page_name: 'boat-charter-service-management',
                page_title: 'Boat And Charter Service List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: getAllBoatCharter
    */
    async getAllBoatCharter(req, res) {
            try {
                let boatCharter = await yachtingWorldRepo.getAllBoatCharter(req);
                if (_.has(req.body, 'sort')) {
                    var sortOrder = req.body.sort.sort;
                    var sortField = req.body.sort.field;
                } else {
                    var sortOrder = -1;
                    var sortField = '_id';
                }
                let meta = { "page": req.body.pagination.page, "pages": boatCharter.pageCount, "perpage": req.body.pagination.perpage, "total": boatCharter.totalCount, "sort": sortOrder, "field": sortField };
                return { status: 200, meta: meta, data: boatCharter.data, message: `Data fetched succesfully.` };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
    }

    /*
    // @Method: create
    // @Description:  boat and charter add page
    */
    async createBoatCharter(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            
            res.render('artofliving/views/yachting_world_boat_charter_add.ejs', {
                page_name: 'boat-charter-service-management',
                page_title: 'Create Boat And Charter Service',
                user: req.user,
                response: result
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: store
    // @Description:  boat and charter store
    */

    async storeBoatCharter(req, res) {
        try {
            let boatCharterData = await yachtingWorldRepo.getBoatCharterByField({
                'heading': req.body.heading
            });
            if (_.isEmpty(boatCharterData)) {
                if (req.files.length > 0) {
                    req.body.bannerImage = req.files[0].filename;
                }
                let boatCharterInsert = yachtingWorldRepo.savetBoatCharter(req.body);
                if (boatCharterInsert) {
                    req.flash('success', "Boat And Charter Created Successfully");
                    res.redirect(namedRouter.urlFor('yachting.world.boat.charter.list'));
                }
            } else {
                req.flash('error', "Boat And Charter already exist with same name");
                res.redirect(namedRouter.urlFor('yachting.world.boat.charter.create'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: editBoatCharter
    // @Description:  boat and charter update page
    */
    async editBoatCharter(req, res) {
        try {

            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active',isDeleted:false
            });
            result.languages = languages;
            let boatCharterData = await yachtingWorldRepo.getBoatCharterById(req.params.id);

            // This is for language section //
            var translateArr = [];
            for (var i = 0; i < boatCharterData.translate.length; i++) {
                translateArr[boatCharterData.translate[i].language] = boatCharterData.translate[i]
            }
            
            boatCharterData.translate = translateArr
            // This is for language section //

            if (!_.isEmpty(boatCharterData)) {
                result.boat_charter_data = boatCharterData;
                res.render('artofliving/views/yachting_world_boat_charter_edit.ejs', {
                    page_name: 'boat-charter-service-management',
                    page_title: 'Update Boat And Charter Service',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry boat and charter not found!");
                res.redirect(namedRouter.urlFor('yachting.world.boat.charter.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: updateBoatCharter
    // @Description: boat and charter update action
    */
    async updateBoatCharter(req, res) {
        try {
            const boatCharterId = req.body.id;
            let data = await yachtingWorldRepo.getBoatCharterById(boatCharterId);
            var chkTitle = {
                isDeleted: false,
                heading: req.body.heading,
                _id: { $ne: mongoose.Types.ObjectId(boatCharterId) }
            };

            let isExist = await yachtingWorldRepo.getBoatCharterByField(chkTitle);
            if (!_.isEmpty(isExist)) {
                req.flash('error', "Boat and charter already exist.");
                res.redirect(namedRouter.urlFor('yachting.world.boat.charter.edit', {
                    id: req.body.boatCharterId
                }));
            } else {
                if (req.files.length > 0) {
                    if (data.bannerImage && data.bannerImage != '' && fs.existsSync(`./public/uploads/yachting_world/${data.bannerImage}`)) {
                        fs.unlinkSync(`./public/uploads/yachting_world/${data.bannerImage}`);
                    }
                    req.body.bannerImage = req.files[0].filename;
                }
                let boatCharterUpdate = await yachtingWorldRepo.updateBoatCharterById(req.body, boatCharterId)
                if (boatCharterUpdate) {
                    req.flash('success', "Boat and charter Updated Successfully");
                    res.redirect(namedRouter.urlFor('yachting.world.boat.charter.list'));
                } else {
                    res.redirect(namedRouter.urlFor('yachting.world.boat.charter.edit', {
                        id: req.body.boatCharterId
                    }));
                }
          } 
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }


    };

    /*
    // @Method: statusChangeBoatCharter
    // @Description: boat and charter status change action
    */
    async statusChangeBoatCharter(req, res) {
        try {
            let boatCharterData = await yachtingWorldRepo.getBoatCharterById(req.params.id);
            if (!_.isEmpty(boatCharterData)) {
                let boatCharterStatus = (boatCharterData.status == 'Active') ? 'Inactive' : 'Active';
                let boatCharterUpdate = yachtingWorldRepo.updateBoatCharterById({
                    'status': boatCharterStatus
                }, req.params.id);
                req.flash('success', "Boat and charter has changed successfully");
                res.redirect(namedRouter.urlFor('yachting.world.boat.charter.list'));
            } else {
                req.flash('error', "sorry boat and charter data not found");
                res.redirect(namedRouter.urlFor('yachting.world.boat.charter.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: destroyBoatCharter
    // @Description: boat and charter delete
    */
    async destroyBoatCharter(req, res) {
        try {
            let boatCharterDelete = await yachtingWorldRepo.updateBoatCharterById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(boatCharterDelete)) {
                req.flash('success', 'Boat and charter Removed Successfully');
                res.redirect(namedRouter.urlFor('yachting.world.boat.charter.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new yachtingWorldController();