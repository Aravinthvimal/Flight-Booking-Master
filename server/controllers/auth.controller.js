import User from "../models/user.model.js";
import ApiError from "../utils/errorClass.js";
import { signJwt } from "../utils/jwt.utils.js";

export const register = async (req, res, next) => {
  
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(new ApiError("User already exists", 409));
    }

    const newUser = await User.create(req.body);

    const token = await signJwt(newUser._id);

    res.status(201).json({
      success: true,
      data: newUser,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    console.log("user", user);

    if (!user) {
      return next(new ApiError("Incorrect email or password", 404));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ApiError("Incorrect email or password", 404));
    }

    const token = await signJwt(user._id);

    res.status(201).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
