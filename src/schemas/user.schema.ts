import Joi from "joi";

class UserSchema {
  createUser = Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  });
}

export default new UserSchema();
