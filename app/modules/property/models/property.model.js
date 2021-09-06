const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];
const EstablishedNew = ["established", "new"];
const priceDisplay = ["price", "text"];
const propertyFor = ["sale", "rent"];

const PropertySchema = new Schema({
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    propertyType: { type: Schema.Types.ObjectId, ref: 'PropertyType', default: null },
    establishedNew: { type: String, default: "established", enum: EstablishedNew },
    landAgent: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    dualAgent: { type: String, default: '' },
    rentalPerWeek: { type: Number, default: 0 },
    rentalPerMonth: { type: Number, default: 0 },
    securityBond: { type: Number, default: 0 },
    priceDisplay: { type: String, default: "priceDisplay", enum: priceDisplay },
    price: { type: Number, default: 0 },
    priceText: { type: String, default: '' },
    availableDate: { type: String, default: '' },
    landlord: {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    propertyAddress: {
        city: { type: Schema.Types.ObjectId, ref: 'City' },
        country: { type: Schema.Types.ObjectId, ref: 'Country' },
        unit: { type: String, default: '' },
        street_address_number: { type: String, default: '' },
        street_address: { type: String, default: '' },
        suburb: { type: String, default: '' },
        municipality: { type: String, default: '' },
        suburb: { type: String, default: '' }
    },
    totalRooms: { type: Number, default: 0 },
    noOfBedRooms: { type: Number, default: 0 },
    noOfBathRooms: { type: Number, default: 0 },
    noOfKitchens: { type: Number, default: 0 },
    totalFloors: { type: Number, default: 0 },
    floor: { type: String, default: '' },
    parking: {
        garage_spaces: { type: Number, default: 0 },
        carport_spaces: { type: Number, default: 0 },
        open_spaces: { type: Number, default: 0 },
    },
    totalArea: { type: Number, default: 0 },
    houseSize: {
        size: { type: Number, default: 0 },
        sizeBy: { type: String, default: '' },
    },
    landSize: {
        size: { type: Number, default: 0 },
        sizeBy: { type: String, default: '' },
    },
    characteristics: [{ type: Schema.Types.ObjectId, ref: 'Characteristics', default: null }],
    amenities: [{ type: Schema.Types.ObjectId, ref: 'Amenities', default: null }],
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    imageGallery: [{ type: String, default: '' }],
    yearBuilt: { type: Number, default: 0 },
    WC: { type: Number, default: 0 },
    DPE: { type: String, default: '' },
    GES: { type: String, default: '' },
    propertyFor: { type: String, default: "sale", enum: propertyFor },
    language: { type: String, default: 'en' },
    translate: [
        {
            title: { type: String, default: '' },
            subTitle: { type: String, default: '' },
            leadAgent: { type: String, default: '' },
            dualAgent: { type: String, default: '' },
            priceText: { type: String, default: '' },
            language: { type: String, default: '' },
            landlord: {
                name: { type: String, default: '' },
                email: { type: String, default: '' },
                phone: { type: String, default: '' }
            },
            propertyAddress: {
                unit: { type: String, default: '' },
                street_address_number: { type: String, default: '' },
                street_address: { type: String, default: '' },
                suburb: { type: String, default: '' },
                municipality: { type: String, default: '' },
            },
            houseSize: {
                size: { type: String, default: '' },
                sizeBy: { type: String, default: '' }
            },
            landSize: {
                size: { type: String, default: '' },
                sizeBy: { type: String, default: '' }
            },
            totalArea: { type: String, default: '' },
            description: { type: String, default: '' }
        }
    ],
    status: { type: String, default: "Active", enum: status },
    isDeleted: { type: Boolean, default: false, enum: deleted },
    createdAt: { type: Date, default: Date.now },
});

// For pagination
PropertySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Property', PropertySchema);