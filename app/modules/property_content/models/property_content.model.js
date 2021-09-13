const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const propertyContentSchema = new Schema({
  title : { type: String, default: '' },
  description : { type: String, default: '' },
  image: { type: String, default: '' },
  language: { type: String, default: 'en' },
  translate: [
      {
        title : { type: String, default: '' },
        description : { type: String, default: '' },
        language: { type: String, default: '' },
      }
  ],
  status: { type: String, default: "Active", enum: status },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  createdAt: { type: Date, default: Date.now },
});

// For pagination
propertyContentSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Property_Content', propertyContentSchema);