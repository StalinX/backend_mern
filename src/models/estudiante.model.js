import mongoose from "mongoose";
const { Schema, model } = mongoose

const studentSchema = new Schema({
    nombres: {
        type: String,
        requerid: true
    },
    apellidos: {
        type: String,
        requerid: true
    },
    correo: {
        type: String,
        requerid: true,
        unique: true,
    },
    password: {
        type: String,
        requerid: true,
    },
},
    {
        timestamps: true,
    }

);

export const Estudiante = model('student', studentSchema);


