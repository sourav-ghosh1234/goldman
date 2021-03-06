const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status = ["Active", "Inactive"];

const ServiceContentSchema = new Schema({
    pageHeadingTitle: { type: String, default: '' },
    pageHeadingContent: { type: String, default: '' },
    image: [{ type: String, default: '' }],
    pageHeadingButtonText: { type: String, default: '' },
    sections: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        button: { type: String, default: '' },
        link: { type: String, default: '' }
    }],
    language: {type:String, default: 'en'},
    translate:[{
        language: {type:String, default: ''},
        pageHeadingTitle: { type: String, default: '' },
        pageHeadingContent: { type: String, default: '' },
        pageHeadingButtonText: { type: String, default: '' },
        sections: [{
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            button: { type: String, default: '' }
        }],
    }],
    isDeleted: {type: Boolean, default: false, enum: [true, false]},
    status: { type: String, default: "Active", enum: status },
}, { timestamps: true });

// create the model for users and expose it to our app
module.exports = mongoose.model('Service_Content', ServiceContentSchema);