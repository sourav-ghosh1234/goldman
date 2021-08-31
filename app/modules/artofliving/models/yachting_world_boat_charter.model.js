const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status = ["Active", "Inactive"];
const deleted = [true, false];
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const yachtingWorldBoatCharterSchema = new Schema({
    bannerImage: { type: String, default: '' },
    forMoreInfo: { type: String, default: '' },
    contactUs: { type: String, default: '' },
    heading: { type: String, default: '' },
    content: { type: String, default: '' },
    contactInfo: { type: String, default: '' },
    language: {type:String, default: 'en'},
    translate:[{
        language: {type:String, default: ''},
        forMoreInfo: { type: String, default: '' },
        contactUs: { type: String, default: '' },
        heading: { type: String, default: '' },
        content: { type: String, default: '' },
        contactInfo: { type: String, default: '' },
    }],
    status: { type: String, default: "Active", enum: status },
    isDeleted: { type: Boolean, default: false, enum: deleted },
 }, { timestamps: true });

// For pagination
yachtingWorldBoatCharterSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Yachting_World_Boat_Charter', yachtingWorldBoatCharterSchema);