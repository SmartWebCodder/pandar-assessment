import Joi from "joi";

class BalanceSchema {
  addBalance = Joi.object({
    amount: Joi.number().integer().positive().required(),
  });
}

export default new BalanceSchema();
