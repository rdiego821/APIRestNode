exports = module.exports = function(app, mongoose) {

	console.log('ingresa a modelo');

	var hotelModelo = new mongoose.Schema({
			id: 		{ type: String },
			name: 		{ type: String },
			stars: 	    { type: Number },
			price:  	{ type: Number },
			image: 		{ type: String },
			amenities: 	{ type: String },
		});

	mongoose.model('hoteles', hotelModelo);

};
