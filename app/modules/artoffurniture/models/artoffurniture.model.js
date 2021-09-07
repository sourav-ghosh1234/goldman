const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const ArtSchema = new Schema({
  title : { type: String, default: '' },
  company_name: { type: String, default: '' },
  category: {type: Schema.Types.ObjectId, ref: 'Furniture_category', default: null },
  price : { type: Number, default: 0  },
  dimensions : { type: String, default: '' },
  colour: { type: String, default: '' },
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
ArtSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Artoffurniture', ArtSchema);