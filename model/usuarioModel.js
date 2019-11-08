const { Schema, model } = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const usuarioSchema = new Schema ({

    nombre : {type: String, required: [true, 'El nombre es requerido'] },
    email : {type: String, unique: true, required: [true, 'El correo es requerido'] },
    password : {type: String, required: [true, 'El password es requerido'] }
 
});

usuarioSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unico'});

module.exports =  model('Usuario', usuarioSchema);