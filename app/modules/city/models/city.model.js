const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const CitySchema = new Schema({
    city: { type: String, default: '' },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country' },
    status: { type: String, default: "Active", enum: status },
    isDeleted: { type: Boolean, default: false, enum: deleted },
    createdAt: { type: Date, default: Date.now },
});

// For pagination
CitySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('City', CitySchema);