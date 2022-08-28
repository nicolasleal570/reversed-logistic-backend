const Joi = require('joi');
const { id: caseId } = require('./cases.schema');
const { id: caseContentId } = require('./case-content.schema');
const { id: customerLocationId } = require('./customer-location.schema');

const id = Joi.number().integer();
const details = Joi.string();
const finishedAt = Joi.date();

const getCleanProcessOrderSchema = Joi.object({
  id: id.required(),
});

const createCleanProcessOrderSchema = Joi.object({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  customerLocationId: customerLocationId.required(),
  details,
  finishedAt,
});

const updateCleanProcessOrderSchema = Joi.object({
  caseId,
  caseContentId,
  customerLocationId,
  details,
  finishedAt,
});

module.exports = {
  getCleanProcessOrderSchema,
  createCleanProcessOrderSchema,
  updateCleanProcessOrderSchema,
  id,
  details,
  finishedAt,
};
