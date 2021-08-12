const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const MenuSchema = new Schema({
  title: { type: String },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Menu', default: null },
  slug: { type: String, default: '' },
  menu_type: { type: String, enum: ['header', 'footer'] },
  menu_order: { type: Number, default: 0 },
  language: {type:String, default: 'en'},
  translate: [{
    title: { type: String, default: '' },
    language: { type: String, default: '' }
  }],
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: "Active", enum: status },
});

// For pagination
MenuSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Menu', MenuSchema);