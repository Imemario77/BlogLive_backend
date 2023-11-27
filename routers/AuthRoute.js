import { Router } from "express";
import { authLoginController, authSignUpController } from "../controllers/AuthContoller.js";

const AuthRoute = Router();

AuthRoute.post("/signup", authSignUpController);
AuthRoute.post('/login', authLoginController)
export default AuthRoute;

