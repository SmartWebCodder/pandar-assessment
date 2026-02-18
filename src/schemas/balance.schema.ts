import Joi from "joi";

class BalanceSchema {
  addBalance = Joi.object({
    amount: Joi.number().integer().positive().required().messages({
      "number.base": "Amount must be a number",
      "number.integer": "Amount must be an integer",
      "number.positive": "Amount must be a positive number",
      "any.required": "Amount is required",
    }),
  });
}

export default new BalanceSchema();
