const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status = ["Active", "Inactive"];

const HomeContentSchema = new Schema({
    bannerText: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    content: { type: String, default: '' },
    realEstateService:{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' }
    },
    artOfLiving:{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' }
    },
    currentPropertiesHeading: { type: String, default: '' },
    currentPropertiesText: { type: String, default: '' },
    contactusHeading: { type: String, default: '' },
    translate:[{
        language: {type:String, default: ''},
        bannerText: { type: String, default: '' },
        content: { type: String, default: '' },
        realEstateService:{
            title: { type: String, default: '' },
            description: { type: String, default: '' }
        },
        artOfLiving:{
            title: { type: String, default: '' },
            description: { type: String, default: '' }
        },
        currentPropertiesHeading: { type: String, default: '' },
        currentPropertiesText: { type: String, default: '' },
        contactusHeading: { type: String, default: '' },
    }],
    isDeleted: {type: Boolean, default: false, enum: [true, false]},
    status: { type: String, default: "Active", enum: status },
}, { timestamps: true });

// create the model for users and expose it to our app
module.exports = mongoose.model('HomeContent', HomeContentSchema);