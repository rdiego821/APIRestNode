// Cargar módulos y crear nueva aplicación
var express = require("express"); 
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

 
//app.use(methodOverride());

// Conexión a BD
mongoose.connect('mongodb://localhost/hoteles', function(err, res) {
  if(err) throw err;
  console.log('Conectado a la Base de Datos');
});

// Importar modelos y controladores
var hotelModelo       = require('./modelo/hotelModelo')(app, mongoose);
var hotelControlador  = require('./controlador/hotelControlador');

// Ruta por defecto
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Bienvenido!");
});
app.use(router);

// API routes
var hoteles = express.Router();

app.route('/hoteles')
  .get(hotelControlador.findAllHotels)
  .post(hotelControlador.addHotel);

app.route('/hoteles/:id')
  .get(hotelControlador.findById)
  .put(hotelControlador.updateHotel)
  .delete(hotelControlador.deleteHotel);

app.use(hoteles);

//Iniciar servidor
var server = app.listen(3000, function () {
    console.log('Servidor Node ejecutándose en puerto 3000..'); 
});