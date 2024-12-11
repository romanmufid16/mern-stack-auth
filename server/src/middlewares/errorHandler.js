import mongoose from "mongoose";
import { ResponseError } from "../utils/erroResponse.js";

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      success: false,
      errors: err.message,
    });
  } else if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.keys(err.errors).map((key) => ({
      field: key,
      message: err.errors[key].message,
    }));
    res.status(400).json({
      success: false,
      errors: errors,
    });
  } else {
    res.status(500).json({
      status: false,
      errors: err.message,
    });
  }
};

export default errorHandler;
