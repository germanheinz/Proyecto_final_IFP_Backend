const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let ingresosEgresosValidos = {
    values: ['INGRESO', 'EGRESO'],
    message: '{VALUE} no es un tipo válido'
};


let Schema = mongoose.Schema;


let ingresosEgresosSchema = new Schema({
    title: {
        type: String,
        required: [false, 'El titulo es necesario']
    },
    price: {
        type: String,
        unique: false,
        required: [true, 'El monto es necesario']
    },
    date: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    role: {
        type: String,
        default: 'INGRESO',
        enum: ingresosEgresosValidos
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('IngresoEgreso', ingresosEgresosSchema);