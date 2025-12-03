const { Schema, model } = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const mesaSchema = new Schema(
    {
        cod: {	type: String, unique: true,	required: [true, 'El cod es	necesario']	},
        nombrepagador: {	type: String,	required: true },
        descripcionpedido: {	type: String,	required: true },
        usuario: {	
            type: Schema.Types.ObjectId,	
            ref: 'Usuario',	
            required:  [true,	'El	id	usuario es	un campo obligatorio hola mundo'],
            date: Date
        }
        
    }, 
    {
        timestamps: true
    }
    );

mesaSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unico'});
module.exports = model('Mesa',	mesaSchema);