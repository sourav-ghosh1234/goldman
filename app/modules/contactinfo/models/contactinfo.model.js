const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const ContactinfoSchema = new Schema({
  isFirstVisit: { type: String, default: 'No', enum: ['Yes', 'No'] },
  isAlreadyClient: { type: String, default: 'No', enum: ['Yes', 'No'] },
  prefix: { type: String, default: 'Mr', enum: ['Mr', 'Mrs'] },
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone_code: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  want_to_do: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, default: 'Active', enum: status },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
});

// For pagination
ContactinfoSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Contactinfo', ContactinfoSchema);