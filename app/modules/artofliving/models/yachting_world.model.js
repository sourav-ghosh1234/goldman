const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yachtingWorldSchema = new Schema({
    bannerImage: { type: String, default: '' },
    heading: { type: String, default: '' },
    subHeading: { type: String, default: '' },
    content: { type: String, default: '' },
    videoLink: { type: String, default: '' },
    imageHeading: { type: String, default: '' },
    image: [{ type: String, default: '' }],
    language: {type:String, default: 'en'},
    boatCharterHeading: { type: String, default: '' },
    translate:[{
        language: {type:String, default: ''},
        heading: { type: String, default: '' },
        subHeading: { type: String, default: '' },
        content: { type: String, default: '' },
        imageHeading: { type: String, default: '' },
        boatCharterHeading: { type: String, default: '' }
    }],
 }, { timestamps: true });

// create the model for users and expose it to our app
module.exports = mongoose.model('Yachting_World', yachtingWorldSchema);