import { Router } from "express";
import {
  UpdateUserPassword,
  UpdateUserProfileImage,
  updateUserNamesAndEmailProfile,
} from "../controllers/updateUserController.js";

const updateUserRoute = Router();

updateUserRoute.put("/image", UpdateUserProfileImage);
updateUserRoute.put("/password", UpdateUserPassword);
updateUserRoute.put("/usersNames", updateUserNamesAndEmailProfile);

export default updateUserRoute;
