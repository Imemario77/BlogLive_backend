import { Router } from "express";
import { uploadFile } from "../helpers/uploadFile.js";
import { uploadedFileContoller } from "../controllers/UploadFileController.js";
import { authMiddleware } from "../helpers/authenticationMIddleware.js";

const uploadRoute = Router();

uploadRoute.post(
  "/upload/image",
  uploadFile.single("file"),
  uploadedFileContoller
);

export default uploadRoute;
