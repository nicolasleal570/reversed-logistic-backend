const Joi = require('joi');
const { id: caseId } = require('./cases.schema');

const id = Joi.number().integer();
const status = Joi.string();

const getCountAvailableCasesTimesSchema = Joi.object({
  caseId: caseId.required(),
});

module.exports = {
  getCountAvailableCasesTimesSchema,
  id,
  status,
};
