var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Guest = new Schema({

	name: String,
	gender: { type: String, enum: ['male','female'], default: 'male' },
	age: Number, 
	email: String,
	regDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('guest', Guest);
