import { User } from "../models/users.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mensages from "../utils/messages.js";
const { messageGeneral } = mensages;

const userCrtl = {}
userCrtl.register = async (req, res) => {
    try {
        const data = req.body;
        const resp = await User.findOne({ correo: data.correo });
        if (resp) {
            return messageGeneral(res, 400, false, "", "El correo ya existe");
        }

        //encriptar contraseña
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await User.create(data);
        //crear token
        const token = jwt.sign({ _id: newUser._id }, "secret");
        messageGeneral(res, 201, true, { ...newUser._doc, password: null, token }, "Usuario creado correctamente");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

userCrtl.login = async (req, res) => {
    try {
        const data = req.body;
        const resp = await User.findOne({ correo: data.correo });
        if (!resp) {
            return messageGeneral(res, 400, false, "", "El correo no existe");

        }
        const match = await bcrypt.compare(data.password, resp.password)
        if (match) {
            //crear token
            const token = jwt.sign({ _id: resp._id }, "secret");

            return messageGeneral(res, 201, true, { ...resp._doc, password: null, token }, "Bienvenido");

        }
        messageGeneral(res, 400, false, "", "La contraseña es incorrecta");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);

    }
}


export default userCrtl