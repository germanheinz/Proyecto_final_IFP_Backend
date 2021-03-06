const express = require('express');

const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const app = express();


app.post('/login', (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o password incorrecto'
                }
            });

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'password incorrecto'
                }
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});


module.exports = app;