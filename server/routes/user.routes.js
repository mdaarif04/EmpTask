import { Router } from "express";
import { loginUser, registerUser, userData, userDataById } from "../controller/user.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/users").get(userData);
router.route("/users/:id").get(userDataById);


export default router;