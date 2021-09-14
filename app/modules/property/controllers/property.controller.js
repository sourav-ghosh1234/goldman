const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const gm = require('gm').subClass({
    imageMagick: true
});
const userRepo = require('user/repositories/user.repository');
const propertyRepo = require('property/repositories/property.repository');
const propertytypeRepo = require('propertytype/repositories/propertytype.repository');
const cityRepo = require('city/repositories/city.repository');
const countryRepo = require('country/repositories/country.repository');
const languageRepo = require('language/repositories/language.repository');
const amenitiesRepo = require('amenities/repositories/amenities.repository');
const characteristicsRepo = require('characteristics/repositories/characteristics.repository');

const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null 
};

const geocoder = NodeGeocoder(options);


class PropertyController {
    constructor() {
        this.property = [];
    }

    async create(req, res) {
        try {
            let result = {};
            let languages = await languageRepo.getAllByField({
                'status': 'Active', isDeleted: false
            });
            result.languages = languages;
            let agents = await userRepo.getAllWithoutPaginate({ 'roleDetails.role': 'agent', isDeleted: false, isActive: true });
            let propertyTypes = await propertytypeRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let cities = await cityRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let countries = await countryRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let amenities = await amenitiesRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let characteristics = await characteristicsRepo.getAllByField({ isDeleted: false, status: 'Active' });
            res.render('property/views/create.ejs', {
                page_name: 'property-management',
                page_title: 'Create Property',
                user: req.user,
                response: { propertyTypes, cities, countries, amenities, characteristics, agents },
                result: result
            });
        } catch (e) {
            throw ({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            let property = await propertyRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' }, 'isDeleted': false });

            var full_address = req.body.propertyAddress.street_address + ' ' + req.body.propertyAddress.street_address_number + ' ' + req.body.propertyAddress.unit + ' ' + req.body.propertyAddress.suburb;

            var lat_lng_address = await geocoder.geocode(full_address);

            if(!_.isEmpty(lat_lng_address)){
                req.body.propertyAddress.latitude = lat_lng_address[0]['latitude'];
                req.body.propertyAddress.longitude = lat_lng_address[0]['longitude'];
            }else{
                req.body.propertyAddress.latitude ='';
                req.body.propertyAddress.longitude = '';  
            }
            
            if (_.isEmpty(property)) {
                if (req.files.length > 0) {

                    req.body.imageGallery = [];
                    req.files.forEach(file => {
                        if (file.fieldname.search('gallery') != -1) {
                            let fileIndex = file.fieldname.split('_')[1];
                            gm('./public/uploads/property/' + file.filename).resize(200, 200, '!').write('./public/uploads/property/thumb/' + file.filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            req.body.imageGallery.push(file.filename);
                        } else {
                            gm('./public/uploads/property/' + file.filename).resize(200, 200, '!').write('./public/uploads/property/thumb/' + file.filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            req.body[file.fieldname] = file.filename;
                        }
                    });
                }

                let propertySave = await propertyRepo.save(req.body);

                if (propertySave) {
                    req.flash('success', "Property created successfully.");
                    res.redirect(namedRouter.urlFor('property.list'));
                }
            } else {
                req.flash('error', "This Property already exist!");
                res.redirect(namedRouter.urlFor('property.list'));
            }
        } catch (e) {
            console.log(e)
            throw ({ message: e.message });
        }
    }


    /*
    // @Method: edit
    // @Description:  property update page
    */
    async edit(req, res) {
        try {
            let result = {};


            let languages = await languageRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
            result.languages = languages;
            let property = await propertyRepo.getById(req.params.id);

            var translateArr = [];
            for (var i = 0; i < property.translate.length; i++) {
                translateArr[property.translate[i].language] = property.translate[i]
            }
            property.translate = translateArr;

            let agents = await userRepo.getAllWithoutPaginate({ 'roleDetails.role': 'agent', isDeleted: false, isActive: true });
            let propertyTypes = await propertytypeRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let cities = await cityRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let countries = await countryRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let amenities = await amenitiesRepo.getAllByField({ isDeleted: false, status: 'Active' });
            let characteristics = await characteristicsRepo.getAllByField({ isDeleted: false, status: 'Active' });

            if (!_.isEmpty(property)) {
                result.property_data = property;
                console.log(result);
                res.render('property/views/edit.ejs', {
                    page_name: 'property-management',
                    page_title: 'Edit Property',
                    user: req.user,
                    response: { result, propertyTypes, cities, countries, amenities, characteristics, agents }
                    //response: { property_data: property, propertyTypes, cities, countries }
                });
            } else {
                req.flash('error', "Sorry Property not found!");
                res.redirect(namedRouter.urlFor('property.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: property update action
    */
    async update(req, res) {
        try {
            const propertyId = req.body.property_id;
            let property = await propertyRepo.getByField({ 'title': { $regex: req.body.title, $options: 'i' }, _id: { $ne: propertyId } });
            if (_.isEmpty(property)) {
                let propertyData = await propertyRepo.getById(propertyId);
                // req.body.imageGallery = propertyData.imageGallery;
                let imageArray = propertyData.imageGallery;


                var full_address = req.body.propertyAddress.street_address + ' ' + req.body.propertyAddress.street_address_number + ' ' + req.body.propertyAddress.unit + ' ' + req.body.propertyAddress.suburb;

                var lat_lng_address = await geocoder.geocode(full_address);

                if(!_.isEmpty(lat_lng_address)){
                    req.body.propertyAddress.latitude = lat_lng_address[0]['latitude'];
                    req.body.propertyAddress.longitude = lat_lng_address[0]['longitude'];
                }else{
                    req.body.propertyAddress.latitude ='';
                    req.body.propertyAddress.longitude = '';  
                }

                if (req.files && req.files.length > 0) {

                    req.files.forEach(file => {
                        if (file.fieldname.search('gallery') != -1) {
                            let fileIndex = file.fieldname.split('_')[1];
                            gm('./public/uploads/property/' + file.filename).resize(200, 200, '!').write('./public/uploads/property/thumb/' + file.filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            imageArray.push(file.filename);
                        } else {
                            gm('./public/uploads/property/' + file.filename).resize(200, 200, '!').write('./public/uploads/property/thumb/' + file.filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            req.body[file.fieldname] = file.filename;
                            if (propertyData.image != null && propertyData.image != '' && fs.existsSync(`./public/uploads/property/${propertyData.image}`)) {
                                fs.unlinkSync('./public/uploads/property/' + propertyData.image);
                            }
                        }
                    });
                }

                if (req.body.delImgIds) {
                    var delimageList = req.body.delImgIds.split(',');
                    imageArray = imageArray.filter(item => !delimageList.includes(item));
                    req.body.imageGallery = imageArray;

                    for (let i in delimageList) {
                        if (fs.existsSync(`./public/uploads/property/${delimageList[i]}`)) {
                            fs.unlinkSync('./public/uploads/property/' + delimageList[i]);
                        }
                        if (fs.existsSync(`./public/uploads/property/thumb/${delimageList[i]}`)) {
                            fs.unlinkSync('./public/uploads/property/thumb/' + delimageList[i]);
                        }
                    }
                } else {
                    req.body.imageGallery = imageArray;
                }

                if (req.body.priceDisplay == 'price') {
                    req.body.priceText = '';
                } else {
                    req.body.price = 0;
                }

                // if (req.files && req.files.length > 0) {
                //     req.files.forEach(file => {

                //         if (file.fieldname.search('gallery') != -1) {
                //             let fileIndex = file.fieldname.split('_')[1];
                //             if (propertyData.imageGallery[fileIndex] && propertyData.imageGallery[fileIndex] != '' && fs.existsSync(`./public/uploads/property/${propertyData.imageGallery[fileIndex]}`)) {
                //                 fs.unlinkSync(`./public/uploads/property/${propertyData.imageGallery[fileIndex]}`);
                //             }
                //             if (fs.existsSync('./public/uploads/property/thumb/' + propertyData.imageGallery[fileIndex]) && propertyData.imageGallery[fileIndex] != '') {
                //                 fs.unlinkSync('./public/uploads/property/thumb/' + propertyData.imageGallery[fileIndex]);
                //             }
                //             gm('./public/uploads/property/' + file.filename).resize(200, 200, '!').write('./public/uploads/property/thumb/' + file.filename, function (err, result) {
                //                 if (!err) console.log('done');
                //             });

                //             req.body.imageGallery[fileIndex] = file.filename;
                //         } else {
                //             if (propertyData[file.fieldname] && propertyData[file.fieldname] != '' && fs.existsSync(`./public/uploads/property/${propertyData[file.fieldname]}`)) {
                //                 fs.unlinkSync(`./public/uploads/property/${propertyData[file.fieldname]}`);
                //             }
                //             if (fs.existsSync('./public/uploads/property/thumb/' + propertyData[file.fieldname]) && propertyData[file.fieldname] != '') {
                //                 fs.unlinkSync('./public/uploads/property/thumb/' + propertyData[file.fieldname]);
                //             }
                //             gm('./public/uploads/property/' + file.filename).resize(200, 200, '!').write('./public/uploads/property/thumb/' + file.filename, function (err, result) {
                //                 if (!err) console.log('done');
                //             });
                //             req.body[file.fieldname] = file.filename;
                //         }
                //     });
                // }

                let propertyUpdate = await propertyRepo.updateById(req.body, propertyId);

                if (propertyUpdate) {
                    req.flash('success', "Property updated successfully");
                    res.redirect(namedRouter.urlFor('property.list'));
                }

            } else {
                req.flash('error', "Property is already available!");
                res.redirect(namedRouter.urlFor('property.edit', { id: propertyId }));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };



    /* @Method: list
    // @Description: To get all the propertys from DB
    */
    async list(req, res) {
        try {

            let response = {};

            let landAgent = await userRepo.getAllWithoutPaginate({ 'roleDetails.role': 'agent', isDeleted: false, isActive: true });

            let propertyType = await propertytypeRepo.getAllByField({ isDeleted: false, status: 'Active' });

            response.landAgent = landAgent;
            response.propertyType = propertyType;

            res.render('property/views/list.ejs', {
                page_name: 'property-management',
                page_title: 'Property List',
                user: req.user,
                response: response
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async getAll(req, res) {
        try {
            let property = await propertyRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = { "page": req.body.pagination.page, "pages": property.pageCount, "perpage": req.body.pagination.perpage, "total": property.totalCount, "sort": sortOrder, "field": sortField };
            return { status: 200, meta: meta, data: property.data, message: `Data fetched succesfully.` };
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    }
    /*
    // @Method: status_change
    // @Description: property status change action
    */
    async changeStatus(req, res) {
        try {
            let property = await propertyRepo.getById(req.params.id);
            if (!_.isEmpty(property)) {
                let propertyStatus = (property.status == "Active") ? "Inactive" : "Active";
                let propertyUpdate = await propertyRepo.updateById({ "status": propertyStatus }, req.params.id);
                req.flash('success', "Property status has changed successfully");
                res.redirect(namedRouter.urlFor('property.list'));
            } else {
                req.flash('error', "Sorry Property not found");
                res.redirect(namedRouter.urlFor('property.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: delete
    // @Description: property delete
    */
    async destroy(req, res) {
        try {
            let propertyDelete = await propertyRepo.updateById({ "isDeleted": true }, req.params.id);
            if (!_.isEmpty(propertyDelete)) {
                if (propertyDelete.image !== '') {
                    if (fs.existsSync('./public/uploads/property/' + propertyDelete.image) && propertyDelete.image != '') {
                        fs.unlinkSync('./public/uploads/property/' + propertyDelete.image);
                    }
                    if (fs.existsSync('./public/uploads/property/thumb/' + propertyDelete.image) && propertyDelete.image != '') {
                        fs.unlinkSync('./public/uploads/property/thumb/' + propertyDelete.image);
                    }
                }
                req.flash('success', 'Property removed successfully');
                res.redirect(namedRouter.urlFor('property.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new PropertyController();