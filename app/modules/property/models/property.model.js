const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const PropertySchema = new Schema({
    image: { type: String, default: '' },
    imageGallery: [{ type: String, default: '' }],
    title: { type: String, default: '' },
    propertyType: { type: Schema.Types.ObjectId, ref: 'PropertyType' },
    description: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    price: { type: Number },
    totalArea: { type: Number },
    noOfBedRooms: { type: Number },
    noOfKitchens: { type: Number },
    noOfBathrooms: { type: Number },
    status: { type: String, default: "Active", enum: status },
    isDeleted: { type: Boolean, default: false, enum: deleted },
    createdAt: { type: Date, default: Date.now },
});

// For pagination
PropertySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Property', PropertySchema);