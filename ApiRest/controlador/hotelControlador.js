//Archivo: controladores/hotelControlador.js

var mongoose = require('mongoose');
var HotelModelo  = mongoose.model('hoteles');

//GET - Retornar todos los hoteles almacenados en la BD
exports.findAllHotels = function(req, res) {
	console.log('ingresa a findAll');
	
	HotelModelo.find({}, function(err, hotelModelo) {
    if(err) res.send(500, err.message);

    console.log('GET /hoteles')
		res.status(200).jsonp(hotelModelo);
	});
};

//GET - Retornar un hotel con el ID específico
exports.findById = function(req, res) {
	HotelModelo.findById(req.params.id, function(err, hotel) {
    if(err) return res.send(500, err.message);

    console.log('GET /hotel/' + req.params.id);
		res.status(200).jsonp(hotel);
	});
};

//POST - Insertar un hotel en la BD
exports.addHotel = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var hotel = new HotelModelo({
		id: 		req.body.id,
		name: 		req.body.name,
		stars: 	    req.body.stars,
		price:  	req.body.price,
		image: 		req.body.image,
		amenities: 	req.body.amenities	
	});

	hotel.save(function(err, hotel) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(hotel);
	});
};

//PUT - Actualizar hotel
exports.updateHotel = function(req, res) {
	HotelModelo.findById(req.params.id, function(err, hotel) {
		hotel.id   = req.body.id;
		hotel.name   = req.body.name;
		hotel.stars   = req.body.stars;
		hotel.price   = req.body.price;
		hotel.image   = req.body.image;
		hotel.amenities   = req.body.amenities;
		
		hotel.save(function(err) {
			if(err) return res.send(500, err.message);
		res.status(200).jsonp(hotel);
		});
	});
};

//DELETE - Eliminar un hotel con el ID específico
exports.deleteHotel = function(req, res) {
	HotelModelo.findById(req.params.id, function(err, hotel) {
		hotel.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
