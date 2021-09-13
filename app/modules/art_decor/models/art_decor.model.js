const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const artDecorSchema = new Schema({
  title : { type: String, default: '' },
  company_name: { type: String, default: '' },
  slug : { type: String, default: '' },
  price : { type: Number, default: 0  },
  dimensions : { type: String, default: '' },
  colour: [{type: Schema.Types.ObjectId, ref: 'Color', default: null }],
  description : { type: String, default: '' },
  image: { type: String, default: '' },
  imageGallery: [{ type: String, default: '' }],
  language: { type: String, default: 'en' },
  translate: [
      {
        title : { type: String, default: '' },
        description : { type: String, default: '' },
        company_name: { type: String, default: '' },
        language: { type: String, default: '' },
      }
  ],
  status: { type: String, default: "Active", enum: status },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  createdAt: { type: Date, default: Date.now },
});

// For pagination
artDecorSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('artDecor', artDecorSchema);