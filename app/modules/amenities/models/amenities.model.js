const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const AmenitiesSchema = new Schema({
  title: { type: String, default: '' },
  icon : { type: String, default: '' },
  description: { type: String, default: '' },
  language: {type:String, default: 'en'},
  translate: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    language: { type: String, default: '' }
  }],
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: "Active", enum: status },
});

// For pagination
AmenitiesSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Amenities', AmenitiesSchema);