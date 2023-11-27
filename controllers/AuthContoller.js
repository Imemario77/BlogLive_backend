import { User } from "../database_schema/userdb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authSignUpController = async (req, res) => {
  const { fname, lname, user_name, email, password, confirm_password } =
    req.body;
  const email_found = await User.findOne({ email: email });
  const user_found = await User.findOne({ userName: user_name });

  if (user_found) {
    res.status(200).json({ message: "username already exits choose another" });
  } else {
    if (email_found) {
      res.status(200).json({ message: "email already exits choose another" });
    } else {
      if (password === confirm_password) {
        let hash_password = await bcrypt.hash(password, 10);
        let create_acct = new User({
          firstName: fname,
          lastName: lname,
          userName: user_name,
          email: email,
          password: hash_password,
        });
        const result = await create_acct.save();
        const token = jwt.sign({ id: result._id }, process.env.secret_key, {
          expiresIn: "2h",
        });
        res.header("Authorization", `Bearer ${token}`);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        res.status(200).json({ result });
      } else {
        res.status(200).json({ message: "password is not the same" });
      }
    }
  }
};

export const authLoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const email_found = await User.findOne({ email: email });
    const user_found =
      email_found === null && (await User.findOne({ userName: email }));
    if (email_found === null) {
      if (user_found === null) {
        res.json({ message: "User not found create account" });
      } else {
        if (password) {
          let compare_password = await bcrypt.compare(
            password,
            user_found.password
          );
          if (compare_password) {
            const token = jwt.sign(
              { id: user_found._id },
              process.env.secret_key,
              {
                expiresIn: "2h",
              }
            );
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "strict",
            });
            res.status(200).json({ result: user_found });
          } else {
            res.json({ message: "incorrect password" });
          }
        } else {
          res.json({ message: "password field is empty" });
        }
      }
    } else {
      if (password) {
        let compare_password = await bcrypt.compare(
          password,
          email_found.password
        );
        if (compare_password) {
          const token = jwt.sign(
            { id: email_found._id },
            process.env.secret_key,
            {
              expiresIn: "2h",
            }
          );
          res
            .cookie("token", token, {
              httpOnly: true,
              // secure: true,
              // sameSite: "strict",
            })
            .status(200)
            .json({ result: email_found });
        } else {
          res.json({ message: "incorrect password" });
        }
      } else {
        res.json({ message: "password field is empty" });
      }
    }
  } catch (error) {
    res.json({ messag: "Try again later there was an error occured" });
  }
};
