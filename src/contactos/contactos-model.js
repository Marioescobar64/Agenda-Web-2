'use strict';

import mongoose, { mongo } from 'mongoose';

const contactosSchema = new mongoose.Schema({
        contactosName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del contacto no puede tener mas de 100 caracteres'],
    },

    contactosPreferent: {
        type: String,
        required: [true, 'El tipo de preferencia del contacto es requerido'],
        enum: {
            values: ['FAVORITO', 'NORMAL', 'IMPORTANTE'],
            message: 'Tipo de superficie no valida',
        },
    },

    contactostelefon: {
        type: Number,
        required: [true, 'El tipo de contacto es requerido'],
        min: [0, 'El telefono no puede ser mayor o igual a 0']
    },   

    photo: {
    type: String,
    // valor por defecto
    default: 'contactos/Mickey_Mouse_nqrwb0',
    },


    isActive: {
    type: Boolean,
    default: true,
    }

});

 contactosSchema.index({ isActive: 1  });
contactosSchema.index({ contactosName: 1  });
 contactosSchema.index({ contactosName: 1, isActive: 1  });



// exportamos el modelo con el nombre Contactos
export default mongoose.model('Contactos', contactosSchema)
