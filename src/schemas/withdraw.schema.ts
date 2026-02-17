import Joi from "joi";

class WithdrawSchema {
  withdraw = Joi.object({
    amount: Joi.number().integer().positive().required(),
  });
}

export default new WithdrawSchema();
