import { Router } from "express";
import userCrtl from "../conrollers/users.controller.js";

const route = Router()

route.post('/register', userCrtl.register)
route.post('/login', userCrtl.login)

export default route

