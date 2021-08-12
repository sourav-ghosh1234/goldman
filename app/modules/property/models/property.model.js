const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const PropertySchema = new Schema({
    image: { type: String, default: '' },
    imageGallery: [{ type: String, default: '' }],
    shortTitle: { type: String, default: '' },
    title: { type: String, default: '' },
    propertyType: { type: Schema.Types.ObjectId, ref: 'PropertyType',default: null },
    description: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    price: { type: Number,default: 0 },
    reference: { type: String, default: '' },
    noOfRooms: { type: Number,default: 0 },
    yearBuilt: { type: Number,default: 0 },
    totalArea: { type: String, default: '' },
    noOfBedRooms: { type: Number,default: 0 },
    noOfKitchens: { type: Number,default: 0 },
    noOfBathrooms: { type: Number,default: 0 },
    totalFloors: { type: Number,default: 0 },
    floor: { type: String, default: '' },
    ShowerRooms: { type: Number,default: 0 },
    WC: { type: Number,default: 0 },
    DPE: { type: String, default: '' },
    GES: { type: String, default: '' },
    characteristics: [{ type: Schema.Types.ObjectId, ref: 'Characteristics',default: null}],
    amenities: [{ type: Schema.Types.ObjectId, ref: 'Amenities',default: null}],
    status: { type: String, default: "Active", enum: status },
    isDeleted: { type: Boolean, default: false, enum: deleted },
    createdAt: { type: Date, default: Date.now },
});

// For pagination
PropertySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Property', PropertySchema);