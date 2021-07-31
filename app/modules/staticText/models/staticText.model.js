const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const staticTextSchema = new Schema({
    footer_common_text: {
        type: String,
        default: ''
    },
    copyright_text: {
        type: String,
        default: ''
    },
    follow_us_text: {
        type: String,
        default: ''
    },
    translate: [{
        footer_common_text: {
            type: String,
            default: ''
        },
        copyright_text: {
            type: String,
            default: ''
        },
        follow_us_text: {
            type: String,
            default: ''
        },
        language: {
            type: String
        },
    }],
    isDeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    status: {
        type: String,
        default: "Active",
        enum: status
    },
}, {
    timestamps: true
});

// For pagination
staticTextSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Static_Text', staticTextSchema);