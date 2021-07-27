const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active','Inactive'];

const NewsSchema = new Schema({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    author_name: { type: String, default: '' },
    date: { type: String, default: '' },
    image: { type: String, default: '' },
    isDeleted: {type: Boolean, default: false, enum: [true, false]},
    status: { type: String, default: 'Active', enum: status },
}, { timestamps: true, versionKey: false });

// For pagination
NewsSchema.plugin(mongooseAggregatePaginate);

// create the model for HowItWorks and expose it to our app
module.exports = mongoose.model('News', NewsSchema);