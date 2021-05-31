const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const ContactinfoSchema = new Schema({
  contactinfo_name: {type: String,default: ''},
  contactinfo_slug: {type: String,default: ''},
  contactinfo_value: {type: String,default: ''},
  status: {type: String,default: 'Active',enum: status},
  isDeleted: {type: Boolean,default: false,enum: [true, false]},
});

// For pagination
ContactinfoSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Contactinfo', ContactinfoSchema);