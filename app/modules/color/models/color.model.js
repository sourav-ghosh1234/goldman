const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const ColorSchema = new Schema({
  name: { type: String },
  code: { type: String, default: '' },
  language: {type:String, default: 'en'},
  translate: [{
    name: { type: String, default: '' },
    language: { type: String, default: '' }
  }],
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: "Active", enum: status },
});

// For pagination
ColorSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Color', ColorSchema);