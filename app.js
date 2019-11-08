//Requires

const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');




mongoose.connection.openUri('mongodb://localhost:27017/mesasDB', (err, res)=>{

    if(err) throw err;
    
    console.log('Base de Datos Online mesas');
});



//Inicializar Variables

const app = express();

// STTINGS
app.set('port', process.env.PORT || 4000);

// MIDDLEWARES 
app.use(morgan('dev'));


// CORDS
app.use(cors());

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas


var usuarioRouter = require('./routes/usuarioRouter');
var mesasRouter = require('./routes/mesasRouter');


//Rutas

app.use('/api', usuarioRouter);
app.use('/api', mesasRouter);





//Escuchar Petición

app.listen(app.get('port'), () => {
    console.log('Corriendo Express en el puerto 3000 crud mesas');
});

