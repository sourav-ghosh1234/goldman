const Property = require('property/models/property.model');
const perPage = config.PAGINATION_PERPAGE;
const mongoose = require('mongoose');

class PropertyRepository {
    constructor() { }

    async getAll(req) {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'landAgent.full_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'propertyType.title': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }

            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({ "status": req.body.query.Status });
            }

            if (_.isObject(req.body.query) && _.has(req.body.query, 'propertyType')) {
                and_clauses.push({ "propertyType._id": mongoose.Types.ObjectId(req.body.query.propertyType) });
            }

            if (_.isObject(req.body.query) && _.has(req.body.query, 'landAgent')) {
                and_clauses.push({ "landAgent._id": mongoose.Types.ObjectId(req.body.query.landAgent) });
            }

            if (_.isObject(req.body.query) && _.has(req.body.query, 'propertyFor')) {
                and_clauses.push({ "propertyFor": req.body.query.propertyFor });
            }

            conditions['$and'] = and_clauses;

            var sortOperator = { "$sort": {} };
            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }
                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            var aggregate = Property.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "landAgent",
                        foreignField: "_id",
                        as: "landAgent",
                    },
                },
                { $unwind: { path: "$landAgent", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "propertytypes",
                        localField: "propertyType",
                        foreignField: "_id",
                        as: "propertyType",
                    },
                },
                { $unwind: { path: "$propertyType", preserveNullAndEmptyArrays: true } },
                { $match: conditions },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allProperty = await Property.aggregatePaginate(aggregate, options);
            return allProperty;
        } catch (e) {
            throw (e);
        }
    }



    async getAllArt(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await Property.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            return await Property.findById(id).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await Property.findOne(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByField(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await Property.find(_params).lean().exec();
        } catch (error) {
            return error;
        }
    }

    async updateById(data, id) {
        try {
            return await Property.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            })
                .lean().exec();
        } catch (error) {
            return error;
        }
    }

    async getArtCount() {
        try {
            return await Property.count({ "isDeleted": false, "status": "Active" });
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        try {
            const _save = new Property(data);
            return await _save.save();
        } catch (error) {
            return error;
        }
    }

    async getActiveArt(params) {
        try {
            const _params = {
                ...params,
                "isDeleted": false,
            };
            return await Property.find(_params).sort({ "title": 1 }).lean().exec();
        } catch (error) {
            return error;
        }
    };

    async delete(id) {
        try {
            await Property.findById(id).lean().exec();
            return await Property.deleteOne({
                _id: id
            }).lean().exec();
        } catch (error) {
            return error;
        }
    };

    async getAllProperty(req) {
        try {

            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false, status: 'Active' });

            if (_.isObject(req.body) && _.has(req.body, 'property_type')) {
                and_clauses.push({ "propertyType._id": mongoose.Types.ObjectId(req.body.property_type) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'property_for')) {
                and_clauses.push({ "propertyFor": req.body.property_for });
            }

            if (_.isObject(req.body) && _.has(req.body, 'country')) {
                and_clauses.push({ "propertyAddress.country": mongoose.Types.ObjectId(req.body.country) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'city')) {
                and_clauses.push({ "propertyAddress.city": mongoose.Types.ObjectId(req.body.city) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'price')) {
                and_clauses.push({ "price": { $lte: parseInt(req.body.price) } });
            }

            if (_.isObject(req.body) && _.has(req.body, 'bed_room')) {
                and_clauses.push({ "noOfBedRooms": { $gte: parseInt(req.body.bed_room) } });
            }
        
            if (_.isObject(req.body) && _.has(req.body, 'amenities') && !_.isEmpty(req.body.amenities)) {
                let ameArr=[];
                for(let i in req.body.amenities){
                    ameArr.push(mongoose.Types.ObjectId(req.body.amenities[i]))
                }
                and_clauses.push({ "amenities": { $in: ameArr } });
            }

            if (_.isObject(req.body) && _.has(req.body, 'characteristics') && !_.isEmpty(req.body.characteristics)) {
                let charArr=[];
                for(let i in req.body.characteristics){
                    charArr.push(mongoose.Types.ObjectId(req.body.characteristics[i]))
                }
                and_clauses.push({ "characteristics": { $in: charArr } });
            }

            if (_.isObject(req.body) && _.has(req.body, 'total_area')) {
                and_clauses.push({ "totalArea": { $gte: parseInt(req.body.total_area) } });
            }

            if (_.isObject(req.body) && _.has(req.body, 'search_text') && req.body.search_text.trim() != '') {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.search_text, $options: 'i' } },
                        { 'subTitle': { $regex: req.body.search_text, $options: 'i' } },
                        { 'propertyType.title': { $regex: req.body.search_text, $options: 'i' } },
                        { 'propertyAddress.suburb': { $regex: req.body.search_text, $options: 'i' } },
                        { 'propertyAddress.street_address': { $regex: req.body.search_text, $options: 'i' } },
                        { 'landAgent.full_name': { $regex: req.body.search_text, $options: 'i' } },
                        { 'description': { $regex: req.body.search_text, $options: 'i' } },
                        { 'city.city': { $regex: req.body.search_text, $options: 'i' } },
                        { 'country.country_name': { $regex: req.body.search_text, $options: 'i' } },
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            var sortOperator = { "$sort": {} };

            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }
                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            var aggregate = Property.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "landAgent",
                        foreignField: "_id",
                        as: "landAgent",
                    },
                },
                { $unwind: { path: "$landAgent", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "propertytypes",
                        localField: "propertyType",
                        foreignField: "_id",
                        as: "propertyType",
                    },
                },
                { $unwind: { path: "$propertyType", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "cities",
                        localField: "propertyAddress.city",
                        foreignField: "_id",
                        as: "city",
                    },
                },
                { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "countries",
                        localField: "propertyAddress.country",
                        foreignField: "_id",
                        as: "country",
                    },
                },
                { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
                { $match: conditions },
                sortOperator
            ]);

            var options = { page: req.body.page, limit: req.body.limit };
            let allProperty = await Property.aggregatePaginate(aggregate, options);
            return allProperty;

        } catch (error) {
            return error;
        }
    }

    async getPropertyDetails(req) {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false, status: 'Active' });

            and_clauses.push(req);

            conditions['$and'] = and_clauses;

            let aggregate = await Property.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        'from': 'users',
                        'localField': 'landAgent',
                        'foreignField': '_id',
                        'as': 'landAgentDetails'
                    }
                },
                { $unwind: { path: '$landAgentDetails' } },
                {
                    $lookup: {
                        'from': 'propertytypes',
                        'localField': 'propertyType',
                        'foreignField': '_id',
                        'as': 'propertyTypeDetails'
                    }
                },
                { $unwind: { path: '$propertyTypeDetails' } },
                {
                    $lookup: {
                        'from': 'characteristics',
                        'localField': 'characteristics',
                        'foreignField': '_id',
                        'as': 'characteristicsDetails'
                    }
                },
                { $unwind: { path: '$characteristicsDetails' } },
                {
                    $lookup: {
                        'from': 'amenities',
                        'localField': 'amenities',
                        'foreignField': '_id',
                        'as': 'amenitiesDetails'
                    }
                },
                { $unwind: { path: '$amenitiesDetails' } },
                {
                    $lookup: {
                        'from': 'countries',
                        'localField': 'propertyAddress.country',
                        'foreignField': '_id',
                        'as': 'countriesDetails'
                    }
                },
                { $unwind: { path: '$countriesDetails' } },
                {
                    $lookup: {
                        'from': 'cities',
                        'localField': 'propertyAddress.city',
                        'foreignField': '_id',
                        'as': 'cityDetails'
                    }
                },
                { $unwind: { path: '$cityDetails' } },
                {
                    $group: {
                        '_id': '$_id',
                        'landlord': { $first: '$landlord' },
                        'propertyAddress': {
                            $first: {
                                'country': '$countriesDetails.country_name',
                                'countryId': '$countriesDetails._id',
                                'city': '$cityDetails.city',
                                'cityId': '$cityDetails._id',
                                'street_address_number': '$propertyAddress.street_address_number',
                                'street_address': '$propertyAddress.street_address',
                                'unit': '$unit',
                                'suburb': '$propertyAddress.suburb',
                            }
                        },
                        'parking': { $first: '$parking' },
                        'parking': { $first: '$parking' },
                        'houseSize': { $first: '$houseSize' },
                        'landSize': { $first: '$landSize' },
                        'title': { $first: '$title' },
                        'subTitle': { $first: '$subTitle' },
                        'propertyType': { $first: '$propertyTypeDetails.title' },
                        'establishedNew': { $first: '$establishedNew' },
                        'landAgent': { $first: '$landAgentDetails.full_name' },
                        'dualAgent': { $first: '$dualAgent' },
                        'rentalPerWeek': { $first: '$rentalPerWeek' },
                        'rentalPerMonth': { $first: '$rentalPerMonth' },
                        'securityBond': { $first: '$securityBond' },
                        'priceDisplay': { $first: '$priceDisplay' },
                        'price': { $first: '$price' },
                        'priceText': { $first: '$priceText' },
                        'availableDate': { $first: '$availableDate' },
                        'totalRooms': { $first: '$totalRooms' },
                        'noOfBedRooms': { $first: '$noOfBedRooms' },
                        'noOfBathRooms': { $first: '$noOfBathRooms' },
                        'noOfKitchens': { $first: '$noOfKitchens' },
                        'totalFloors': { $first: '$totalFloors' },
                        'floor': { $first: '$floor' },
                        'totalArea': { $first: '$totalArea' },
                        'characteristics': { $addToSet: '$characteristicsDetails.title' },
                        'amenities': { $addToSet: '$amenitiesDetails.title' },
                        'description': { $first: '$description' },
                        'image': { $first: '$image' },
                        'imageGallery': { $first: '$imageGallery' },

                        'yearBuilt': { $first: '$yearBuilt' },
                        'WC': { $first: '$WC' },
                        'DPE': { $first: '$DPE' },
                        'GES': { $first: '$GES' },
                        'propertyFor': { $first: '$propertyFor' },

                        'translate': { $first: '$translate' },
                    }
                }
            ]);
            return aggregate;
        } catch (error) {
            return error;
        }
    }

}

module.exports = new PropertyRepository();