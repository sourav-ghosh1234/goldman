const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const deleted = [true, false];
const status = ["Active", "Inactive"];

const CountrySchema = new Schema({
  country_name : { type: String, default: '' },
  code : { type: String, default: '' },
  status: { type: String, default: "Active", enum: status },
  isDeleted: { type: Boolean, default: false, enum: deleted },
},{timestamps:true},{versionKey:false});

// For pagination
CountrySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Country', CountrySchema);