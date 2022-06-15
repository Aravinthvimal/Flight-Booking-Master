import ApiError from "./errorClass.js";
import { verifyJwt } from "./jwt.utils.js";
import User from "../models/user.model.js";

export const authVerify = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Please Authenticate", 401));
  }

  try {
    const { userId } = await verifyJwt(token);

    const user = await User.findById(userId);

    if (!user) {
      return next(new ApiError("Please Authenticate", 401));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};
