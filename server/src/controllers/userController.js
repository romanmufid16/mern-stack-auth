import User from "../models/user.js";
import { ResponseError } from "../utils/erroResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../validation/validation.js";
import { registerValidation } from "../validation/userValidation.js";

export const registerUser = async (req, res, next) => {
  const user = validate(registerValidation, req.body, next);
  if (!user) return;

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const checkEmail = await User.findOne({ email: user.email });

  if (checkEmail) {
    return next(new ResponseError(400, "Email already registered"));
  }

  user.password = await bcrypt.hash(user.password, 10);

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
