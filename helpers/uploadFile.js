import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cd) => {
    const image_file = req.body.name;
    if (
      req.body.name.endsWith(".PNG") ||
      req.body.name.endsWith(".JPG") ||
      req.body.name.endsWith(".JPEG") ||
      req.body.name.endsWith(".png") ||
      req.body.name.endsWith(".jpg") ||
      req.body.name.endsWith(".jpeg")
    ) {
      cd(null, image_file);
    } else {
      cd(new Error("Not an Image File by me"), false);
    }
  },
});

export const uploadFile = multer({
  storage: multerStorage,
});
