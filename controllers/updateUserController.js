import { User } from "../database_schema/userdb.js";
import bcrypt from "bcrypt";

export const updateUserNamesAndEmailProfile = async (req, res) => {
  const { userName, firstName, lastName, email, userId } = req.body;
  if (userId) {
    if ((userName, firstName, lastName, email)) {
      try {
        const updated_user = await User.updateOne(
          { _id: userId },
          {
            userName: userName,
            email: email,
            firstName: firstName,
            lastName: lastName,
          }
        );
        const user = await User.findOne({ _id: userId });
        res.json({ result: user });
      } catch (error) {
        console.log(error);
        res.json({ message: "an error occured status code 500" });
      }
    }
  } else {
    res.json({ message: "Try to login could not validate user" });
  }
};

export const UpdateUserPassword = async (req, res) => {
  const { password, updatedPassword, userId } = req.body;
  console.log(req.body)
  if (userId) {
    if ((password, updatedPassword)) {
      try {
        const user = await User.findOne({ _id: userId });
        if (user) {
          const compare_password = await bcrypt.compare(
            password,
            user.password
          );
          if (compare_password) {
            const hash_updated_password = await bcrypt.hash(
              updatedPassword,
              10
            );
            const updated_user = await User.updateOne(
              { _id: userId },
              { password: hash_updated_password }
            );
            console.log(updated_user);
            res.json({ result: updated_user });
          } else {
            console.log("Old Password doesn't match");
            res.json({ message: "Old Password doesn't match" });
          }
        } else {
          console.log("Old Password doesn't match n 76");
          res.json({ message: "Try to login could not validate user" });
        }
      } catch (error) {
        console.log("Old Password doesn't match 77");
        res.json({ message: "an error occured try again later" });
      }
    }
  }
};

export const UpdateUserProfileImage = async (req, res) => {
  const { image, userId } = req.body;
  if (image && userId) {
    try {
      const updated_user = await User.updateOne(
        { _id: userId },
        {
          image: image,
        }
      );
      const user = await User.findOne({ _id: userId });
      res.json({ result: user });
    } catch (error) {
      res.json({ message: "an error occured try again later" });
    }
  } else {
    res.json({ message: "Try to login could not validate user" });
  }
};
