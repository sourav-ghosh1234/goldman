const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = ["Active", "Inactive"];
const deleted = [true, false];

const NotificationSchema = new Schema({
	title: {type: String,default: ''},
	content: {type: String,default: ''},
	slug: {type: String,default: ''},
	status: {type: String,default: 'Active',enum: status},
	isDeleted: {type: Boolean,default: false,enum: deleted},
},{timestamps:true},{versionKey:false});

// For pagination
NotificationSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('Notification', NotificationSchema);