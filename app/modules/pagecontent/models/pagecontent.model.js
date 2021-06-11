const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const status = ["Active", "Inactive"];

const PageContentSchema = new Schema({
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    pageSlug: { type: String, default: '', enum: ['new-developments', 'contact-us'] },
    description: { type: String, default: '' },
    status: { type: String, default: "Active", enum: status },
    isDeleted: { type: Boolean, default: false, enum: deleted },
    createdAt: { type: Date, default: Date.now },
});

// For pagination
PageContentSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('PageContent', PageContentSchema);