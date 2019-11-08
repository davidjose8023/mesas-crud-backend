var express = require("express");

//var mdAutenticacion = require("../middelware/autenticacion");

var Mesa = require("../model/mesaModel");

// ==========================================
// Obtener Mesa por ID
// ==========================================
function getMesa(req, res) {
  var id = req.params.id;
  Mesa.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, mesa) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar mesa",
          errors: err
        });
      }
      if (!mesa) {
        return res.status(400).json({
          ok: false,
          mensaje: "El La mesa con el id " + id + "no existe",
          errors: { message: "No existe una mesa con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        mesa
      });
    });
}

//==========================================
//  Metodo get para obtener las
//  Mesas
//==========================================

function getMesas(req, res) {
  Mesa.find({})
    .populate("usuario", "nombre email")
    .exec((err, mesas) => {
      if (err)
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando Mesas",
          errors: err
        });

      Mesa.count({}, (err, total) => {
        if (err)
          return res.status(500).json({
            ok: false,
            mensaje: "Error count Mesas",
            errors: err
          });

        res.status(200).json({
          ok: true,
          mesas,
          total
        });
      });
    });
}

//==========================================
//  Metodo post para ingresar
//  las mesas
//==========================================

function saveMesa(req, res) {
  var body = req.body;

  var mesa = new Mesa({
    cod: body.cod,
    nombrepagador:body.nombrepagador,
    descripcionpedido: body.descripcionpedido,
    usuario: body.usuario,
    date: body.date
    
  });

  mesa.save((err, mesaGuardada) => {
    if (err)
      return res.status(400).json({
        ok: false,
        mensaje: "Error crear mesa",
        errors: err
      });

    return res.status(201).json({
      ok: true,
      mesa: mesaGuardada
    });
  });
}

//==========================================
//  Metodo PUT para actualizar
//  las mesas
//==========================================

function updateMesa(req, res) {
  var id = req.params.id;
  var body = req.body;

  Mesa.findById(id, (err, mesa) => {
    if (err)
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar mesa",
        errors: err
      });

    if (!mesa)
      return res.status(400).json({
        ok: false,
        mensaje: "La Mesa con el id: " + id + " no exite",
        errors: { message: "No existe una mesa con ese id" }
      });

    mesa.cod = body.cod;
    mesa.nombrepagador = body.nombrepagador,
    mesa.descripcionpedido = body.descripcionpedido;
    mesa.usuario = body.usuario;
    mesa.date= body.date;

    mesa.save((err, mesaActualzada) => {
      if (err)
        return res.status(301).json({
          ok: false,
          mensaje: "Error al actualizar mesa",
          errors: { message: err }
        });

      return res.status(200).json({
        ok: true,
        mesa: mesaActualzada
      });
    });
  });
}

//==========================================
//  Metodo DELETE para ELIMINAR
//  las mesas
//==========================================
function deleteMesa(req, res) {
  var id = req.params.id;

  Mesa.findByIdAndRemove(id, (err, mesaBorrado) => {
    if (err)
      return res.status(500).json({
        ok: false,
        mensaje: "Error al BORRAR mesa",
        errors: { message: err }
      });
    if (!mesaBorrado)
      return res.status(400).json({
        ok: false,
        mensaje: "El mesa no existe",
        errors: { message: "No existe una mesa con ese id" }
      });

    return res.status(200).json({
      ok: true,
      mesa: mesaBorrado
    });
  });
}

module.exports = {
  saveMesa,
  getMesa,
  getMesas,
  updateMesa,
  deleteMesa
};
