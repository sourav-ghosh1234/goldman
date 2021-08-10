const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactContentSchema = new Schema({
    heading: { type: String, default: '' },
    address: { type: String, default: '' },
    subHeading: { type: String, default: '' },
    contact_one:{
        heading: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    contact_two:{
        heading: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    contact_three:{
        heading: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    contact_four:{
        heading: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    translate:[{
        language: {type:String, default: ''},
        heading: { type: String, default: '' },
        address: { type: String, default: '' },
        subHeading: { type: String, default: '' },
        contact_one:{
            heading: { type: String, default: '' },
            address: { type: String, default: '' },
            phone: { type: String, default: '' }
        },
        contact_two:{
            heading: { type: String, default: '' },
            address: { type: String, default: '' },
            phone: { type: String, default: '' }
        },
        contact_three:{
            heading: { type: String, default: '' },
            address: { type: String, default: '' },
            phone: { type: String, default: '' }
        },
        contact_four:{
            heading: { type: String, default: '' },
            address: { type: String, default: '' },
            phone: { type: String, default: '' }
        },
    }]
}, { timestamps: true });

// create the model for users and expose it to our app
module.exports = mongoose.model('ContactContent', ContactContentSchema);