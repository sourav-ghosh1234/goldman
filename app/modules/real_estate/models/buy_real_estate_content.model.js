const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status = ["Active", "Inactive"];
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const BuyRealEstateContentSchema = new Schema({
    title: { type: String, default: '' },
    cityId: { type: Schema.Types.ObjectId, ref: 'City', default: null },
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
BuyRealEstateContentSchema.plugin(mongooseAggregatePaginate);
// create the model for users and expose it to our app
module.exports = mongoose.model('Buy_Real_Estate_Content', BuyRealEstateContentSchema);