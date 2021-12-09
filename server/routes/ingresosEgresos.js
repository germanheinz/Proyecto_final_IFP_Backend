const express = require('express');

const IngresosEgresos = require('../models/ingresosEgresos');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

//mostrar todos los ingresos egresos
app.get('/ingresosEgresos', (req, res) => {

    IngresosEgresos.find()
    .exec((err, ingresosEgresos) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        IngresosEgresos.countDocuments((err, conteo) => {

            return res.json({
                ok: true,
                ingresosEgresos
            });

        });
        }
    );
});

app.get('/ingresosEgresos/user/:userId', (req, res) => {

    let userId = req.params.userId;

    IngresosEgresos.find({usuario: userId})
    .exec((err, ingresosEgresos) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        IngresosEgresos.countDocuments((err, conteo) => {

            return res.json({
                ok: true,
                ingresosEgresos
            });

        });
        }
    );
});

//mostrar todos los ingresos egresos
app.get('/ingresoEgreso/:id', (req, res) => {

    let idIngreEgreso = req.params.id;

    IngresosEgresos.find({ _id: idIngreEgreso })
    //.populate('email', 'nombre')
    .exec((err, ingresoEgreso) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ingresoEgreso
        })

    })
});

app.post('/ingresosEgresos', function(req, res) {

    let body = req.body;

    let ingresoEgreso = new IngresosEgresos({
        title: body.title, 
        price: body.price, 
        date: body.date,
        description: body.description, 
        role: body.role,
        usuario: body.usuario
    });

    ingresoEgreso.save((err, ingresoEgreso) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ingresoEgreso
        });


    });


});

app.put('/ingresoEgreso/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    IngresosEgresos.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, ingresoEgresoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            ingresoEgreso: ingresoEgresoDB
        });

    })

});

//Eliminar album
app.delete('/ingresoEgreso/:id', (req, res) => {

    let id = req.params.id;

    IngresosEgresos.findByIdAndDelete(id, (err, ingresoEgresoDB) => {

        if (err) {
            res.json(400).json({
                ok: false,
                err: {
                    message: 'Error al cargar album'
                }
            });

        }
        if (!ingresoEgresoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no existe album'
                }
            });
        } else {
            return res.json({
                ok: true,
            });
        }
    });
})

module.exports = app;