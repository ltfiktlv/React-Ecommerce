import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

const guard = async (req, res, next) => {
  let token;

  if (req.headers["authorization"]) {
    try {
      token = req.headers["authorization"].split(" ")[1]; //because it starts with Bearer token_id, we only want to take token_id

      const verified = jwt.verify(token, process.env.PRIVATE_JWT);
      req.user = await User.findById(verified.id); // exclude password from user info
      console.log(req.user);
      next();
    } catch (err) {
      res.status(401).json("You are not authorized for this page.");
    }
  } else {
    res.status(401).json("Invalid token");
  }
};

export default guard;
