const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = ["Active", "Inactive"];

const HomeContentSchema = new Schema({
    banners: [{
        image: { type: String, default: '' },
        title: { type: String, default: '' },
        _id: false
    }],
    shortDescription: { type: String, default: '' },
    content1Title: { type: String, default: '' },
    content1Description: { type: String, default: '' },
    content1Image: { type: String, default: '' },
    content2Title: { type: String, default: '' },
    content2Description: { type: String, default: '' },
    content2Image: { type: String, default: '' },
    content2ButtonText: { type: String, default: '' },
    content2ButtonUrl: { type: String, default: '' },
    content3Title: { type: String, default: '' },
    content3Description: { type: String, default: '' },
    content3Image: { type: String, default: '' },
    content3ButtonText: { type: String, default: '' },
    content3ButtonUrl: { type: String, default: '' },
    content4Title: { type: String, default: '' },
    content4Description: { type: String, default: '' },
    content4Image: { type: String, default: '' },
    content4ButtonText: { type: String, default: '' },
    content4ButtonUrl: { type: String, default: '' },
});

// For pagination
HomeContentSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('HomeContent', HomeContentSchema);