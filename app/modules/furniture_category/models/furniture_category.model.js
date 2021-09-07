const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const categorySchema = new Schema({
  name: { type: String, default: '' },
  status: { type: String, default: 'Active', enum: status },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
}, { timestamps: true, versionKey: false });

// For pagination
categorySchema.plugin(mongooseAggregatePaginate);

// create the model for Shop and expose it to our app
module.exports = mongoose.model('Furniture_category', categorySchema);