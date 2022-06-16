const Joi = require('joi');

const id = Joi.number().integer();
const caseId = Joi.number().integer();
const caseContentId = Joi.number().integer();
const starterProcessStepId = Joi.number().integer();
const createdById = Joi.number().integer();
const createdAt = Joi.date();
const finishedAt = Joi.date();

const getCaseProcessSchema = Joi.object({
  id: id.required(),
});

const createCaseProcessSchema = Joi.object({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  starterProcessStepId: starterProcessStepId.required(),
  createdById: createdById.required(),
  createdAt: createdAt.required(),
  finishedAt: finishedAt.required(),
});

const updateCaseProcessSchema = Joi.object({
  caseId,
  caseContentId,
  starterProcessStepId,
  createdById,
  createdAt,
  finishedAt,
});

module.exports = {
  getCaseProcessSchema,
  createCaseProcessSchema,
  updateCaseProcessSchema,
  id,
  caseId,
  caseContentId,
  starterProcessStepId,
  createdById,
  createdAt,
  finishedAt,
};
