import Joi from "joi";

class UserSchema {
  createUser = Joi.object({
    email: Joi.string().email().required(),
  });
}

export default new UserSchema();
