import { Router } from "express";
import { Get_specific_users } from "../controllers/getSpecificUser.js";

const getUserRoute = Router();

getUserRoute.get("/user/:userId", Get_specific_users);

export default getUserRoute;
