const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const ServicesSchema = new Schema({
  image : { type: String, default: '' },
  title : { type: String, default: '' },
  description : { type: String, default: '' },
  status: { type: String, default: "Active", enum: status },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  createdAt: { type: Date, default: Date.now },
});

// For pagination
ServicesSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Services', ServicesSchema);