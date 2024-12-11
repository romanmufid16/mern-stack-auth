import { ResponseError } from "../utils/erroResponse.js";

export const validate = (schema, request, next) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    return next(new ResponseError(400, result.error.message));
  } else {
    return result.value;
  }
};
