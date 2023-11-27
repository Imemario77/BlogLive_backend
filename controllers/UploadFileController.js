export const uploadedFileContoller = (req, res) => {
  if (
    (req.file && req.body.name.endsWith(".PNG")) ||
    req.body.name.endsWith(".JPG") ||
    req.body.name.endsWith(".JPEG") ||
    req.body.name.endsWith(".png") ||
    req.body.name.endsWith(".jpg") ||
    req.body.name.endsWith(".jpeg")
  ) {
    res.status(200).json({ message: "successfuly uploaded" });
  } else res.status(500).json({ message: "couldn't upload the file" });
};
