const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


const SEED = require('../config/config').SEED;


var Usuario = require('../model/usuarioModel');


//==========================================
//  Metodo de prueba
//==========================================
function prueba( req, res){

    res.status(200).json({
        ok: true,
        mensaje: 'Operación Satisfactoria Bien cred Mesas'
    });
}


//==========================================
//  Metodo get renueva token
//==========================================
function renuevaToken(req, res) {

    var token = jwt.sign({usuario: req.usuario}, SEED, { expiresIn: 14400}); // 4 horas


    return res.status(200).json({
        ok: false,
        token
    });


}

//==========================================
//  Metodo get para obtener un usuario
//==========================================

function getUser(req, res){

    var id = req.params.id;
    
    //console.log(id);
    Usuario.findById(id , (err, usuario) => {

        if( err ) 
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar usuario',
            errors: err
        });
        
        if( !usuario ) 
        return res.status(400).json({
            ok: false,
            mensaje: 'El usuario con el id: '+ id+' no exite',
            errors: { message : 'No existe un usuario con ese id'}
        });
        usuario.password = ";)";
        return res.status(200).json({
            ok: true,
            usuario
        });
    }); 

}
//==========================================
//  Metodo get para obtener los
//  los usuarios
//==========================================

function getUsers(req, res, next) {


    Usuario.find({},'_id nombre email')
        .exec((err, usuarios)=>{
            
            if( err ) 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuarios',
                errors: err
                });
            Usuario.count({}, (err, total) => {

                if( err ) 
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error count usuario',
                    errors: err
                });
                
                res.status(200).json({
                    ok: true,
                    usuarios,
                    total
                });
            });
        }); 

}


//==========================================
//  Metodo post para ingresar
//  los usuarios
//==========================================

function saveUser(req, res, next){

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)

    });

    usuario.save( (err, usuarioGuardado) => {
        
        if( err ) 
        return res.status(400).json({
            ok: false,
            mensaje: 'Error crear usuario',
            errors: err
        });

            
        return res.status(201).json({
            ok: true,
            usuario:usuarioGuardado
        });

    });

    
}

//==========================================
//  Metodo PUT para actualizar
//  los usuarios
//==========================================


function updateUser(req, res){

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id , (err, usuario) => {

        if( err ) 
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar usuario',
            errors: err
        });
        
        if( !usuario ) 
        return res.status(400).json({
            ok: false,
            mensaje: 'El usuario con el id: '+ id+' no exite',
            errors: { message : 'No existe un usuario con ese id'}
        });

        usuario.nombre = body.nombre;
        usuario.email  = body.email;

        usuario.save( (err, usuarioActualzado) => {
            
            if( err ) 
            return res.status(301).json({
                ok: false,
                mensaje: 'Error al actualizar usuario',
                errors: { message : err}
            });

            usuarioActualzado.password = ";)";
            return res.status(200).json({
                ok: true,
                usuario:usuarioActualzado
            });


        });


        
    });


}

//==========================================
//  Metodo DELETE para ELIMINAR
//  los usuarios
//==========================================
function deleteUser(req, res) {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if( err ) 
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al BORRAR usuario',
            errors: { message : err}
        });
        if( !usuarioBorrado ) 
        return res.status(400).json({
            ok: false,
            mensaje: 'El Usuario no existe',
            errors: { message : 'No existe un usuario con ese id'}
        });

        usuarioBorrado.password = ";)";
        return res.status(200).json({
            ok: true,
            usuario:usuarioBorrado
        });


    });
};

//====================================================
// Autenticación Normal
//====================================================


function loginUser(req, res){

    var body = req.body;

    Usuario.findOne({email : body.email }, (err, usuarioBD) => {
        
        if( err ) 
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar usuario',
            errors: err
        });

        if( !usuarioBD ) 
        return res.status(400).json({
            ok: false,
            mensaje: 'Credenciales incorrectas -email',
            errors: { message : 'Credenciales incorrectas'}
        });

        if( !bcrypt.compareSync( body.password, usuarioBD.password ) )
        return res.status(400).json({
            ok: false,
            mensaje: 'Credenciales incorrectas -password',
            errors: { message : 'Credenciales incorrectas'}
        });

        //crear token
        usuarioBD.password = ';)';
        var token = jwt.sign({usuario: usuarioBD}, SEED, { expiresIn: 14400}); // 4 horas


        return res.status(200).json({
            ok: true,
            token,
            usuario:usuarioBD,
            id: usuarioBD._id
        });
    });

    

}


module.exports = {

    prueba,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    renuevaToken
}