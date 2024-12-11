import User from "../models/user.js";
import { ResponseError } from "../utils/erroResponse.js";
import bcrypt from "bcrypt";
import { validate } from "../validation/validation.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/userValidation.js";
import generateToken from "../utils/token.js";

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

export const loginUser = async (req, res, next) => {
  const user = validate(loginValidation, req.body, next);
  if (!user) return;

  if (!user.email || !user.password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const checkEmail = await User.findOne({ email: user.email });

  if (!checkEmail) {
    return next(new ResponseError(400, "Invalid credentials"));
  }

  const isValid = await bcrypt.compare(user.password, checkEmail.password);

  if (!isValid) {
    return next(new ResponseError(400, "Invalid credentials"));
  }

  const token = generateToken({
    name: checkEmail.name,
    email: checkEmail.email,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", { secure: false, httpOnly: true });
  res.status(200).json({ message: 'Logged out successfully' });
};
