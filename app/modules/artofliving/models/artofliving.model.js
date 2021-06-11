const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = ["Active", "Inactive"];

const ArtOfLivingSchema = new Schema({

    pageHeadingTitle: { type: String, default: '' },
    pageHeadingMainTitle: { type: String, default: '' },
    pageHeadingContent: { type: String, default: '' },
    pageHeadingImage: { type: String, default: '' },
    pageHeadingButtonText: { type: String, default: '' },
    pageHeadingButtonUrl: { type: String, default: '' },

    sections: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
    }],
}, { timestamps: true });

// For pagination
ArtOfLivingSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('ArtOfLiving', ArtOfLivingSchema);