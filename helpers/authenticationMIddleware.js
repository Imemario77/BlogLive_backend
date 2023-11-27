import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  if (!token) {
    console.log({ message: "no token was provided" });
    res.json({ message: "no token was provided" });
  } else {
    try {
      let id = req.body.user._id;
      const decoded = jwt.verify(token, process.env.secret_key);
      if (decoded.id === id) {
        next();
      } else {
        console.log("you don't have access");
        res.status(403).json({ message: "your dont have access" });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: "session has expried login again" });
    }
  }
};
