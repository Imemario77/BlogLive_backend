import { User } from "../database_schema/userdb.js";


export const Get_specific_users = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.findOne({ _id: userId });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
};
