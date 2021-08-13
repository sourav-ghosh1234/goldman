const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status = ["Active", "Inactive"];
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const SaleRealEstateContentSchema = new Schema({
    title: { type: String, default: '' },
    cityId: { type: Schema.Types.ObjectId, ref: 'City' },
    description: { type: String, default: '' },
    language: {type:String, default: 'en'},
    translate:[{
        language: {type:String, default: ''},
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    isDeleted: {type: Boolean, default: false, enum: [true, false]},
    status: { type: String, default: "Active", enum: status },
}, { timestamps: true });

// For pagination
SaleRealEstateContentSchema.plugin(mongooseAggregatePaginate);
// create the model for users and expose it to our app
module.exports = mongoose.model('Sale_Real_Estate_Content', SaleRealEstateContentSchema);